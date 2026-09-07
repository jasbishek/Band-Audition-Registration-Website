@echo off
title BAND UNKNOWN Auditions
echo ========================================================
echo Starting BAND UNKNOWN Audition Portal...
echo ========================================================

where node >nul 2>nul
if %errorlevel% equ 0 (
    npm run dev
) else (
    if exist "%LOCALAPPDATA%\ms-playwright-go\1.57.0\node.exe" (
        start "" "%LOCALAPPDATA%\ms-playwright-go\1.57.0\node.exe" server/index.js
        start "" "%LOCALAPPDATA%\ms-playwright-go\1.57.0\node.exe" node_modules/vite/bin/vite.js
        echo Servers started! Opening http://localhost:5173 ...
        timeout /t 2 >nul
        start http://localhost:5173
    ) else (
        echo Node.js not found in standard PATH.
        echo Please install Node.js from https://nodejs.org or run: winget install OpenJS.NodeJS.LTS
        pause
    )
)
