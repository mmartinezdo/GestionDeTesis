# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: gestion-practicas-tesis\test\e2e\full-system.test.ts >> Verificación Completa del Sistema >> Flujo completo: Registro -> Login -> Postulación -> Informe
- Location: gestion-practicas-tesis\test\e2e\full-system.test.ts:9:8

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForURL: Test timeout of 30000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
  navigated to "http://localhost:3000/login?email=test1777919924377%40unitru.edu.pe&password=Test123456"
============================================================
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e5]: Sistema UNT
      - generic [ref=e6]: Gestión de Prácticas Preprofesionales y Tesis
    - generic [ref=e7]:
      - generic [ref=e8]:
        - generic [ref=e9]:
          - text: Correo Electrónico
          - textbox "Correo Electrónico" [ref=e10]:
            - /placeholder: usuario@unitru.edu.pe
        - generic [ref=e11]:
          - text: Contraseña
          - textbox "Contraseña" [ref=e12]:
            - /placeholder: ••••••
        - button "Iniciar Sesión" [ref=e13]
      - link "Registrarse" [ref=e15] [cursor=pointer]:
        - /url: /register
  - region "Notifications alt+T"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'; 
  2  |  
  3  |  test.describe('Verificación Completa del Sistema', () => { 
  4  |    test.beforeEach(async ({ page }) => { 
  5  |      // Iniciar servidores si es necesario 
  6  |      await page.goto('http://localhost:3000'); 
  7  |    }); 
  8  |  
  9  |    test('Flujo completo: Registro -> Login -> Postulación -> Informe', async ({ page }) => { 
  10 |      // 1. Registro de estudiante 
  11 |      await page.click('text=Registrarse'); 
  12 |      await page.fill('input[name="nombres"]', 'Juan'); 
  13 |      await page.fill('input[name="apellidos"]', 'Perez'); 
  14 |      const testEmail = `test${Date.now()}@unitru.edu.pe`;
  15 |      await page.fill('input[name="email"]', testEmail); 
  16 |      await page.fill('input[name="dni"]', `7${Math.floor(Math.random() * 10000000)}`.padStart(8, '0')); 
  17 |      await page.fill('input[name="password"]', 'Test123456'); 
  18 |      await page.selectOption('select[name="rol"]', 'ESTUDIANTE'); 
  19 |      await page.fill('input[name="codigoEstudiante"]', `2024${Date.now() % 10000}`); 
  20 |      await page.click('button[type="submit"]'); 
  21 |      
  22 |      // 2. Login 
  23 |      await page.goto('http://localhost:3000/login');
  24 |      await page.fill('input[id="email"]', testEmail); 
  25 |      await page.fill('input[id="password"]', 'Test123456'); 
  26 |      
  27 |      await Promise.all([
> 28 |        page.waitForURL(/.*dashboard/),
     |             ^ Error: page.waitForURL: Test timeout of 30000ms exceeded.
  29 |        page.click('button:has-text("Iniciar Sesión")')
  30 |      ]);
  31 |      
  32 |      // 3. Ver dashboard carga correctamente 
  33 |      await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible(); 
  34 |      await expect(page.locator('text=Prácticas Activas')).toBeVisible(); 
  35 |      
  36 |      // 4. Ver prácticas disponibles 
  37 |      await page.click('text=Prácticas'); 
  38 |      await expect(page.locator('text=Gestión de Prácticas')).toBeVisible(); 
  39 |      
  40 |      // 5. Generar reporte PDF 
  41 |      await page.click('text=Reportes'); 
  42 |      
  43 |      const [download] = await Promise.all([
  44 |        page.waitForEvent('download'),
  45 |        page.click('button:has-text("Generar PDF")'),
  46 |      ]);
  47 |      
  48 |      expect(download.suggestedFilename()).toContain('.pdf'); 
  49 |    }); 
  50 |  
  51 |    test('Verificar APIs responden correctamente', async ({ request }) => { 
  52 |      const healthCheck = await request.get('http://localhost:4000/health'); 
  53 |      expect(healthCheck.status()).toBe(200); 
  54 |    }); 
  55 |  });
  56 | 
```