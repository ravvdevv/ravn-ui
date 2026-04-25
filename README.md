# RAVN UI

**From blank HTML to SaaS Dashboard in 5 minutes.** 

RAVN UI is a zero-config, CDN-first UI system for building production-ready SaaS interfaces without Tailwind, without build tools, and without setup hell.

---

## ⚡ 10-Second Quickstart

Copy this into your `index.html`. You now have a responsive, high-density SaaS shell.

```html
<head>
    <link rel="stylesheet" href="https://unpkg.com/@ravn-ui/core/dist/ui.css">
    <link rel="stylesheet" href="https://unpkg.com/@ravn-ui/core/dist/themes.css">
</head>
<body>
    <div class="layout-shell">
        <!-- Sidebar (Drawer on mobile) -->
        <aside class="layout-sidebar">
            <nav class="sidebar-nav">
                <a class="sidebar-item active">Dashboard</a>
                <a class="sidebar-item">Analytics</a>
            </nav>
        </aside>

        <!-- Main Content -->
        <main class="layout-main">
            <header class="layout-header">
                <button data-layout-toggle class="btn btn-sm">Menu</button>
                <h1 class="text-sm">Overview</h1>
            </header>
            <div class="layout-content">
                <!-- Your SaaS metrics, tables, and cards go here -->
            </div>
        </main>
    </div>
    <script src="https://unpkg.com/@ravn-ui/core/dist/ui.js"></script>
</body>
```

---

## 🚀 Why RAVN?

- **Zero Build Step**: No `npm install`, no `postcss.config.js`. Just a CDN link.
- **SaaS Shell Included**: Responsive sidebars and headers are core primitives, not examples.
- **13 Elite Themes**: Use `data-theme="midnight"` or `data-theme="supabase"` on the `<html>` tag to flip your style instantly.
- **Under 25KB**: Fast, lean, and 0 dependencies.

---

## 🎨 Themes
Try these in your `<html>` tag:
`light`, `dark`, `zinc`, `claude`, `midnight`, `forest`, `indigo`, `supabase`, `linear`, `retro`, `pixel-craft`, `rose-pine`, `nord`.

---

[Documentation](https://ravn-ui.vercel.app) | [License: MIT](LICENSE)
