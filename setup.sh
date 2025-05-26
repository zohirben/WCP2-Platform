#!/bin/bash
# Moroccan Experience Platform - Setup Script
# This script helps new team members set up the project quickly

echo "📦 Setting up Moroccan Experience Platform for WCP2026..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ before continuing."
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18 or higher. Current version: $(node -v)"
    echo "Please upgrade Node.js before continuing."
    exit 1
fi

echo "✅ Node.js version $(node -v) detected"

# Install dependencies
echo "📥 Installing dependencies..."
npm install

# Create .env.local file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "🔧 Creating default .env.local file..."
    cat > .env.local << EOL
# Moroccan Experience Platform - Environment Variables
# Created by setup.sh on $(date)

# API endpoints can be configured here
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Development settings
NEXT_PUBLIC_DEV_MODE=true
EOL
    echo "✅ Created .env.local file"
fi

# Build the project
echo "🏗️ Building the project..."
npm run build

echo "
🎉 Setup complete! You can now start the development server:

   npm run dev

🌐 Then visit http://localhost:3000 in your browser

📚 Documentation is available in the /docs folder
"
