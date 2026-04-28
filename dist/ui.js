/* RAVN UI - Interactivity (Improved & Upgraded) */

document.addEventListener('DOMContentLoaded', () => {
    // Modal Logic
    const initModals = () => {
        const triggers = document.querySelectorAll('[data-modal-toggle]');
        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = trigger.getAttribute('data-modal-toggle');
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.classList.toggle('modal-open');
                    document.body.style.overflow = modal.classList.contains('modal-open') ? 'hidden' : '';
                }
            });
        });

        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('modal-open');
                    document.body.style.overflow = '';
                }
            });
        });
    };

    // Dropdown Logic
    const initDropdowns = () => {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            const toggle = dropdown.querySelector('.btn') || dropdown.querySelector('.dropdown-toggle');
            if (toggle) {
                toggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const isOpen = dropdown.classList.contains('dropdown-open');
                    
                    // Close all others
                    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('dropdown-open'));
                    
                    if (!isOpen) dropdown.classList.add('dropdown-open');
                });
            }
        });

        document.addEventListener('click', () => {
            document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('dropdown-open'));
        });
    };

    // Tab Logic
    const initTabs = () => {
        document.querySelectorAll('.tabs').forEach(tabGroup => {
            const tabs = tabGroup.querySelectorAll('.tab');
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    tabs.forEach(t => t.classList.remove('tab-active'));
                    tab.classList.add('tab-active');
                    
                    // Trigger event for content switching
                    const contentId = tab.getAttribute('data-tab-target');
                    if (contentId) {
                        const content = document.getElementById(contentId);
                        if (content) {
                            content.parentElement.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
                            content.style.display = 'block';
                        }
                    }
                });
            });
        });
    };

    // Accordion Logic
    const initAccordions = () => {
        document.querySelectorAll('.accordion-trigger').forEach(trigger => {
            trigger.addEventListener('click', () => {
                const item = trigger.parentElement;
                item.classList.toggle('open');
            });
        });
    };

    // Tooltip Logic
    const initTooltips = () => {
        document.querySelectorAll('[data-tooltip]').forEach(el => {
            el.addEventListener('mouseenter', () => {
                const tooltipText = el.getAttribute('data-tooltip');
                if (!tooltipText) return;
                let tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.innerText = tooltipText;
                document.body.appendChild(tooltip);
                
                const rect = el.getBoundingClientRect();
                tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8}px`;
                tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
                tooltip.style.opacity = '1';
                
                el._ravn_tooltip = tooltip;
            });
            el.addEventListener('mouseleave', () => {
                if (el._ravn_tooltip) {
                    el._ravn_tooltip.remove();
                    el._ravn_tooltip = null;
                }
            });
        });
    };

    // Initialize all
    initModals();
    initDropdowns();
    initTabs();
    initAccordions();
    initTooltips();
});

// Global RAVN Utilities
window.RAVN = {
    // 🧠 CORE RUNTIME ADDITIONS
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
            if (target) {
                handler(e, target);
            }
        });
    },

    fetch: async (url, options = {}) => {
        try {
            const res = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return await res.json();
            }
            return await res.text();
        } catch (err) {
            console.error('RAVN.fetch Error:', err);
            throw err;
        }
    },

    route: (path, updateUrl = true) => {
        const views = document.querySelectorAll('[data-route], [data-view]');
        views.forEach(v => v.style.display = 'none');
        
        // Support hash or path
        const routeId = path.replace(/^#/, '') || 'home';
        const target = document.querySelector(`[data-route="${routeId}"]`) || document.querySelector(`[data-view="${routeId}"]`);
        
        if (target) {
            target.style.display = 'block';
            target.style.animation = 'fadeIn 0.3s ease-out';
            
            if (updateUrl) {
                history.pushState({ route: routeId }, '', `#${routeId}`);
            }
            
            // Lifecycle hooks
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

    // 🎨 THEME ENGINE
    setTheme: (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('ravn-theme', theme);
    },
    getTheme: () => {
        return document.documentElement.getAttribute('data-theme') || 'light';
    },
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

    // 🧩 ESSENTIAL COMPONENTS
    modal: (config, action) => {
        if (typeof config === 'string') {
            // Legacy signature
            const el = document.getElementById(config);
            if (!el) return;
            if (action === 'open') {
                el.classList.add('open');
                document.body.style.overflow = 'hidden';
            } else {
                el.classList.remove('open');
                document.body.style.overflow = '';
            }
            return;
        }

        // New signature: RAVN.modal({ title, content, actions })
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
                        <button class="btn btn-ghost btn-sm" data-modal-close>&times;</button>
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
                    if (act.close !== false) window.RAVN.modal('ravn-dynamic-modal', 'close');
                };
                footer.appendChild(btn);
            });
        }
        
        window.RAVN.modal('ravn-dynamic-modal', 'open');
    },

    toast: (message, options = {}) => {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container flex flex-col gap-2 fixed bottom-4 right-4 z-50';
            document.body.appendChild(container);
        }
        const toast = document.createElement('div');
        const typeClass = options.type ? `alert-${options.type}` : 'alert-info';
        toast.className = `toast alert ${typeClass} shadow-lg transition-opacity duration-300`;
        toast.innerHTML = `<div>${message}</div>`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, options.duration || 3000);
    },
    showToast: (msg) => window.RAVN.toast(msg), // Legacy

    copy: (text, successMsg = 'Copied to clipboard') => {
        navigator.clipboard.writeText(text).then(() => {
            window.RAVN.toast(successMsg, { type: 'success' });
        });
    },

    // Legacy View Swapper (points to route now)
    view: (targetId) => {
        window.RAVN.route(targetId, false);
    },

    toggleSidebar: () => {
        const isCollapsed = document.body.classList.toggle('sidebar-collapsed');
        localStorage.setItem('ravn-sidebar-collapsed', isCollapsed);
    },
    initSidebar: () => {
        const saved = localStorage.getItem('ravn-sidebar-collapsed');
        if (saved === 'true') {
            document.body.classList.add('sidebar-collapsed');
        }
    }
};

