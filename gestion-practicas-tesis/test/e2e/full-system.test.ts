import { test, expect } from '@playwright/test'; 
 
 test.describe('Verificación Completa del Sistema', () => { 
   test.beforeEach(async ({ page }) => { 
     // Iniciar servidores si es necesario 
     await page.goto('http://localhost:3000'); 
   }); 
 
   test('Flujo completo: Registro -> Login -> Postulación -> Informe', async ({ page }) => { 
     // 1. Registro de estudiante 
     await page.click('text=Registrarse'); 
     await page.fill('input[name="nombres"]', 'Juan'); 
     await page.fill('input[name="apellidos"]', 'Perez'); 
     const testEmail = `test${Date.now()}@unitru.edu.pe`;
     await page.fill('input[name="email"]', testEmail); 
     await page.fill('input[name="dni"]', `7${Math.floor(Math.random() * 10000000)}`.padStart(8, '0')); 
     await page.fill('input[name="password"]', 'Test123456'); 
     await page.selectOption('select[name="rol"]', 'ESTUDIANTE'); 
     await page.fill('input[name="codigoEstudiante"]', `2024${Date.now() % 10000}`); 
     await page.click('button[type="submit"]'); 
     
     // 2. Login 
     await page.goto('http://localhost:3000/login');
     await page.fill('input[id="email"]', testEmail); 
     await page.fill('input[id="password"]', 'Test123456'); 
     
     await Promise.all([
       page.waitForURL(/.*dashboard/),
       page.click('button:has-text("Iniciar Sesión")')
     ]);
     
     // 3. Ver dashboard carga correctamente 
     await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible(); 
     await expect(page.locator('text=Prácticas Activas')).toBeVisible(); 
     
     // 4. Ver prácticas disponibles 
     await page.click('text=Prácticas'); 
     await expect(page.locator('text=Gestión de Prácticas')).toBeVisible(); 
     
     // 5. Generar reporte PDF 
     await page.click('text=Reportes'); 
     
     const [download] = await Promise.all([
       page.waitForEvent('download'),
       page.click('button:has-text("Generar PDF")'),
     ]);
     
     expect(download.suggestedFilename()).toContain('.pdf'); 
   }); 
 
   test('Verificar APIs responden correctamente', async ({ request }) => { 
     const healthCheck = await request.get('http://localhost:4000/health'); 
     expect(healthCheck.status()).toBe(200); 
   }); 
 });
