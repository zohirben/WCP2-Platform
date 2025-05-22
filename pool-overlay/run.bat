@echo off
echo Starting Pool Game Overlay...

:: Check if we're in a virtual environment, if not try to activate one
if "%VIRTUAL_ENV%"=="" (
    if exist venv\Scripts\activate.bat (
        echo Activating virtual environment...
        call venv\Scripts\activate.bat
    )
)

:: Check if Python is available
where python >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Python not found. Please install Python 3.7 or higher.
    pause
    exit /b 1
)

:: Check if PyQt5 is installed
python -c "import PyQt5" >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo PyQt5 not installed. Installing dependencies...
    pip install -r requirements.txt
)

:: Run the application
python pool_overlay.py
