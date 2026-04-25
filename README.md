<div align="center">
  <img src="https://ravn-ui.vercel.app/logo.png" alt="RAVN UI Logo" width="120" />
  <h1>RAVN UI</h1>
  <p><strong>From blank HTML to SaaS Dashboard in 5 minutes.</strong></p>
  <p>
    <img src="https://img.shields.io/npm/v/%40ravn-ui%2Fcore?style=flat-square&color=black" alt="NPM Version" />
    <img src="https://img.shields.io/npm/l/%40ravn-ui%2Fcore?style=flat-square&color=black" alt="License" />
  </p>
</div>

---

## ⚡ The Death of Setup Hell

Stop fighting with `tailwind.config.js` and PostCSS plugins. RAVN UI is a zero-config UI system for developers who need to ship SaaS dashboards **now**, not in three hours.

- **No Tailwind Config.**
- **No Build Step.**
- **No Setup.**
- **Just Paste and Ship.**

## 🚀 The 10-Second Quickstart

Copy this into your `index.html` and you have a production-ready SaaS core instantly.

```html
<head>
    <!-- Core SaaS Engine -->
    <link rel="stylesheet" href="https://unpkg.com/@ravn-ui/core/dist/ui.css">
    <link rel="stylesheet" href="https://unpkg.com/@ravn-ui/core/dist/themes.css">
</head>
<body>
    <div class="layout-shell">
        <aside class="layout-sidebar">...</aside>
        <main class="layout-main">...</main>
    </div>
    <script src="https://unpkg.com/@ravn-ui/core/dist/ui.js"></script>
</body>
```

## ✨ Why RAVN UI? (The Value)

- **Instant SaaS Layouts**: Use `.layout-shell` to get a production sidebar/header layout in 1 second.
- **Zero Framework Lock-in**: Works with React, Vue, HTMX, or pure HTML. No dependencies.
- **High-Density Design**: Inspired by the density of Linear. Built for professional admin panels, not consumer fluff.
- **13 "Elite" Themes**: Switch your entire UI style instantly with `data-theme`.


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
