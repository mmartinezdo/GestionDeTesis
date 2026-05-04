@echo off
set ERRORS=0
set ROOT_DIR=%~dp0
set PROJECT_NAME=gestion-practicas-tesis

echo 🔍 INICIANDO VERIFICACION DE DESPLIEGUE (Windows)
echo ========================================

:: 1. Verificar backend
echo.
echo [📦 Verificando Backend...]
if not exist "%ROOT_DIR%%PROJECT_NAME%\backend" (
    echo ❌ No se encuentra la carpeta backend
    set /a ERRORS=%ERRORS%+1
    goto frontend
)

cd /d "%ROOT_DIR%%PROJECT_NAME%\backend"

if not exist package.json (
    echo ❌ No se encuentra package.json en backend
    set /a ERRORS=%ERRORS%+1
) else (
    if not exist node_modules (
        echo 📥 Instalando dependencias de backend...
        call npm install
    )
    
    echo 🔧 Verificando TypeScript...
    call npx tsc --noEmit
    if %errorlevel% equ 0 (
        echo ✅ TypeScript compila correctamente
    ) else (
        echo ❌ Errores de TypeScript en backend
        set /a ERRORS=%ERRORS%+1
    )
    
    echo 🗄️ Verificando Prisma...
    call npx prisma generate
    if %errorlevel% equ 0 (
        echo ✅ Prisma Client generado correctamente
    ) else (
        echo ❌ Error generando Prisma Client
        set /a ERRORS=%ERRORS%+1
    )
)

:frontend
:: 2. Verificar frontend
echo.
echo [🎨 Verificando Frontend...]
if not exist "%ROOT_DIR%%PROJECT_NAME%\frontend" (
    echo ❌ No se encuentra la carpeta frontend
    set /a ERRORS=%ERRORS%+1
    goto docker
)

cd /d "%ROOT_DIR%%PROJECT_NAME%\frontend"

if not exist package.json (
    echo ❌ No se encuentra package.json en frontend
    set /a ERRORS=%ERRORS%+1
) else (
    if not exist node_modules (
        echo 📥 Instalando dependencias de frontend...
        call npm install
    )
    
    echo 🔧 Verificando TypeScript...
    call npx tsc --noEmit
    if %errorlevel% equ 0 (
        echo ✅ TypeScript compila correctamente
    ) else (
        echo ❌ Errores de TypeScript en frontend
        set /a ERRORS=%ERRORS%+1
    )
    
    echo 🏗️ Verificando build de Next.js...
    call npm run build
    if %errorlevel% equ 0 (
        echo ✅ Next.js build exitoso
    ) else (
        echo ❌ Error en build de Next.js
        set /a ERRORS=%ERRORS%+1
    )
)

:docker
cd /d "%ROOT_DIR%"
:: 3. Verificar Docker
echo.
echo [🐳 Verificando Docker...]
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker no esta instalado
    set /a ERRORS=%ERRORS%+1
) else (
    echo ✅ Docker instalado
    docker-compose --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo ❌ Docker Compose no esta instalado
        set /a ERRORS=%ERRORS%+1
    ) else (
        echo ✅ Docker Compose instalado
    )
)

:: Resumen final
echo.
echo ========================================
if %ERRORS% equ 0 (
    echo [OK] TODAS LAS VERIFICACIONES PASARON EXITOSAMENTE!
    echo [OK] El sistema esta listo para desplegar
) else (
    echo [ERROR] Se encontraron %ERRORS% errores que deben corregirse
    exit /b 1
)
