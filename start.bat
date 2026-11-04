@echo off
chcp 65001 >nul
title Domovik - Property Caretaking Platform
cd /d "%~dp0"

echo ====================================================
echo   🏠 Domovik — Сервис присмотра за недвижимостью
echo ====================================================
echo.

if not exist "node_modules\" (
    echo [1/2] Первичная установка зависимостей...
    call npm install
    if errorlevel 1 (
        echo Ошибка установки зависимостей!
        pause
        exit /b 1
    )
)

echo [2/2] Запуск сервера разработки...
echo.
echo 🌐 Сайт доступен по адресу: http://localhost:3000
echo 🛑 Для остановки сервера закройте это окно или нажмите Ctrl+C.
echo.

:: Небольшая задержка перед открытием браузера, чтобы сервер успел стартовать
start "" cmd /c "timeout /t 3 /nobreak >nul & start http://localhost:3000"

npm run dev
pause

