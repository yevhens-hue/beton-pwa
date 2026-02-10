# Beton Web App

This is a **Progressive Web App (PWA)** implementation of the Beton sports betting platform, designed to mimic the native iOS experience. It uses modern web technologies to run in any browser without needing Xcode or iOS devices.

## Tech Stack
- **React** (Framework)
- **Vite** (Build Tool)
- **Tailwind CSS** (Styling)
- **Lucide React** (Icons)

## Features
- **Responsive Design**: Looks like a native app on mobile devices.
- **Home Screen**: Promotions, balance, and game categories.
- **Sports Betting**: Live/Prematch toggle, odds display.
- **User Profile**: Wallet management and settings.

## How to Run

1. Open a terminal in the project folder.
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open the link shown in the terminal (usually `http://localhost:5173`) in your browser.
4. For the best experience, use Chrome DevTools and toggle "Device Toolbar" (Cmd+Shift+M) to simulate a mobile device (iPhone 14/15 Pro).

## Project Structure
- `src/App.tsx`: Main entry point with bottom navigation.
- `src/pages/`: Individual screens (Home, Sports, Profile).
- `src/components/`: Reusable UI components.
- `src/lib/`: Utilities.
