# Project Setup Guide

## Prerequisites

- **Node.js**: 20.x or higher
- **Bun**: Latest version (or npm/yarn as alternative)
- **Git**: For version control

## Installation

### 1. Clone Repository
```bash
git clone <repository-url>
cd MS-ASP-Dev
```

### 2. Install Dependencies
```bash
# Using Bun (recommended)
bun install

# Or using npm
npm install

# Or using yarn
yarn install
```

## Development Server

```bash
# Start development server
bun run dev

# Server runs at http://localhost:5173
```

## Building for Production

```bash
# Build the project
bun run build

# Output goes to 'dist/' folder
```

## Code Quality

```bash
# Run linter
bun run lint

# Format code with Prettier
bun run format
```

## Preview Production Build

```bash
# Build and preview
bun run preview
```

## Troubleshooting

### Port Already in Use
If port 5173 is in use:
```bash
bun run dev -- --port 3000
```

### Clear Cache and Reinstall
```bash
rm -rf node_modules bun.lockb
bun install
```

### Build Errors
- Ensure Node.js version is 20.x or higher
- Clear `.vite` cache: `rm -rf .vite`
- Rebuild: `bun run build`

## Next Steps

- Review [ARCHITECTURE.md](./ARCHITECTURE.md) for project structure
- Check [STYLING.md](./STYLING.md) for design system documentation
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions
