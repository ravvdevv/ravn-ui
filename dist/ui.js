/* RAVN UI - Interactivity (v1.6.0 — Accessibility & Dynamic Init) */

(() => {
    'use strict';

    // ── Helpers ──────────────────────────────────────────────
    const $ = (sel, ctx = document) => ctx.querySelectorAll(sel);
    const on = (el, ev, fn) => el.addEventListener(ev, fn);
    const trapFocus = (el) => {
        const focusable = $(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
            el
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        on(el, 'keydown', (e) => {
            if (e.key !== 'Tab') return;
            if (e.shiftKey) {
                if (document.activeElement === first) { e.preventDefault(); last.focus(); }
            } else {
                if (document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        });
        first.focus();
    };

    // ── Modal ────────────────────────────────────────────────
    const initModals = () => {
        // Trigger buttons
        $('[data-modal-toggle]').forEach(trigger => {
            on(trigger, 'click', (e) => {
                e.preventDefault();
                const modalId = trigger.getAttribute('data-modal-toggle');
                const modal = document.getElementById(modalId);
                if (!modal) return;
                const isOpen = modal.classList.contains('modal-open');
                if (isOpen) {
                    closeModal(modal);
                } else {
                    openModal(modal);
                }
            });
        });

        // Backdrop click to close
        $('.modal').forEach(modal => {
            on(modal, 'click', (e) => {
                if (e.target === modal) closeModal(modal);
            });
        });

        // Close buttons inside modals
        $('[data-modal-close]').forEach(btn => {
            on(btn, 'click', () => {
                const modal = btn.closest('.modal');
                if (modal) closeModal(modal);
            });
        });
    };

    const openModal = (modal) => {
        modal.classList.add('modal-open');
        modal.setAttribute('aria-hidden', 'false');
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        document.body.style.overflow = 'hidden';
        trapFocus(modal);
    };

    const closeModal = (modal) => {
        modal.classList.remove('modal-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        // Return focus to trigger
        const trigger = document.querySelector(`[data-modal-toggle="${modal.id}"]`);
        if (trigger) trigger.focus();
    };

    // ── Dropdown ─────────────────────────────────────────────
    const initDropdowns = () => {
        $('.dropdown').forEach(dropdown => {
            const toggle = dropdown.querySelector('.btn') || dropdown.querySelector('.dropdown-toggle');
            if (!toggle) return;

            toggle.setAttribute('aria-haspopup', 'true');
            toggle.setAttribute('aria-expanded', 'false');

            on(toggle, 'click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const isOpen = dropdown.classList.contains('dropdown-open');
                closeAllDropdowns();
                if (!isOpen) {
                    dropdown.classList.add('dropdown-open');
                    toggle.setAttribute('aria-expanded', 'true');
                }
            });

            // Keyboard nav inside dropdown
            on(dropdown, 'keydown', (e) => {
                const items = Array.from($('.dropdown-item', dropdown));
                if (!items.length) return;
                const idx = items.indexOf(document.activeElement);
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    items[(idx + 1) % items.length].focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    items[(idx - 1 + items.length) % items.length].focus();
                } else if (e.key === 'Escape') {
                    closeAllDropdowns();
                    toggle.focus();
                }
            });
        });

        on(document, 'click', (e) => {
            if (!e.target.closest('.dropdown')) closeAllDropdowns();
        });
    };

    const closeAllDropdowns = () => {
        $('.dropdown.dropdown-open').forEach(d => {
            d.classList.remove('dropdown-open');
            const toggle = d.querySelector('.btn') || d.querySelector('.dropdown-toggle');
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
        });
    };

    // ── Tabs ─────────────────────────────────────────────────
    const initTabs = () => {
        $('.tabs').forEach(tabGroup => {
            const tabs = Array.from($('.tab', tabGroup));
            tabGroup.setAttribute('role', 'tablist');
            tabs.forEach((tab, i) => {
                tab.setAttribute('role', 'tab');
                tab.setAttribute('tabindex', i === 0 ? '0' : '-1');
                tab.setAttribute('aria-selected', i === '0' ? 'true' : 'false');
                const contentId = tab.getAttribute('data-tab-target');
                if (contentId) tab.setAttribute('aria-controls', contentId);
            });

            on(tabGroup, 'click', (e) => {
                const tab = e.target.closest('.tab');
                if (!tab) return;
                activateTab(tab, tabs);
            });

            on(tabGroup, 'keydown', (e) => {
                const idx = tabs.indexOf(document.activeElement);
                if (idx === -1) return;
                let next;
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    next = tabs[(idx + 1) % tabs.length];
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    next = tabs[(idx - 1 + tabs.length) % tabs.length];
                } else if (e.key === 'Home') {
                    e.preventDefault();
                    next = tabs[0];
                } else if (e.key === 'End') {
                    e.preventDefault();
                    next = tabs[tabs.length - 1];
                }
                if (next) {
                    tabs.forEach(t => t.setAttribute('tabindex', '-1'));
                    next.setAttribute('tabindex', '0');
                    next.focus();
                }
            });
        });
    };

    const activateTab = (tab, tabs) => {
        tabs.forEach(t => {
            t.classList.remove('tab-active');
            t.setAttribute('aria-selected', 'false');
            t.setAttribute('tabindex', '-1');
        });
        tab.classList.add('tab-active');
        tab.setAttribute('aria-selected', 'true');
        tab.setAttribute('tabindex', '0');

        const contentId = tab.getAttribute('data-tab-target');
        if (contentId) {
            const content = document.getElementById(contentId);
            if (content) {
                content.parentElement.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
                content.style.display = 'block';
                content.setAttribute('role', 'tabpanel');
            }
        }
    };

    // ── Accordion ────────────────────────────────────────────
    const initAccordions = () => {
        $('.accordion-trigger').forEach(trigger => {
            trigger.setAttribute('aria-expanded', 'false');
            const content = trigger.nextElementSibling;
            if (content) {
                const id = content.id || ('acc-' + Math.random().toString(36).slice(2));
                content.id = id;
                trigger.setAttribute('aria-controls', id);
                content.setAttribute('role', 'region');
                content.setAttribute('aria-labelledby', trigger.id || '');
            }
            on(trigger, 'click', () => {
                const item = trigger.parentElement;
                const isOpen = item.classList.toggle('open');
                trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            });
        });
    };

    // ── Tooltip ──────────────────────────────────────────────
    const initTooltips = () => {
        $('[data-tooltip]').forEach(el => {
            el.setAttribute('aria-describedby', ''); // will be set on hover
            on(el, 'mouseenter', () => showTooltip(el));
            on(el, 'mouseleave', () => hideTooltip(el));
            on(el, 'focus', () => showTooltip(el));
            on(el, 'blur', () => hideTooltip(el));
        });
    };

    const showTooltip = (el) => {
        const tooltipText = el.getAttribute('data-tooltip');
        if (!tooltipText) return;
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.innerText = tooltipText;
        tooltip.setAttribute('role', 'tooltip');
        const id = 'tip-' + Math.random().toString(36).slice(2);
        tooltip.id = id;
        el.setAttribute('aria-describedby', id);
        document.body.appendChild(tooltip);
        const rect = el.getBoundingClientRect();
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8 + window.scrollY}px`;
        tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + window.scrollX}px`;
        tooltip.style.opacity = '1';
        el._ravn_tooltip = tooltip;
    };

    const hideTooltip = (el) => {
        if (el._ravn_tooltip) {
            el._ravn_tooltip.remove();
            el._ravn_tooltip = null;
        }
        el.removeAttribute('aria-describedby');
    };

    // ── Toast ────────────────────────────────────────────────
    const initToasts = () => {
        $('[data-toast]').forEach(btn => {
            on(btn, 'click', () => {
                const msg = btn.getAttribute('data-toast');
                const type = btn.getAttribute('data-toast-type') || 'info';
                const duration = parseInt(btn.getAttribute('data-toast-duration'), 10) || 3000;
                RAVN.toast(msg, { type, duration });
            });
        });
    };

    // ── Global Init ──────────────────────────────────────────
    const init = () => {
        initModals();
        initDropdowns();
        initTabs();
        initAccordions();
        initTooltips();
        initToasts();
    };

    // Run on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ── Global RAVN Utilities ────────────────────────────────
    window.RAVN = {
        // Re-init for dynamically added content
        init,

        // Store
        store: {
            _state: {},
            _listeners: [],
            set: (key, value) => {
                window.RAVN.store._state[key] = value;
                window.RAVN.store._listeners.forEach(fn => fn(key, value, window.RAVN.store._state));
            },
            get: (key) => window.RAVN.store._state[key],
            subscribe: (fn) => {
                window.RAVN.store._listeners.push(fn);
                return () => {
                    window.RAVN.store._listeners = window.RAVN.store._listeners.filter(l => l !== fn);
                };
            }
        },

        on: (event, selector, handler) => {
            document.addEventListener(event, (e) => {
                const target = e.target.closest(selector);
                if (target) handler(e, target);
            });
        },

        fetch: async (url, options = {}) => {
            try {
                const res = await fetch(url, {
                    ...options,
                    headers: { 'Content-Type': 'application/json', ...options.headers }
                });
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const contentType = res.headers.get('content-type');
                if (contentType && contentType.indexOf('application/json') !== -1) return await res.json();
                return await res.text();
            } catch (err) {
                console.error('RAVN.fetch Error:', err);
                throw err;
            }
        },

        route: (path, updateUrl = true) => {
            const views = document.querySelectorAll('[data-route], [data-view]');
            views.forEach(v => v.style.display = 'none');
            const routeId = path.replace(/^#/, '') || 'home';
            const target = document.querySelector(`[data-route="${routeId}"]`) || document.querySelector(`[data-view="${routeId}"]`);
            if (target) {
                target.style.display = 'block';
                target.style.animation = 'fadeIn 0.3s ease-out';
                if (updateUrl) history.pushState({ route: routeId }, '', `#${routeId}`);
                if (window.RAVN._hooks && window.RAVN._hooks[routeId]) {
                    window.RAVN._hooks[routeId].forEach(fn => fn());
                }
            }
        },
        onViewEnter: (routeId, fn) => {
            if (!window.RAVN._hooks) window.RAVN._hooks = {};
            if (!window.RAVN._hooks[routeId]) window.RAVN._hooks[routeId] = [];
            window.RAVN._hooks[routeId].push(fn);
        },

        // Theme engine
        setTheme: (theme) => {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('ravn-theme', theme);
        },
        getTheme: () => document.documentElement.getAttribute('data-theme') || 'light',
        initTheme: () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const savedTheme = localStorage.getItem('ravn-theme');
            if (!currentTheme) {
                if (savedTheme) {
                    document.documentElement.setAttribute('data-theme', savedTheme);
                } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                }
            }
        },

        // Modal API
        modal: (config, action) => {
            if (typeof config === 'string') {
                const el = document.getElementById(config);
                if (!el) return;
                if (action === 'open') openModal(el);
                else closeModal(el);
                return;
            }
            // Dynamic modal: RAVN.modal({ title, content, actions })
            let container = document.getElementById('ravn-dynamic-modal');
            if (!container) {
                container = document.createElement('div');
                container.id = 'ravn-dynamic-modal';
                container.className = 'modal';
                container.innerHTML = `
                    <div class="modal-backdrop" data-modal-close></div>
                    <div class="modal-content card" style="max-width: 500px; margin: auto; position: relative; z-index: 1001;">
                        <div class="modal-header flex justify-between items-center p-6 pb-0">
                            <h3 class="modal-title font-bold m-0"></h3>
                            <button class="btn btn-ghost btn-sm" data-modal-close aria-label="Close dialog">&times;</button>
                        </div>
                        <div class="modal-body p-6"></div>
                        <div class="modal-footer p-6 flex justify-end gap-4" style="border-top: 1px solid var(--border)"></div>
                    </div>
                `;
                document.body.appendChild(container);
            }
            container.querySelector('.modal-title').innerHTML = config.title || '';
            container.querySelector('.modal-body').innerHTML = config.content || '';
            const footer = container.querySelector('.modal-footer');
            footer.innerHTML = '';
            if (config.actions) {
                config.actions.forEach(act => {
                    const btn = document.createElement('button');
                    btn.className = `btn ${act.class || 'btn-primary'}`;
                    btn.innerText = act.text;
                    btn.onclick = () => {
                        if (act.onClick) act.onClick();
                        if (act.close !== false) closeModal(container);
                    };
                    footer.appendChild(btn);
                });
            }
            openModal(container);
        },

        // Toast API
        toast: (message, options = {}) => {
            let container = document.querySelector('.toast-container');
            if (!container) {
                container = document.createElement('div');
                container.className = 'toast-container';
                container.setAttribute('role', 'status');
                container.setAttribute('aria-live', 'polite');
                container.style.cssText = 'position:fixed;bottom:2rem;right:2rem;display:flex;flex-direction:column;gap:0.5rem;z-index:9999;';
                document.body.appendChild(container);
            }
            const toast = document.createElement('div');
            const typeClass = options.type ? `alert-${options.type}` : 'alert-info';
            toast.className = `toast alert ${typeClass}`;
            toast.style.cssText = 'box-shadow:0 20px 25px -5px color-mix(in srgb, var(--foreground) 10%, transparent);transition:opacity 0.3s;';
            toast.innerHTML = `<div>${message}</div>`;
            container.appendChild(toast);
            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 300);
            }, options.duration || 3000);
        },
        showToast: (msg) => window.RAVN.toast(msg),

        copy: (text, successMsg = 'Copied to clipboard') => {
            navigator.clipboard.writeText(text).then(() => {
                window.RAVN.toast(successMsg, { type: 'success' });
            });
        },

        view: (targetId) => window.RAVN.route(targetId, false),

        toggleSidebar: () => {
            const isCollapsed = document.body.classList.toggle('sidebar-collapsed');
            localStorage.setItem('ravn-sidebar-collapsed', isCollapsed);
        },
        initSidebar: () => {
            const saved = localStorage.getItem('ravn-sidebar-collapsed');
            if (saved === 'true') document.body.classList.add('sidebar-collapsed');
        }
    };

    // Popstate for routing
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.route) {
            window.RAVN.route(e.state.route, false);
        } else {
            window.RAVN.route(window.location.hash || 'home', false);
        }
    });

    // Initial route
    document.addEventListener('DOMContentLoaded', () => {
        if (window.location.hash) window.RAVN.route(window.location.hash, false);
    });

    // Global event delegation
    document.addEventListener('click', (e) => {
        // Dropdowns
        const dropdownToggle = e.target.closest('[data-dropdown]');
        if (dropdownToggle) {
            const dropdown = dropdownToggle.closest('.dropdown');
            dropdown.classList.toggle('open');
        } else if (!e.target.closest('.dropdown-menu')) {
            document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
        }

        // Modals
        const modalTrigger = e.target.closest('[data-modal-target]');
        if (modalTrigger) {
            window.RAVN.modal(modalTrigger.getAttribute('data-modal-target'), 'open');
        }
        if (e.target.classList.contains('modal-backdrop') || e.target.closest('[data-modal-close]')) {
            const modal = e.target.closest('.modal');
            if (modal) closeModal(modal);
        }

        // Accordions
        const accordionTrigger = e.target.closest('.accordion-trigger');
        if (accordionTrigger) {
            const item = accordionTrigger.parentElement;
            const isOpen = item.classList.toggle('open');
            accordionTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }

        // Layout sidebar toggle (mobile)
        const layoutToggle = e.target.closest('[data-layout-toggle]');
        if (layoutToggle) {
            const sidebar = document.querySelector('.layout-sidebar');
            if (sidebar) sidebar.classList.toggle('open');
        }

        // Sidebar item interactivity
        const sidebarItem = e.target.closest('.sidebar-item');
        if (sidebarItem) {
            const nav = sidebarItem.closest('.sidebar-nav');
            if (nav) {
                nav.querySelectorAll('.sidebar-item').forEach(item => item.classList.remove('active'));
                sidebarItem.classList.add('active');
            }
            const routeId = sidebarItem.getAttribute('data-target-route') || sidebarItem.getAttribute('data-target-view');
            if (routeId) window.RAVN.route(routeId);
        }
    });

    // Global keyboard handler
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.modal-open').forEach(m => closeModal(m));
            closeAllDropdowns();
        }
        const accordionTrigger = e.target.closest('.accordion-trigger');
        if (accordionTrigger && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            accordionTrigger.parentElement.classList.toggle('open');
        }
    });

    window.RAVN.initTheme();
    window.RAVN.initSidebar();
})();
