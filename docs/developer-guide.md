# Moroccan Experience - Developer Documentation

## Overview

The Moroccan Experience is a comprehensive web application built with Next.js that provides information about Morocco, including cultural landmarks, accommodations, restaurants, and transportation options. This document serves as a guide for developers working on or maintaining the platform.

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [Project Structure](#project-structure)
3. [Core Components](#core-components)
4. [Design System](#design-system)
5. [Interactive Chatbot System](#interactive-chatbot-system)
6. [Pattern System](#pattern-system)
7. [Authentication Flow](#authentication-flow)
8. [Adding New Features](#adding-new-features)
9. [Best Practices](#best-practices)
10. [Deployment Guidelines](#deployment-guidelines)
11. [Troubleshooting](#troubleshooting)
12. [Additional Documentation](#additional-documentation)

---

## Technology Stack

The platform is built using the following technologies:

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Component Library**: Custom components built on top of Radix UI primitives
- **Authentication**: Custom implementation (expandable to OAuth providers)
- **Form Handling**: React Hook Form with Zod validation
- **Animation**: CSS animations via Tailwind

---

## Project Structure

```
WCP2-Platform/
├── app/                    # Next.js App Router pages and layouts
│   ├── about/              # About page
│   ├── auth/               # Authentication pages (login/register)
│   ├── contact/            # Contact page
│   ├── offers/             # Offers page for matches, restaurants, etc.
│   └── pattern-visualizer/ # Development tool for pattern visualization
├── components/             # Reusable React components
│   ├── auth/               # Authentication components
│   ├── navigation/         # Header, footer, and navigation components
│   └── ui/                 # UI components including patterns
├── docs/                   # Documentation files
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions, constants, and configuration
├── public/                 # Static assets
│   └── assets/patterns/ # Pattern images and design resources
└── tailwind.config.ts      # Tailwind configuration with custom theme
```

---

## Core Components

### Page Components

Each page in the application is represented by a `page.tsx` file in the corresponding directory under the `app` folder. These components follow the Next.js App Router convention and are server components by default unless marked with `"use client"`.

### UI Components

The application uses a collection of UI components built on top of Radix UI primitives. These components are organized in the `components/ui` directory and provide consistent styling and behavior across the application.

Key UI components include:

- **ButtonCTA**: Custom call-to-action button with Moroccan styling
- **Card**: Content container with consistent styling
- **Pattern Components**: Components for rendering Moroccan geometric patterns
- **ChatbotButton**: Interactive floating action button for accessing the chatbot
- **ChatModal**: Modal component displaying information about Moroccan cities and prices

### Navigation Components

The navigation system consists of:

- **Header**: Main navigation bar at the top of each page
- **Footer**: Site footer with links and information
- **MainNav**: Navigation links and menu

---

## Design System

### Colors

The application uses a Moroccan-inspired color palette defined in `tailwind.config.ts`:

```typescript
moroccan: {
  red: '#8A1538',      // Primary Moroccan red
  blue: '#003366',     // Deep blue used in headers and footers
  sand: '#E0C097',     // Warm sand color for backgrounds
  green: '#6E7154',    // Accent green color
}
```

These colors are used consistently throughout the application to maintain visual coherence.

### Typography

The application uses a combination of system fonts and specialized fonts for headings:

- **Headings**: Uses the "Amiri" font for a traditional Moroccan feel
- **Body**: Uses the system font stack for optimal readability

### Animations

Several custom animations are defined in `tailwind.config.ts`:

- **geometric-reveal**: Subtle scale and fade-in animation for UI elements
- **pattern-float**: Continuous subtle movement for background patterns

Example usage:

```tsx
<div className="animate-geometric-reveal">Content</div>
```

---

## Interactive Chatbot System

The platform includes an interactive chatbot to help World Cup visitors learn about Moroccan cities and travel costs.

### Chatbot Components

- **ChatbotButton** (`components/ui/chatbot-button.tsx`): A floating action button that shows/hides the chat interface
- **ChatModal** (`components/ui/chat-modal.tsx`): The chat interface with city information and user interaction

### City Information Database

The chatbot uses a structured database of city information stored directly in the component:

```tsx
const cityInfo = {
  marrakech: {
    hotels: "Hotels in Marrakech range from $50-100/night for budget options to $200-500/night for luxury riads.",
    restaurants: "Meals range from $5-15 at local eateries to $30-70 at upscale restaurants.",
    attractions: "Main attractions include Jardin Majorelle ($8), Bahia Palace ($3), and Medina markets (free entry)."
  },
  // Other cities...
}
```

### How to Extend the Chatbot

1. **Add New Cities**: Add more city objects to the `cityInfo` constant
2. **Add New Categories**: Extend city objects with additional information categories
3. **Customize Questions**: Modify the predefined questions array to add more options

---

## Pattern System

The application features a comprehensive Moroccan pattern system that adds visual richness and cultural authenticity.

### Pattern Components

- **CustomZellijPattern**: A configurable component for displaying zellij patterns
- **ZellijPattern & MoroccanArchPattern**: Predefined pattern components

### Pattern Animation

Patterns use the `pattern-float` animation for subtle movement:

```tsx
<div 
  className="absolute inset-0 opacity-10 z-0 pointer-events-none animate-pattern-float"
  style={{
    backgroundImage: "url('/assets/patterns/Tarceeh 1-7-11imageOne.jpg')",
    backgroundRepeat: "repeat",
    backgroundSize: "400px",
    imageRendering: "auto",
  }}
/>
```

The animation moves the background position continuously in a seamless loop:

```typescript
'pattern-float': {
  '0%': { backgroundPosition: '0px 0px' },
  '100%': { backgroundPosition: '400px 400px' },
},
```

With a duration of 60 seconds:

```typescript
'pattern-float': 'pattern-float 60s linear infinite',
```

### Pattern Management

The `manage-patterns.sh` script provides utilities for working with pattern images:

```bash
./manage-patterns.sh optimize <image-path>  # Optimize an image for web use
./manage-patterns.sh list                   # List available patterns
./manage-patterns.sh visualize              # Access pattern visualizer
```

The Pattern Visualizer (`/pattern-visualizer`) allows testing different patterns and configurations during development.

---

## Authentication Flow

The authentication system is implemented in the `app/auth` directory with corresponding components in `components/auth`.

### Login Process

1. User enters credentials in the `LoginForm` component
2. Form validation occurs via React Hook Form and Zod
3. On successful validation, the authentication request is sent
4. User is redirected to the homepage on success or shown an error

### Registration Process

Similar to login but with additional fields for user information.

### Form Validation

Forms use React Hook Form with Zod schemas for validation:

```typescript
// Example schema
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
```

### Authentication Placeholders

The current implementation uses placeholder functions for authentication processes. These are located in the login and registration form components:

```typescript
// components/auth/login-form.tsx
const onSubmit = async (data: z.infer<typeof formSchema>) => {
  // This is a placeholder for actual authentication logic
  // Replace with your authentication service integration
  try {
    // Simulated API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // TODO: Replace with actual authentication API call
    // Example: await authService.login(data.email, data.password);
    
    toast({
      title: "Login successful!",
      description: "Welcome back to the platform.",
    });
    
    // Redirect to dashboard or home page
    router.push('/');
  } catch (error) {
    toast({
      title: "Authentication failed",
      description: "Please check your credentials and try again.",
      variant: "destructive",
    });
  }
};
```

To implement actual authentication:

1. Create an authentication service in `/lib/auth.ts`
2. Replace the placeholder functions with actual API calls
3. Implement proper session management
4. Update the forms to handle real authentication responses

Recommended authentication options:
- Next-Auth for OAuth and social login integration
- Custom JWT implementation for simpler use cases
- Firebase Authentication for quick setup

---

## Adding New Features

### Adding a New Page

1. Create a new directory in the `app` folder
2. Add a `page.tsx` file with the page component
3. Update navigation if necessary

Example:

```tsx
// app/new-feature/page.tsx
export default function NewFeaturePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="section-title">New Feature</h1>
      {/* Page content */}
    </div>
  );
}
```

### Adding a New Component

1. Create a new file in the appropriate directory under `components`
2. Export the component using named or default exports
3. Import and use the component where needed

Example:

```tsx
// components/ui/new-component.tsx
export function NewComponent({ title, children }) {
  return (
    <div className="p-4 border rounded">
      <h2 className="font-amiri text-xl mb-2">{title}</h2>
      <div>{children}</div>
    </div>
  );
}
```

### Adding a New Pattern

1. Add the pattern image to `/public/pattern-options/`
2. Optimize it using the pattern management script:
   ```bash
   ./manage-patterns.sh optimize /path/to/new-pattern.jpg
   ```
3. Use it in your components:
   ```tsx
   <div
     className="absolute inset-0 opacity-10 animate-pattern-float"
     style={{
       backgroundImage: "url('/pattern-options/new-pattern.jpg')",
       backgroundRepeat: "repeat",
       backgroundSize: "400px",
       imageRendering: "auto",
     }}
   />
   ```

---

## Best Practices

### Code Style

- Use TypeScript for all new files
- Follow the existing component structure
- Use named exports for reusable components
- Use Tailwind CSS for styling
- Use the Moroccan color palette for consistency

### Performance Considerations

- Optimize images before adding them to the project
- Use the `Image` component from Next.js for responsive images
- Keep pattern opacity low (typically 0.10) to prevent visual overload
- Use the `next/dynamic` import for components that are not needed immediately

### Accessibility

- Use semantic HTML elements
- Include alt text for all images
- Ensure sufficient color contrast
- Test keyboard navigation

---

## Deployment Guidelines

### Build Process

1. Run the build command:
   ```bash
   npm run build
   ```

2. Test the production build locally:
   ```bash
   npm start
   ```

3. Deploy to your hosting provider

### Environment Variables

The application may use environment variables for configuration. Create a `.env.local` file for local development and set appropriate variables in your production environment.

---

## Additional Documentation

For more detailed information about specific components and systems, please refer to these specialized documentation files:

1. [Chatbot System Documentation](./chatbot-system.md) - Details about the interactive city information chatbot
2. [Zellij Pattern System](./zellij-pattern-system.md) - Documentation for the Moroccan pattern system
3. [User Guide](./user-guide.md) - End-user documentation (also available in [French](./user-guide-fr.md))

These documents provide in-depth information about specific aspects of the platform and are regularly updated as new features are added.

---

## Troubleshooting

### Common Issues

#### Pattern Rendering Issues

If patterns are not rendering correctly:

- Check that the image path is correct
- Ensure the image file exists
- Verify the animation is properly applied
- Check browser console for errors

#### Style Inconsistencies

If styles are not applied correctly:

- Restart the development server
- Check Tailwind configuration
- Verify class names are correct

#### Build Errors

If the build fails:

- Check for TypeScript errors
- Ensure all dependencies are installed
- Verify file imports are correct

---

For additional support, refer to the project README or contact the project maintainers.
