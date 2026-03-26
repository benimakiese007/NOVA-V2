@echo off
TITLE Serveur Backend - NewKet
color 0A
echo =======================================
echo   DEMARRAGE DU BACKEND NEWKET
echo =======================================
echo.

cd backend

echo [1/2] Installation des dependances...
call npm install
echo.

echo [2/2] Lancement du serveur Node...
call npm run dev

pause
