# Moroccan Experience Platform - World Cup 2026

A comprehensive platform providing information about Moroccan culture, accommodations, restaurants, and transportation options for World Cup 2026 visitors.

![Screenshot](/screenshot.png)

## Overview

The Moroccan Experience platform is a Next.js application that showcases Moroccan culture and provides essential information for World Cup 2026 visitors. The platform features a distinctive design inspired by traditional Moroccan geometric patterns (zellij) and uses a color scheme based on the Moroccan flag.

### Key Features

- **Moroccan-themed UI** with traditional colors and patterns
- **Interactive Chatbot** providing information about Moroccan cities and prices
- **Discover Morocco section** with cards for accommodations, food, and transportation
- **Responsive Design** optimized for all devices
- **Multi-language Support** (English and French)

## Quickstart

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd moroccan-experience

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
app/               # Next.js app router structure
├── globals.css    # Global styles
├── layout.tsx     # Root layout component
├── page.tsx       # Home page component
├── about/         # About page
├── auth/          # Authentication pages
├── contact/       # Contact page
├── offers/        # Offers page
└── pattern-visualizer/  # Pattern visualization tool

components/        # React components
├── ui/            # UI components including chatbot
└── navigation/    # Navigation components

public/            # Static assets
├── assets/        # Organized assets folder
└── pattern-options/ # Zellij pattern SVGs

docs/              # Documentation
```

## Chatbot Component

The platform includes an interactive chatbot that provides answers about Moroccan cities and travel costs:

- Floating action button in the bottom-right corner
- Information about hotels, restaurants, and attractions in major Moroccan cities
- Pre-defined question suggestions for easy navigation

## Documentation

For more detailed information, please refer to the documentation in the `docs` folder:

- [Developer Guide](./docs/developer-guide.md) - Technical documentation for developers
- [User Guide](./docs/user-guide.md) - End-user documentation
- [Zellij Pattern System](./docs/zellij-pattern-system.md) - Information about the Moroccan patterns used

## Contributing

Please read the [Developer Guide](./docs/developer-guide.md) for details on our code of conduct and the process for submitting pull requests.

## Features

- Responsive design with Moroccan-inspired visual elements
- Cultural landmarks and points of interest
- Restaurant and accommodation recommendations
- Transportation options and booking resources
- User authentication system

## Documentation

### For Developers
- [Developer Guide](/docs/developer-guide.md) - Comprehensive technical documentation for developers
- [Guide du Développeur](/docs/developer-guide-fr.md) - Documentation technique complète pour les développeurs (Français)
- [Zellij Pattern System](/docs/zellij-pattern-system.md) - Documentation for the Moroccan geometric patterns implementation

### For Users
- [User Guide](/docs/user-guide.md) - End-user manual for platform navigation and feature usage
- [Guide d'Utilisateur](/docs/user-guide-fr.md) - Manuel d'utilisation pour la navigation et l'utilisation des fonctionnalités (Français)