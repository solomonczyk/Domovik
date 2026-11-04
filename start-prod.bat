@echo off
chcp 65001 >nul
title Domovik Production Server
cd /d "%~dp0"

echo ====================================================
echo   🏠 Domovik — Production Server (SSG / Оптимизированный)
echo ====================================================
echo.

if not exist ".next\" (
    echo [1/2] Сборка проекта...
    call npm run build
    if errorlevel 1 (
        echo Ошибка сборки!
        pause
        exit /b 1
    )
)

echo [2/2] Запуск production-сервера...
echo.
echo 🌐 Сайт доступен по адресу: http://localhost:3000
echo.

start "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:3000"

npm run start
pause

