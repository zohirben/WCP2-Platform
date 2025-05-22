#!/usr/bin/env python3
"""
Pool Overlay Installer
---------------------
This script helps set up the Pool Game Overlay environment
and dependencies.
"""

import os
import sys
import subprocess
import platform
from pathlib import Path

def print_header(text):
    """Print a header with decoration."""
    print("\n" + "=" * 60)
    print(f" {text}")
    print("=" * 60)

def check_python_version():
    """Check if the Python version is compatible."""
    print_header("Checking Python version")
    
    major, minor = sys.version_info[:2]
    print(f"Detected Python {major}.{minor}")
    
    if major < 3 or (major == 3 and minor < 7):
        print("ERROR: Python 3.7 or higher is required.")
        print("Please install a newer version of Python.")
        return False
    
    print("Python version is compatible.")
    return True

def setup_virtual_env():
    """Create and activate a virtual environment."""
    print_header("Setting up virtual environment")
    
    venv_path = Path("venv")
    if venv_path.exists():
        print("Virtual environment already exists.")
    else:
        print("Creating virtual environment...")
        try:
            subprocess.check_call([sys.executable, "-m", "venv", "venv"])
            print("Virtual environment created successfully.")
        except subprocess.CalledProcessError:
            print("ERROR: Failed to create virtual environment.")
            return False
    
    # Attempt to activate venv in the current script
    # This won't affect the parent process, but we'll print instructions
    if platform.system() == "Windows":
        activate_script = venv_path / "Scripts" / "activate.bat"
        print(f"\nTo activate the virtual environment, run:")
        print(f"    {activate_script}")
    else:
        activate_script = venv_path / "bin" / "activate"
        print(f"\nTo activate the virtual environment, run:")
        print(f"    source {activate_script}")
    
    return True

def install_dependencies():
    """Install required Python packages."""
    print_header("Installing dependencies")
    
    requirements_path = Path("requirements.txt")
    if not requirements_path.exists():
        print("ERROR: requirements.txt not found.")
        return False
    
    print("Installing required packages...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("Dependencies installed successfully.")
    except subprocess.CalledProcessError:
        print("ERROR: Failed to install dependencies.")
        return False
    
    return True

def check_pyqt_installation():
    """Check if PyQt5 is properly installed."""
    print_header("Checking PyQt5 installation")
    
    try:
        import PyQt5
        print(f"PyQt5 {PyQt5.QtCore.QT_VERSION_STR} installed successfully.")
        return True
    except ImportError:
        print("ERROR: PyQt5 is not installed properly.")
        print("Please try installing it manually with:")
        print("    pip install PyQt5")
        return False

def create_desktop_shortcut():
    """Create a desktop shortcut to launch the application."""
    print_header("Creating desktop shortcut")
    
    try:
        home_dir = Path.home()
        desktop_dir = home_dir / "Desktop"
        
        if not desktop_dir.exists():
            print("Desktop directory not found. Skipping shortcut creation.")
            return False
        
        print("Creating desktop shortcut...")
        
        if platform.system() == "Windows":
            # Create Windows shortcut
            shortcut_path = desktop_dir / "Pool Overlay.bat"
            app_path = Path.cwd() / "run.bat"
            
            with open(shortcut_path, "w") as f:
                f.write(f'@echo off\ncd /d "{Path.cwd()}"\ncall "{app_path}"\n')
        else:
            # Create Unix/Linux shortcut
            shortcut_path = desktop_dir / "Pool Overlay.desktop"
            app_path = Path.cwd() / "run.sh"
            
            with open(shortcut_path, "w") as f:
                f.write(f"""[Desktop Entry]
Name=Pool Overlay
Comment=Advanced pool game overlay
Exec={app_path}
Terminal=false
Type=Application
Categories=Game;Utility;
""")
            os.chmod(shortcut_path, 0o755)
        
        print(f"Shortcut created at: {shortcut_path}")
        return True
    except Exception as e:
        print(f"ERROR: Failed to create shortcut: {e}")
        return False

def setup_complete():
    """Print final instructions."""
    print_header("Setup Complete")
    
    print("The Pool Game Overlay application has been set up successfully!")
    print("\nTo start the application, run:")
    
    if platform.system() == "Windows":
        print("    run.bat")
    else:
        print("    ./run.sh")
    
    print("\nYou can also use the desktop shortcut if created.")

def main():
    """Main installer function."""
    print_header("Pool Game Overlay Installer")
    
    # Check requirements
    if not check_python_version():
        sys.exit(1)
    
    # Setup venv
    if not setup_virtual_env():
        print("Warning: Virtual environment setup failed.")
    
    # Install dependencies
    if not install_dependencies():
        print("Warning: Dependency installation failed.")
    
    # Check PyQt
    if not check_pyqt_installation():
        print("Warning: PyQt5 check failed.")
    
    # Create shortcut
    create_desktop_shortcut()
    
    # Complete
    setup_complete()

if __name__ == "__main__":
    main()
