@echo off
setlocal enabledelayedexpansion
title Portfolio Controller Console
cd /d "%~dp0"

:menu
cls
echo =================================================================
echo        AJAY SATHYESH M - PORTFOLIO APP CONTROL CONSOLE
echo =================================================================
echo.
echo Please select an option:
echo.
echo   [1] Start Portfolio Applications (Frontend + Backend)
echo   [2] Stop Applications (Free Ports 3000 ^& 8000)
echo   [3] Clean Install / Refresh Dependencies
echo   [4] Run Environment Diagnostics
echo   [5] Exit
echo.
echo =================================================================
set /p choice="Enter option (1-5): "

if "%choice%"=="1" goto start_app
if "%choice%"=="2" goto stop_app
if "%choice%"=="3" goto clean_install
if "%choice%"=="4" goto diagnostics
if "%choice%"=="5" goto exit_script
goto menu

:start_app
cls
echo =================================================================
echo   STARTING PORTFOLIO APPLICATIONS
echo =================================================================
echo.

:: 1. Verify general system prerequisites
echo [1/5] Checking System Prerequisites...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH. Please install it first.
    pause
    goto menu
)
where python >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH. Please install it first.
    pause
    goto menu
)
echo - Prerequisites: OK.
echo.

:: 2. Check and copy backend env
echo [2/5] Checking Environment Configuration...
if not exist "backend\.env" (
    if exist "backend\.env.example" (
        echo - Creating backend\.env from .env.example...
        copy "backend\.env.example" "backend\.env" >nul
    ) else (
        echo [WARNING] backend\.env and backend\.env.example are both missing!
    )
) else (
    echo - Environment file: OK.
)
echo.

:: 3. Setup Frontend dependencies
echo [3/5] Checking Frontend Dependencies...
if not exist "node_modules" (
    echo - node_modules folder is missing. Installing frontend dependencies npm install...
    call npm install
) else (
    echo - Frontend dependencies: OK.
)
echo.

:: 4. Setup Backend virtualenv & dependencies
echo [4/5] Checking Backend Python Environment...
if not exist "backend\venv" (
    echo - Creating Python virtual environment in backend\venv...
    python -m venv backend\venv
)
echo - Activating virtualenv and checking/installing requirements...
backend\venv\Scripts\python -m pip install --upgrade pip
backend\venv\Scripts\python -m pip install -r backend\requirements.txt
echo - Backend environment: OK.
echo.

:: 5. Port check & clear
echo [5/5] Managing Ports (3000 ^& 8000)...

:: Check and clear Port 3000
netstat -aon | findstr ":3000" | findstr "LISTENING" >nul
if errorlevel 1 goto port3000_free
echo - Port 3000 is currently occupied. Freeing it up...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000" ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
    echo   - Process %%a on port 3000 terminated.
)
:port3000_free

:: Check and clear Port 8000
netstat -aon | findstr ":8000" | findstr "LISTENING" >nul
if errorlevel 1 goto port8000_free
echo - Port 8000 is currently occupied. Freeing it up...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":8000" ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
    echo   - Process %%a on port 8000 terminated.
)
:port8000_free
echo.

echo -----------------------------------------------------------------
echo [SUCCESS] Configuration done. Launching servers...
echo -----------------------------------------------------------------

:: Start FastAPI backend
start "AJAY PORTFOLIO - FastAPI Backend" cmd /k "title AJAY PORTFOLIO - FastAPI Backend && echo Starting Backend (FastAPI on Port 8000)... && cd backend && venv\Scripts\python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload"

:: Start Next.js frontend
start "AJAY PORTFOLIO - Next.js Frontend" cmd /k "title AJAY PORTFOLIO - Next.js Frontend && echo Starting Frontend (Next.js on Port 3000)... && npm run dev"

echo.
echo Application Launched Successfully!
echo - Frontend running at: http://localhost:3000
echo - Backend API running at: http://localhost:8000
echo.
pause
goto menu

