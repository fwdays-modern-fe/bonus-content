# MFE Movies

A React-based Micro Frontend application for managing movies and watchlists, built with Vite and Zustand state management.

## Overview

This project serves as a standalone micro frontend for movie-related functionality, featuring a movie list and watchlist management system. It's built using modern React practices and efficient state management.

## Prerequisites

- Node.js (LTS version recommended)
- npm or yarn package manager

## Tech Stack

- **React**: ^18.3.1
- **Zustand**: ^5.0.2 (for state management)
- **Vite**: ^6.0.5

## Project Structure

```
mfe-movies/
├── node_modules/           # Dependencies
├── public/                 # Public assets
├── src/
│   ├── assets/            # Static assets
│   ├── components/        # React components
│   │   ├── Movies.jsx     # Movies component
│   │   ├── Movies.css     # Movies styles
│   │   ├── Watchlist.jsx  # Watchlist component
│   │   └── Watchlist.css  # Watchlist styles
│   ├── store/             # Zustand store
│   │   └── movie-store.js # Movie state management
│   ├── App.jsx           # Main application component
│   ├── App.css           # Application styles
│   ├── main.jsx          # Application entry point
│   ├── index.css         # Global styles
│   └── .env              # Environment variables
├── package.json
└── eslint.config.js
```

## Features

- **Movie Management**: Browse and manage movie listings
- **Watchlist**: Add/remove movies to/from watchlist
- **State Management**: Centralized state management using Zustand
- **Responsive Design**: CSS styles for various screen sizes

## Getting Started

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Start the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open your browser and navigate to the local development server (typically http://localhost:5173)

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the project for production
- `npm run lint` - Runs ESLint to check code quality
- `npm run preview` - Previews the production build locally

## Development Features

### Component Organization
- Separate components for Movies and Watchlist functionality
- Modular CSS for component-specific styling
- Centralized app-wide styles in App.css and index.css

### State Management with Zustand
- Centralized movie store for state management
- Efficient updates and state sharing between components
- Simple and lightweight state management solution

### ESLint Integration
Comprehensive linting setup with:
- React-specific linting rules
- React Hooks linting
- React Refresh plugin support

## Building for Production

To create a production build:

1. Run the build command:
```bash
npm run build
# or
yarn build
```

2. The built files will be in the `dist` directory

## Development Tools

- Vite for fast development and optimized builds
- ESLint for code quality enforcement
- React DevTools for component debugging

## Best Practices

1. Component Development:
    - Keep components focused and single-responsibility
    - Use CSS modules for style isolation
    - Follow React best practices for hooks and state management

2. State Management:
    - Use Zustand stores for shared state
    - Keep state updates atomic and predictable
    - Leverage selectors for efficient renders
