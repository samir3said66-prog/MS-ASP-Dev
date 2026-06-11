# Internationalization (i18n) Guide

## Overview

The portfolio supports both English and Arabic with seamless language switching. The i18n system is custom-built for simplicity and performance.

## Structure

### Main Files

```
src/i18n/
├── useT.ts              # Custom hook for translations
├── dictionaries.ts      # EN/AR language dictionaries
└── (language switching state managed via Zustand)
```

## Translation System

### useT() Hook

Use this hook in any component to access translations:

```tsx
import { useT } from "@/i18n/useT";

export function MyComponent() {
  const t = useT();
  
  return <h1>{t.hero.title}</h1>;
}
```

### Dictionary Structure

Translations organized in `src/i18n/dictionaries.ts`:

```typescript
export const en = {
  nav: {
    about: "About",
    skills: "Skills",
    projects: "Work",
    // ...
  },
  hero: {
    eyebrow: "Full-Stack · .NET · 2026",
    title: ["Pragmatic systems,", "shipped on", "ASP.NET Core."],
    lede: "Senior full-stack engineer...",
    // ...
  },
  about: {
    eyebrow: "About",
    title: "Backend depth, full-stack reach.",
    body: [
      "I've spent the last eight years...",
      // ...
    ],
    stats: [
      { value: "4+", label: "Years on .NET" },
      // ...
    ],
  },
  // ... other sections
};

export const ar: Dictionary = {
  // Arabic translations
};

export type Dictionary = typeof en;
```

## Adding Translations

### 1. Add to English Dictionary

Edit `src/i18n/dictionaries.ts`:

```typescript
export const en = {
  // ... existing
  myNewSection: {
    title: "My Title",
    description: "My description",
  },
};
```

### 2. Add to Arabic Dictionary

In the same file, add to `ar` object:

```typescript
export const ar: Dictionary = {
  // ... existing
  myNewSection: {
    title: "عنواني",
    description: "وصفي",
  },
};
```

### 3. Use in Component

```tsx
import { useT } from "@/i18n/useT";

export function MyComponent() {
  const t = useT();
  return (
    <div>
      <h1>{t.myNewSection.title}</h1>
      <p>{t.myNewSection.description}</p>
    </div>
  );
}
```

## Language Switching

### Toggle Component

Located in `src/components/layout/Toggles.tsx`:

```tsx
export function LocaleToggle() {
  const locale = useLocale();
  const setLocale = useSetLocale();
  
  return (
    <button onClick={() => setLocale(locale === "en" ? "ar" : "en")}>
      {locale === "en" ? "العربية" : "English"}
    </button>
  );
}
```

### Zustand Store

State managed in store (check for store location):

```typescript
// Language state
const locale = useLocale();        // Current language ("en" | "ar")
const setLocale = useSetLocale(); // Set language function
```

## RTL Support

### Automatic RTL

When language is Arabic (`ar`):
- HTML `dir="rtl"` attribute set automatically
- CSS handles RTL layout via `html[dir="rtl"]` selectors
- Components automatically adapt

### Arabic-Specific Fonts

In `src/styles.css`:

```css
html[dir="rtl"] body {
  font-family: var(--font-arabic); /* Tajawal font */
}
```

## Current Languages

### English
- **Code**: `en`
- **Default**: Yes
- **Font**: Italianno (body), Jim Nightshade (headings)
- **Direction**: LTR

### Arabic
- **Code**: `ar`
- **Fallback**: Available
- **Font**: Tajawal (body), Jim Nightshade (headings)
- **Direction**: RTL

## Content Organization

### By Feature (Current)

```
nav: { about, skills, projects, ... }
hero: { eyebrow, title, lede, ... }
about: { eyebrow, title, body, stats }
skills: { eyebrow, title, groups }
projects: { eyebrow, title, items }
experience: { eyebrow, title, items }
education: { eyebrow, title, items }
contact: { eyebrow, title, lede, ... }
footer: { colophon, rights }
toggle: { theme, locale, light, dark }
```

### Accessing Nested Content

```tsx
// Nested arrays
t.about.body.map((paragraph, i) => (
  <p key={i}>{paragraph}</p>
))

// Nested objects
t.skills.groups.map((group) => (
  <div key={group.name}>
    <h3>{group.name}</h3>
    {group.items.map((item) => (...))}
  </div>
))

// Complex structures
t.projects.items.map((project) => (
  <a href={project.slug}>{project.name}</a>
))
```

## Translation Tips

### Do's ✓

- Keep translations synchronized between EN and AR
- Use semantic keys (not `text1`, `text2`)
- Group related content together
- Test RTL layout after adding Arabic

### Don'ts ✗

- Don't hardcode strings in components
- Don't translate in multiple places
- Don't change key names after publishing
- Don't assume English grammar in other languages

## Type Safety

Dictionary is typed as `Dictionary = typeof en`:

```typescript
// Automatic type checking
const value = t.hero.title;        // ✓ Works
const value = t.hero.notExists;    // ✗ Type error
```

## Adding New Language

To add a new language (e.g., French):

### 1. Create Dictionary

```typescript
export const fr: Dictionary = {
  nav: { about: "À propos", ... },
  // ... copy structure from en
};
```

### 2. Update Type

```typescript
export type LocaleCode = "en" | "ar" | "fr";
```

### 3. Update Store

Add to language options in locale store/context

### 4. Add Font (if needed)

```css
html[lang="fr"] body {
  font-family: var(--font-sans);
}
```

## Common Patterns

### Plural Handling

For simple plural:

```typescript
// Define variants separately
stats: [
  { value: "4+", label: "Years on .NET" },
  { value: "50+", label: "APIs in production" },
]

// In component
<p>{stats[0].label}</p>
```

### Conditional Content

```tsx
// In component
const t = useT();
const isArabic = locale === "ar";

return isArabic ? (
  <div dir="rtl">{t.content}</div>
) : (
  <div>{t.content}</div>
);
```

### Dynamic Content

```typescript
// In dictionary
projects: {
  items: [
    { slug: "ledger-core", name: "Ledger Core", ... },
    { slug: "souq-commerce", name: "Souq Commerce", ... },
  ]
}

// In component
t.projects.items.map(item => (
  <a key={item.slug} href={`/projects/${item.slug}`}>
    {item.name}
  </a>
))
```

## Performance Considerations

- **No runtime translation** - All text pre-compiled
- **No external libraries** - Custom lightweight solution
- **Optimal bundle size** - Only needed languages loaded
- **Type safe** - Catches missing translations at build time

## Debugging

### Check Current Language

```tsx
import { useLocale } from "@/store"; // or your store location

export function DebugLanguage() {
  const locale = useLocale();
  return <div>Current language: {locale}</div>;
}
```

### Log Translations

```typescript
console.log(t); // View all available translations
console.log(t.hero); // View specific section
```

## Best Practices

1. **Always update both EN and AR** when adding content
2. **Test RTL layout** after Arabic additions
3. **Use semantic keys** that describe content
4. **Keep translations organized** by feature
5. **Document special formatting** (arrays, nested objects)
6. **Review translations** for accuracy and cultural appropriateness

## Next Steps

- Review [STYLING.md](./STYLING.md) for design system
- Check [ARCHITECTURE.md](./ARCHITECTURE.md) for project structure
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment information