:stop_app
cls
echo =================================================================
echo   STOPPING APPLICATIONS / CLEARING PORTS
echo =================================================================
echo.
set "killed=0"

netstat -aon | findstr ":3000" | findstr "LISTENING" >nul
if errorlevel 1 goto stop_port8000
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000" ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
    echo - Process %%a on Port 3000 terminated.
)
set "killed=1"

:stop_port8000
netstat -aon | findstr ":8000" | findstr "LISTENING" >nul
if errorlevel 1 goto stop_check_result
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":8000" ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
    echo - Process %%a on Port 8000 terminated.
)
set "killed=1"

:stop_check_result
echo.
if "!killed!"=="1" (
    echo [SUCCESS] Active application processes terminated successfully.
) else (
    echo - All ports are clean.
)
echo.
pause
goto menu

:clean_install
cls
echo =================================================================
echo   CLEAN INSTALL / REFRESH DEPENDENCIES
echo =================================================================
echo.
echo [WARNING] This will delete your current node_modules folder and 
echo           Python virtual environment (venv), then perform a fresh install.
echo.
set /p confirm="Are you sure you want to proceed? (Y/N): "
if /i not "%confirm%"=="Y" goto menu
echo.

:: 1. Delete node_modules
if exist "node_modules" (
    echo - Deleting node_modules folder (this might take a minute)...
    rmdir /s /q node_modules
)
:: 2. Delete backend venv
if exist "backend\venv" (
    echo - Deleting backend\venv folder...
    rmdir /s /q backend\venv
)

echo - Folders cleared.
echo.
echo - Starting fresh dependency installation...
echo.
echo - Installing Frontend dependencies (npm install)...
call npm install
echo.
echo - Creating Python virtual environment in backend\venv...
python -m venv backend\venv
echo - Activating virtualenv and installing requirements...
backend\venv\Scripts\python -m pip install --upgrade pip
backend\venv\Scripts\python -m pip install -r backend\requirements.txt
echo.
echo [SUCCESS] Dependencies refreshed!
echo.
pause
goto menu

:diagnostics
cls
echo =================================================================
echo   ENVIRONMENT DIAGNOSTICS
echo =================================================================
echo.
echo Checking system tools...
node -v >tmp.txt 2>&1
if %errorlevel%==0 (
    set /p node_ver=<tmp.txt
    echo   - Node.js:   !node_ver!
) else (
    echo   - Node.js:   NOT INSTALLED
)
call npm -v >tmp.txt 2>&1
if %errorlevel%==0 (
    set /p npm_ver=<tmp.txt
    echo   - NPM:       !npm_ver!
) else (
    echo   - NPM:       NOT INSTALLED
)
python --version >tmp.txt 2>&1
if %errorlevel%==0 (
    set /p py_ver=<tmp.txt
    echo   - Python:    !py_ver!
) else (
    echo   - Python:    NOT INSTALLED
)
if exist tmp.txt del tmp.txt
echo.
echo Checking project directories...
if exist "node_modules" (
    echo   - node_modules:   Found
) else (
    echo   - node_modules:   MISSING
)
if exist "backend\venv" (
    echo   - Python venv:    Found
) else (
    echo   - Python venv:    MISSING
)
if exist "backend\.env" (
    echo   - Backend .env:   Found
) else (
    echo   - Backend .env:   MISSING
)
echo.
echo Checking port statuses...
netstat -aon | findstr ":3000" | findstr "LISTENING" >nul
if %errorlevel%==0 (
    echo   - Port 3000:      OCCUPIED - Application frontend running
) else (
    echo   - Port 3000:      FREE
)
netstat -aon | findstr ":8000" | findstr "LISTENING" >nul
if %errorlevel%==0 (
    echo   - Port 8000:      OCCUPIED - Application backend running
) else (
    echo   - Port 8000:      FREE
)
echo.
pause
goto menu

:exit_script
echo.
echo Thank you for using AJAY SATHYESH M - Portfolio Console!
echo.
exit /b
