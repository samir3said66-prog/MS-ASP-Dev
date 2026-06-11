# Project Architecture

## Directory Structure

```
MS-ASP-Dev/
├── public/                 # Static assets
│   ├── favicon.svg
│   └── resume.pdf
├── src/
│   ├── components/        # React components
│   │   ├── layout/       # Header, Footer, Navigation
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Toggles.tsx
│   │   ├── sections/     # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Education.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── SectionLabel.tsx
│   │   ├── three/        # Three.js components
│   │   │   └── InkParticles.tsx
│   │   └── ui/           # Reusable UI components (Radix)
│   ├── routes/           # TanStack Router pages
│   │   ├── __root.tsx    # Root layout
│   │   ├── index.tsx     # Home page
│   │   └── projects/
│   │       └── $slug.tsx # Project detail page
│   ├── i18n/             # Internationalization
│   │   ├── useT.ts       # Language hook
│   │   └── dictionaries.ts # EN/AR translations
│   ├── hooks/            # Custom React hooks
│   │   └── use-reduced-motion.ts
│   ├── styles/           # Style system
│   │   ├── theme.ts      # Centralized theme (FONTS, COLORS, etc.)
│   │   └── (in styles.css folder)
│   ├── lib/              # Utilities and helpers
│   │   └── api/          # API functions (mocked)
│   ├── styles.css        # Global styles & Tailwind config
│   ├── main.tsx          # React entry point
│   └── App.tsx           # Root component
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind CSS config
├── tsconfig.json         # TypeScript config
└── package.json          # Dependencies

docs/                      # Documentation
├── SETUP.md             # Installation & development
├── ARCHITECTURE.md      # This file
├── STYLING.md           # Design system & theming
├── DEPLOYMENT.md        # Build & deployment
└── INTERNATIONALIZATION.md # i18n setup
```

## Component Hierarchy

```
App
├── Header
│   ├── Navigation Links
│   ├── Resume Button
│   ├── Theme Toggle
│   └── Language Toggle
├── Main Routes
│   ├── Home Page
│   │   ├── Hero Section
│   │   ├── About Section
│   │   ├── Skills Section
│   │   ├── Projects Section
│   │   ├── Experience Section
│   │   ├── Education Section
│   │   ├── Contact Section
│   │   └── InkParticles (Three.js)
│   └── Project Detail Page
└── Footer
    ├── CTA Text
    ├── Colophon
    └── Social Links
```

## Key Technologies

### Frontend
- **React 19**: UI framework
- **TypeScript**: Type safety
- **TanStack Router**: Client-side routing
- **Vite**: Build tool & dev server

### Styling
- **Tailwind CSS v4**: Utility-first CSS
- **Radix UI**: Headless component library

### Animations
- **Framer Motion**: React animation library
- **Three.js**: 3D graphics (InkParticles)

### Forms & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation

### i18n
- **Custom i18n Hook**: useT() for translations
- **Dictionaries**: EN/AR language files

## Data Flow

### Static Content
- Content defined in `src/i18n/dictionaries.ts`
- Components render via `useT()` hook
- No API calls for main content

### Theme System
- Centralized in `src/styles/theme.ts`
- FONTS: Typography presets
- COLORS: Color utilities
- COMPONENTS: Pre-built component styles
- SPACING: Margin/padding utilities
- All used throughout components

### Routing
- TanStack Router for navigation
- File-based routing in `src/routes/`
- Dynamic routes support `/projects/:slug`

## Build & Deployment

### Development
- Vite dev server on `http://localhost:5173`
- Hot module reload (HMR)
- Fast refresh on save

### Production Build
- Output: `dist/` folder
- Optimized bundle with tree-shaking
- Deployed to Netlify with `netlify.toml`

## Performance Considerations

- Lazy loading for Three.js components
- Reduced motion support for animations
- Optimized images and assets
- CSS minification via Tailwind
- JavaScript minification via Vite

## Next Steps

- Review [STYLING.md](./STYLING.md) for design system
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment
- See [INTERNATIONALIZATION.md](./INTERNATIONALIZATION.md) for i18n
