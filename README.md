<div align="center">
  <img src="https://ravn-ui.vercel.app/logo.png" alt="RAVN UI Logo" width="120" />
  <h1>RAVN UI</h1>
  <p><strong>The design core for Elite SaaS.</strong></p>
  <p>
    <img src="https://img.shields.io/npm/v/@ravn-ui/core?style=flat-square&color=black" alt="NPM Version" />
    <img src="https://img.shields.io/npm/l/@ravn-ui/core?style=flat-square&color=black" alt="License" />
    <img src="https://img.shields.io/npm/unpacked-size/@ravn-ui/core?style=flat-square&color=black" alt="NPM Unpacked Size" />
    <img src="https://img.shields.io/vercel/deploy/ravvdevv/ravn-ui?style=flat-square&color=black" alt="Vercel Status" />
  </p>
</div>

---

## ⚡ Introduction

RAVN UI is a minimalist, high-fidelity UI library designed for **Elite SaaS founders**. Inspired by the density of Linear and the refinement of shadcn/ui, it provides production-ready components with zero configuration.

No build tools, no bloated tailwind configs, no complex state management. Just pure, strictly designed CSS and JavaScript that scales.

## 🚀 Quickstart

### Via CDN (Recommended)
The fastest way to build. Add this to your `index.html`:

```html
<!DOCTYPE html>
<html lang="en" data-theme="midnight">
<head>
    <!-- Core Engine -->
    <link rel="stylesheet" href="https://unpkg.com/@ravn-ui/core/dist/ui.css">
    <link rel="stylesheet" href="https://unpkg.com/@ravn-ui/core/dist/themes.css">
</head>
<body>
    <button class="btn btn-primary">Elite SaaS Button</button>

    <!-- Interactivity -->
    <script src="https://unpkg.com/@ravn-ui/core/dist/ui.js"></script>
</body>
</html>
```

### Via Package Manager
```bash
# Using Bun (Recommended)
bun add @ravn-ui/core

# Using NPM
npm install @ravn-ui/core
```

## ✨ Core Principles

- **Zero Config**: Drop it in and start building. No PostCSS, no Tailwind, no stress.
- **Strict Aesthetic**: No emojis. No rounded-xl corners. Only professional, high-density interfaces.
- **Token Driven**: Built on a robust CSS variable system for effortless white-labeling.
- **Pure Interactivity**: Lightweight JS for Modals, Tabs, and Accordions. No React dependency.

## 🎨 Professional Themes

RAVN UI comes packed with 8+ "Elite" themes out of the box. Toggle them instantly via `data-theme`.

| Theme | Aesthetic | Primary Color |
| :--- | :--- | :--- |
| `light` | Clean SaaS | Neutral Black |
| `midnight` | OLED Depth | Paper White |
| `supabase` | Developer Focus | Emerald Green |
| `linear` | Enterprise Grade | Indigo Blue |
| `claude` | Academic Minimal | Amber Glow |
| `zinc` | Industrial Cold | Zinc Gray |
| `forest` | Organic Growth | Deep Green |

## 🛠️ Modular Usage

Import only what you need using our modular CSS source:

```css
@import "@ravn-ui/core/src/css/tokens.css";
@import "@ravn-ui/core/src/css/base.css";
@import "@ravn-ui/core/src/css/components.css";
```

## 📖 Documentation

Explore our interactive component playground and live previews:

👉 **[ravn-ui.vercel.app](https://ravn-ui.vercel.app)**

---

## 🤝 Contributing

We welcome contributions from the community. Whether it's a new component, a theme, or a bug fix, feel free to open a PR.

## 📄 License

RAVN UI is open-source software licensed under the [MIT License](LICENSE).

<div align="center">
  <p>Built for those who build the future. &copy; 2026 RAVN UI.</p>
</div>
