# Caeli Login UI

Shared login page components for Caeli tools.

## Packages

| Package | Description |
|---------|-------------|
| `@caeli-wind/login-styles` | CSS styles and design tokens |
| `@caeli-wind/login-react` | React components for Next.js |
| `@caeli-wind/login-vue` | Vue 3 components |

## Installation

### Prerequisites

Add the GitHub Packages registry to your project:

```bash
# .npmrc
@caeli-wind:registry=https://npm.pkg.github.com
```

### React/Next.js

```bash
pnpm add @caeli-wind/login-react @caeli-wind/login-styles
```

### Vue 3

```bash
npm install @caeli-wind/login-vue @caeli-wind/login-styles
```

## Usage

### React/Next.js

```tsx
// app/(auth)/layout.tsx
import { LoginLayout } from '@caeli-wind/login-react';
import '@caeli-wind/login-styles';

export default function AuthLayout({ children }) {
  return (
    <LoginLayout
      appTitle="CAELI"
      appSubtitle="QR"
      appDescription="QR-Code Management System"
    >
      {children}
    </LoginLayout>
  );
}
```

### Vue 3

```vue
<script setup lang="ts">
import { LoginLayout } from '@caeli-wind/login-vue';
import '@caeli-wind/login-styles';
</script>

<template>
  <LoginLayout
    app-title="CAELI"
    app-subtitle="CRAWLER"
    app-description="Web Crawler Management"
  >
    <LoginForm />
  </LoginLayout>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| appTitle | string | "CAELI" | Main title (gradient text) |
| appSubtitle | string | "" | Subtitle (e.g., "QR") |
| appDescription | string | "" | Description text |
| footerText | string | "© {year} Caeli Wind" | Footer text |
| particleCount | number | 20 | Number of floating particles |

## CSS Customization

Override CSS variables to customize the theme:

```css
:root {
  --caeli-primary: #113634;
  --caeli-secondary: #deeec6;
  --caeli-tertiary: #92a0ff;
  --caeli-bg-card: rgba(20, 41, 40, 0.8);
  --caeli-radius-card: 24px;
  --caeli-radius-input: 24px;
  --caeli-radius-button: 26px;
}
```

## Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Type check
pnpm typecheck

# Clean
pnpm clean
```

## Publishing

Packages are automatically published to GitHub Packages when a tag is pushed:

```bash
git tag v1.0.0
git push --tags
```

## License

MIT
