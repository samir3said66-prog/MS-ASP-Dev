# Styling & Design System

## Overview

The portfolio uses a centralized design system defined in `src/styles/theme.ts` to ensure consistency across all components. No inline Tailwind classes - everything goes through the theme.

## Theme Structure

### FONTS - Typography System

Two-font strategy for visual hierarchy:

#### Display/Heading Fonts (Jim Nightshade)
```typescript
displayXl: "font-title text-6xl md:text-7xl leading-tight tracking-tight"
displayLg: "font-title text-4xl md:text-5xl leading-tight tracking-tight"
displayMd: "font-title text-3xl md:text-4xl leading-tight tracking-tight"
displaySm: "font-title text-2xl md:text-3xl leading-snug tracking-tight"
displayXs: "font-title text-xl md:text-2xl leading-snug tracking-tight"
```

#### Body Text (Italianno)
```typescript
bodyXl: "font-accent text-xl md:text-2xl leading-relaxed tracking-[-0.01em]"
bodyLg: "font-accent text-lg md:text-xl leading-relaxed tracking-[-0.005em]"
bodyMd: "font-accent text-base md:text-lg leading-relaxed"
bodySm: "font-accent text-sm md:text-base leading-relaxed"
bodyXs: "font-accent text-xs md:text-sm"
```

#### Labels & Captions (Italianno)
```typescript
labelLg: "font-accent text-sm md:text-base uppercase tracking-[0.2em] font-semibold"
labelMd: "font-accent text-sm uppercase tracking-[0.18em] font-medium"
labelSm: "font-accent text-xs md:text-sm uppercase tracking-[0.2em] font-medium"
labelXs: "font-accent text-xs uppercase tracking-[0.2em]"
```

### COLORS - Color System

#### Text Colors
```typescript
textBase: "text-foreground"          // Primary text
textMuted: "text-muted-foreground"   // Secondary text
```

#### Background Colors
```typescript
bgCard: "bg-card/50"                 // Semi-transparent card bg
bgCardLight: "bg-card/20"            // Light card bg
bgMobileMenu: "bg-background/95"     // Mobile menu bg
```

#### Hover States
```typescript
hoverState: "hover:bg-foreground hover:text-background..."
```

### SPACING - Layout Utilities

```typescript
section: "px-6 py-20 md:px-10 md:py-32"    // Section padding
cardPadding: "p-6 md:p-8"                   // Card internal padding
gap: "gap-6"                                // Default gap
largeGap: "gap-8"                          // Larger gap
smallGap: "gap-3"                          // Smaller gap
```

### BORDERS - Border Utilities

```typescript
roundedLg: "rounded-lg"
roundedXl: "rounded-xl"
rounded2xl: "rounded-2xl"
borderBase: "border border-border"
borderTransparent: "border border-border/40"
```

### ANIMATIONS - Motion System

```typescript
cardIn: {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  // ...
}
fadeIn: { ... }
scaleIn: { ... }
```

### GRIDS - Layout Grids

```typescript
sectionLayout: "grid gap-12 md:grid-cols-12"
mainContent: "grid gap-6 md:grid-cols-12"
cardGrid3Col: "grid gap-px overflow-hidden md:grid-cols-3"
```

### COMPONENTS - Pre-built Styles

#### Buttons
```typescript
buttonPrimary: "inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 ${FONTS.buttonSm} text-background transition hover:bg-foreground/90"

buttonSecondary: "inline-flex h-12 items-center gap-2 rounded-full border border-border px-6 ${FONTS.buttonSm} transition hover:bg-foreground hover:text-background"
```

#### Forms
```typescript
formLabel: "${FONTS.labelXs} ${COLORS.textMuted}"
formInput: "w-full ${BORDERS.roundedLg} border border-border bg-background/80 px-4 py-3 ${FONTS.inputLg} outline-none transition focus:border-foreground focus:bg-background"
formError: "mt-1 block ${FONTS.bodyXs} text-destructive"
```

#### Cards
```typescript
card: "rounded-lg border border-border/40 bg-card/30 p-6 md:p-8 transition hover:border-border/80"
```

## Color Palette

### Light Mode
```
Background: oklch(0.965 0.008 85)   // Off-white
Foreground: oklch(0.18 0.005 60)    // Dark
Card:       oklch(0.945 0.01 85)    // Light gray
Border:     oklch(0.88 0.013 80)    // Subtle gray
```

### Dark Mode
```
Background: oklch(0.16 0.003 60)    // Near-black
Foreground: oklch(0.955 0.008 85)   // Off-white
Card:       oklch(0.21 0.004 60)    // Dark gray
Border:     oklch(1 0 0 / 12%)      // Subtle white
```

## Font Families

### Jim Nightshade
- **Usage**: All headings, display text
- **Weight**: 400
- **Letter-spacing**: -0.02em
- **Google Fonts**: https://fonts.googleapis.com/css2?family=Jim+Nightshade

### Italianno
- **Usage**: Body text, labels, buttons, forms
- **Weight**: 400
- **Letter-spacing**: 0.02em
- **Google Fonts**: https://fonts.googleapis.com/css2?family=Italianno

### System Fonts
- **Body**: Work Sans (fallback: system-ui)
- **RTL (Arabic)**: Tajawal

## Using the Theme

### In Components
```tsx
import { FONTS, COLORS, SPACING, COMPONENTS } from "@/styles/theme";

export function MyComponent() {
  return (
    <div className={`${SPACING.section} ${COLORS.bgCard}`}>
      <h1 className={FONTS.displayLg}>Heading</h1>
      <p className={`${FONTS.bodyLg} ${COLORS.textMuted}`}>Text</p>
      <button className={COMPONENTS.buttonPrimary}>Action</button>
    </div>
  );
}
```

### Never Use Inline Classes
❌ **Bad**: `className="text-2xl font-bold text-slate-900"`
✅ **Good**: `className={FONTS.displaySm}`

## Responsive Design

All theme utilities use mobile-first approach:
```
Mobile:  Base size (no prefix)
Tablet:  md: prefix (768px+)
Desktop: lg: prefix (1024px+)
```

Example:
```typescript
"px-6 py-20 md:px-10 md:py-32"
// Mobile: 6 units padding, 20 units vertical
// Tablet+: 10 units padding, 32 units vertical
```

## Tailwind v4 Configuration

- **Source**: `src/styles.css`
- **Config**: Defined in `@theme inline` block
- **Design Tokens**: All CSS custom properties
- **Dark Mode**: `@custom-variant dark`

## Best Practices

1. **Always use theme constants** - Don't add inline Tailwind classes
2. **Maintain type safety** - Theme constants are TypeScript const objects
3. **Consider responsive design** - Use md: breakpoints appropriately
4. **Use color semantics** - textBase, textMuted, not specific colors
5. **Reuse components** - Use COMPONENTS pre-built styles
6. **Keep it DRY** - If you're repeating styles, add to theme

## Future Extensions

To add new theme utilities:

1. Add to appropriate object in `src/styles/theme.ts`
2. Export from the object
3. Import and use in components
4. Document in this file

Example:
```typescript
// Add to SPACING
customPadding: "px-12 py-8 md:px-16 md:py-12"

// Use in component
className={SPACING.customPadding}
```
