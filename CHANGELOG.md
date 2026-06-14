# Changelog

## [1.6.0] — 2026-06-14

### Accessibility (a11y)
- **Breaking**: Removed global `* { transition }` — was a performance footgun on large DOMs
- Added `prefers-reduced-motion` support — strips all animations/transitions when enabled
- Added ARIA attributes to all interactive components:
  - Modals: `role="dialog"`, `aria-modal`, `aria-hidden`
  - Dropdowns: `aria-haspopup`, `aria-expanded`
  - Tabs: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`
  - Accordions: `aria-expanded`, `aria-controls`, `role="region"`
  - Tooltips: `role="tooltip"`, `aria-describedby`
  - Toasts: `role="status"`, `aria-live="polite"`
- Added focus trapping in modals
- Added keyboard navigation:
  - Dropdowns: Arrow keys + Escape
  - Tabs: Arrow keys + Home/End
  - Modals: Escape to close + Tab trapping
- Added `focus-visible` outlines to buttons, inputs, and switches
- Tooltips now show on focus (not just hover)
- Toast close button has `aria-label`

### CSS Fixes
- Replaced all hardcoded `rgba()` values with `color-mix()` for theme compatibility
- Fixed table hover using `--gray-50` (breaks on dark themes) → now uses `--muted`
- Removed `pointer-events: none` from disabled buttons (allows tooltips on disabled state)
- Removed `transition: all` from `.btn`, `.input`, `.badge` (targeted transitions only)

### New Components
- **Pagination** — `.pagination`, `.pagination-btn`, `.pagination-ellipsis`
- **Progress variants** — `.progress-bar-success`, `.progress-bar-warning`, `.progress-bar-error`
- **KBD** — `.kbd` for keyboard shortcut display
- **Separator** — `.separator`, `.separator-vertical`
- **Skeleton variants** — `.skeleton-text`, `.skeleton-title`, `.skeleton-avatar`, `.skeleton-image`

### JavaScript
- Added `RAVN.init()` for re-initialization (SPA / dynamic DOM support)
- Encapsulated in IIFE to avoid global scope pollution
- Toast API: `RAVN.toast(msg, { type, duration })` with proper ARIA live region
- Modal API: programmatic `RAVN.modal({ title, content, actions })` with focus trap

### TypeScript
- Added `dist/ui.d.ts` with full type definitions for `window.RAVN`

### Package
- Bumped version to 1.6.0
- Added `types` field to package.json
- Removed `logo.png` and `favicon.png` from published files (wasted bytes)
- Removed unused `bin` field (no CLI tool)
- Added `bugs` and `homepage` URLs
- Added `accessible` and `a11y` keywords

### Docs
- Added `CONTRIBUTING.md`
- Added `CHANGELOG.md`

## [1.5.0] — 2026-06-13

- Core runtime, design system expansion, CLI generators
- Layout components (sidebar, header, content shell)
- Mobile responsive layout
- Density modes (`data-density="compact"`)

## [1.4.0]

- JS-based layout component system
- Improved docs site

## [1.0.0 — 1.3.9]

- Initial release and incremental improvements
- 13 premium themes
- Buttons, inputs, cards, badges, avatars, tables, modals, dropdowns, tabs, accordions, toasts, alerts
