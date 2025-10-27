# Portal

**Find Anyone Anywhere in the World**

Portal is a modern, interactive web portal featuring a 3D globe that allows users to explore countries and discover statistics about nationalities and languages worldwide.

## Features

- 🌍 **Interactive 3D Globe** - Realistic textured Earth with clouds, lighting, and smooth rotation
- 🗺️ **Countries and Cities** - Country markers plus a set of major city markers for quick orientation
- 📊 **Country Statistics** - Click on country markers to view detailed nationality and language statistics
- 🎨 **Modern Design** - Ultra-modern UI with dark and light theme modes
- 🔍 **Search Filters** - Preview of filtering by interests, language, and nationality
- 📱 **Mobile App Integration** - Information about the full-featured Portal mobile application

## Technologies Used

- **React 18** with TypeScript
- **Vite** for fast builds and development
- **Three.js** & **React Three Fiber** for 3D rendering
- **React Three Drei** for enhanced 3D components

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

Note: By default, the globe textures are loaded from threejs.org example assets (NASA-based). For offline use or to avoid external requests, download the textures and place them under `public/textures/earth` and update the URLs in `src/components/Globe.tsx` accordingly.

### Build

```bash
# Build for production
npm run build
```

### Preview Production Build

```bash
# Preview the production build
npm run preview
```

### Linting

```bash
# Run ESLint
npm run lint
```

## Deployment

### GitHub Pages

This project includes a GitHub Actions workflow for automatic deployment to GitHub Pages. To deploy:

1. Ensure GitHub Pages is enabled in your repository settings
2. Set the source to "GitHub Actions"
3. Push to the `main` branch or manually trigger the workflow

The site will be available at: `https://[username].github.io/[repo-name]/`

### Manual Deployment

Build the project and deploy the `dist` folder to any static hosting service:

```bash
npm run build
# Deploy the dist/ folder
```

## Project Structure

```
├── src/
│   ├── components/       # React components
│   │   ├── Globe.tsx    # 3D globe component
│   │   ├── Header.tsx   # Header with theme toggle
│   │   ├── Statistics.tsx    # Country statistics display
│   │   ├── Filters.tsx       # Search filters section
│   │   └── MobileAppSection.tsx  # Mobile app promotion
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── *.css            # Component styles
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## Theme Toggle

The portal supports both light and dark modes. Click the sun/moon icon in the header to switch between themes.

## Mobile Application

Full functionality including messaging, advanced search, and connection requests is available in the **Portal** mobile application for iOS and Android.

## License

© 2025 Portal. All rights reserved.