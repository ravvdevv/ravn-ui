# RAVN UI

<img src="logo.png" alt="RAVN Logo" width="120">

The design core for **Elite SaaS**. 

RAVN UI is a strictly designed, high-performance, and CDN-first UI library inspired by the precision of Linear and the flexibility of shadcn/ui. Built for developers who prioritize clarity, scale, and zero-configuration speed.

## Key Features
- **Elite Aesthetic**: High-fidelity design tokens, Inter typography, and a 4px precision spacing scale.
- **CDN-First**: No build tools, no npm installation required. Just copy-paste and build.
- **Modular Architecture**: Source files are split into logical modules (Tokens, Base, Components, Utilities).
- **Premium Themes**: Includes professional themes inspired by Supabase, Linear, and Claude.
- **Functional Documentation**: Built-in interactive search, scroll-sync, and one-click code copying.

## Why RAVN UI?
Most UI libraries are either too bloated (Bootstrap/Tailwind) or too complex to set up. RAVN UI is designed for **Elite SaaS** founders who need to move fast without sacrificing design precision.
- **Zero Config**: No build tools required.
- **Pure CSS/JS**: Minimal footprint, maximum performance.
- **Strict Aesthetic**: No emojis, no rounded edges, just professional density.

## Quickstart

### Via CDN (Recommended)
```html
<!DOCTYPE html>
<html lang="en" data-theme="midnight"> <!-- Set theme here -->
<head>
    <!-- Core Styles -->
    <link rel="stylesheet" href="https://unpkg.com/@ravn-ui/core/dist/ui.css">
    <link rel="stylesheet" href="https://unpkg.com/@ravn-ui/core/dist/themes.css">
</head>
<body>
    <button class="btn btn-primary">Elite SaaS Button</button>

    <!-- Core Logic -->
    <script src="https://unpkg.com/@ravn-ui/core/dist/ui.js"></script>
</body>
</html>
```

### Via Package Manager
```bash
# Using Bun
bun add @ravn-ui/core

# Using NPM
npm install @ravn-ui/core
```

## Modular Usage
If you prefer to use the modular source files:
```css
@import "@ravn-ui/core/src/css/tokens.css";
@import "@ravn-ui/core/src/css/base.css";
@import "@ravn-ui/core/src/css/components.css";
```

## Dynamic Theming
RAVN UI includes a lightweight JavaScript helper for real-time theme switching with persistence.

```javascript
// Switch themes dynamically
RAVN.setTheme('midnight'); 

// The helper handles:
// 1. DOM attribute updates
// 2. LocalStorage persistence
// 3. Smooth cross-fade transitions
```

## Available Themes
Apply any of these via `data-theme="NAME"` on your `<html>` tag.

| Theme | Aesthetic | Primary Color |
| :--- | :--- | :--- |
| `light` | Minimalist SaaS | Black |
| `dark` | Deep Space | White |
| `midnight` | OLED Black | White |
| `supabase` | Emerald Obsidian | Emerald |
| `linear` | Deep Navy | Indigo |
| `claude` | Refined Paper | Amber |
| `zinc` | Industrial Neutral | Zinc |
| `forest` | Professional Organic | Green |

## Documentation
For live previews and full component documentation, visit the [Documentation Portal](index.html) or our [GitHub Pages](https://ravvdevv.github.io/ravn-ui).

---
RAVN UI &copy; 2026. Built for those who build the future.
