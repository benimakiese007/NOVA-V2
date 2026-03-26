@echo off
TITLE Serveur Frontend - NewKet
color 0B
echo =======================================
echo   DEMARRAGE DU FRONTEND NEWKET
echo =======================================
echo.

cd frontend

echo [1/2] Installation des dependances...
call npm install
echo.

echo [2/2] Lancement de Vite...
call npm run dev

pause