// Global Routing (Browser Back/Forward Support)
window.addEventListener('popstate', (e) => {
    if (e.state && e.state.route) {
        window.RAVN.route(e.state.route, false);
    } else {
        window.RAVN.route(window.location.hash || 'home', false);
    }
});

// Initial Route
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash) {
        window.RAVN.route(window.location.hash, false);
    }
});

// Global Interactivity Event Delegation
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
        if (modal) window.RAVN.modal(modal.id, 'close');
    }

    // Accordions
    const accordionTrigger = e.target.closest('.accordion-trigger');
    if (accordionTrigger) {
        accordionTrigger.parentElement.classList.toggle('open');
    }

    // Layout Sidebar Toggle (Mobile)
    const layoutToggle = e.target.closest('[data-layout-toggle]');
    if (layoutToggle) {
        const sidebar = document.querySelector('.layout-sidebar');
        if (sidebar) sidebar.classList.toggle('open');
    }

    // Sidebar Item Interactivity (for demos & SPAs)
    const sidebarItem = e.target.closest('.sidebar-item');
    if (sidebarItem) {
        const nav = sidebarItem.closest('.sidebar-nav');
        if (nav) {
            nav.querySelectorAll('.sidebar-item').forEach(item => item.classList.remove('active'));
            sidebarItem.classList.add('active');
        }

        // SPA Navigation Support via routes
        const routeId = sidebarItem.getAttribute('data-target-route') || sidebarItem.getAttribute('data-target-view');
        if (routeId) {
            window.RAVN.route(routeId);
        }
    }
});

// Accessibility & Shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.open').forEach(m => window.RAVN.modal(m.id, 'close'));
        document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
    }
    
    // Accordion Keyboard Support
    const accordionTrigger = e.target.closest('.accordion-trigger');
    if (accordionTrigger && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        accordionTrigger.parentElement.classList.toggle('open');
    }
});

window.RAVN.initTheme();
window.RAVN.initSidebar();
