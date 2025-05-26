# Chatbot System Documentation

## Overview

The Chatbot System provides an interactive interface for visitors to learn about Moroccan cities and get information about prices for accommodations, restaurants, and attractions. This feature enhances the user experience by providing immediate answers to common questions without requiring users to navigate through multiple pages.

## Components

The chatbot system consists of two main components:

1. **ChatbotButton** (`/components/ui/chatbot-button.tsx`) - A floating button that opens the chatbot interface
2. **ChatModal** (`/components/ui/chat-modal.tsx`) - The main chatbot interface with city information

## Features

- **Floating Action Button**: Positioned in the bottom-right corner of the screen
- **Interactive Chat Interface**: Displays messages in a conversation format
- **Pre-defined Questions**: Quick access to commonly asked questions
- **City Information Database**: Includes data about hotels, restaurants, and attractions in major Moroccan cities
- **Smooth Animations**: Uses framer-motion for fluid transitions
- **Mobile Responsive**: Adapts to different screen sizes
- **Auto-scroll**: Automatically scrolls to the latest message

## City Information Database

The chatbot maintains a database of information about major Moroccan cities inside the `chat-modal.tsx` component:

```tsx
const cityInfo = {
  marrakech: {
    hotels: "Hotels in Marrakech range from $50-100/night for budget options to $200-500/night for luxury riads.",
    restaurants: "Meals range from $5-15 at local eateries to $30-70 at upscale restaurants.",
    attractions: "Main attractions include Jardin Majorelle ($8), Bahia Palace ($3), and Medina markets (free entry)."
  },
  casablanca: {
    hotels: "Hotels in Casablanca range from $60-120/night for budget options to $150-400/night for luxury hotels.",
    restaurants: "Meals range from $7-20 at local restaurants to $40-80 at upscale establishments.",
    attractions: "Main attractions include Hassan II Mosque ($12), Morocco Mall (free entry), and Old Medina (free entry)."
  },
  // Additional cities...
}
```

## Implementation Details

### Chatbot Button

The button features:

- Hover effect with tooltip
- Moroccan-themed colors
- Click to open chat modal
- Animation when showing/hiding

### Chat Modal

The modal includes:

- Header with title and close button
- Message history area
- Pre-defined question buttons
- Text input for custom questions
- Send button

## How to Extend

### Adding New Cities

To add a new city to the chatbot database:

1. Open `/components/ui/chat-modal.tsx`
2. Locate the `cityInfo` object
3. Add a new city entry with hotel, restaurant, and attraction information:

```tsx
newCity: {
  hotels: "Description of hotel prices in the city",
  restaurants: "Description of restaurant prices in the city",
  attractions: "Description of attraction prices in the city"
}
```

### Adding New Information Categories

To add a new category of information (e.g., nightlife, shopping):

1. Add the new category to each city in the `cityInfo` object:

```tsx
marrakech: {
  // Existing categories...
  nightlife: "Description of nightlife options and prices in Marrakech",
}
```

2. Update the `handleMessage` function to recognize and respond to questions about the new category

### Styling Customization

The chatbot follows the Moroccan theme with:

- Colors matching the Moroccan flag (red, green)
- Rounded corners for a friendly appearance
- Traditional-inspired button design

## Future Enhancements

Potential improvements for future versions:

1. **Natural Language Processing**: Integrate a proper NLP system for more flexible question handling
2. **User Preferences**: Remember user's previous questions and preferences
3. **Multi-language Support**: Add Arabic and French language options
4. **Integration with Live Data**: Connect to real-time data sources for hotels and events
5. **Chat History**: Save chat history between sessions

## Related Components

- `layout.tsx` - Includes the ChatbotButton component
- `globals.css` - Contains chat animation styling
