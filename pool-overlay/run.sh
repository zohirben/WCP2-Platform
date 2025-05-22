#!/bin/bash

echo "Starting Pool Game Overlay..."

# Check if we're in a virtual environment, if not try to activate one
if [ -z "$VIRTUAL_ENV" ]; then
    if [ -d "venv" ]; then
        echo "Activating virtual environment..."
        source venv/bin/activate
    fi
fi

# Check if Python is available
if ! command -v python &> /dev/null; then
    echo "Python not found. Please install Python 3.7 or higher."
    exit 1
fi

# Check if PyQt5 is installed
python -c "import PyQt5" &> /dev/null
if [ $? -ne 0 ]; then
    echo "PyQt5 not installed. Installing dependencies..."
    pip install -r requirements.txt
fi

# Run the application
python pool_overlay.py
