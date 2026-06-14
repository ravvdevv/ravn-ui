# Contributing to RAVN UI

Thanks for your interest! Here's how to contribute.

## Setup

```bash
git clone https://github.com/ravvdevv/ravn-ui.git
cd ravn-ui
bun install
```

## Project Structure

```
ravn-ui/
├── src/css/           # Source CSS (tokens, base, components, utilities)
│   ├── tokens.css     # Design tokens (colors, spacing, radius)
│   ├── base.css       # Reset, typography, scrollbar
│   ├── components.css # All component styles
│   └── utilities.css  # Layout utilities (flex, grid, spacing)
├── dist/              # Built files (CSS + JS + types)
│   ├── ui.css         # Concatenated CSS
│   ├── ui.js          # Interactive components
│   ├── ui.d.ts        # TypeScript types
│   └── themes.css     # All theme definitions
├── docs/              # Documentation site
└── scripts/           # Build scripts
```

## Making Changes

1. **CSS changes** → Edit files in `src/css/`, then rebuild `dist/ui.css` by concatenating in order: `tokens.css` → `base.css` → `components.css` → `utilities.css`
2. **JS changes** → Edit `dist/ui.js` directly (no build step for JS)
3. **New themes** → Add to `dist/themes.css` using `[data-theme="name"]` selector
4. **New components** → Add to `src/css/components.css` following existing patterns

## CSS Conventions

- Use CSS custom properties (tokens) — no hardcoded colors
- Use `color-mix()` instead of `rgba()` for transparency
- No `transition` on `*` — only on specific interactive elements
- Always include `:focus-visible` styles for keyboard navigation
- Respect `prefers-reduced-motion` (see `base.css`)

## JS Conventions

- Vanilla JS only — no dependencies
- All interactive components must include ARIA attributes
- Keyboard navigation required (Arrow keys, Escape, Enter/Space)
- Use `RAVN.init()` pattern for re-initialization support

## Accessibility Requirements

- All interactive elements need proper `aria-*` attributes
- Modals must trap focus and close on Escape
- Dropdowns must support arrow key navigation
- Tabs must use `role="tablist"` / `role="tab"` / `role="tabpanel"`
- Tooltips must work on focus (not just hover)
- Color contrast must pass WCAG AA for all themes

## Submitting

1. Create a feature branch: `git checkout -b feat/your-feature`
2. Make your changes
3. Test in the docs site (`bun run build:docs` then open `index.html`)
4. Open a PR with a clear description

## Versioning

We follow [SemVer](https://semver.org/):
- **Patch**: Bug fixes, a11y improvements
- **Minor**: New components, new themes
- **Major**: Breaking API changes
