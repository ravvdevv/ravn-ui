/* RAVN UI - Interactivity (Improved) */

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
                    
                    // Optional: trigger event for content switching
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

    // Initialize all
    initModals();
    initDropdowns();
    initTabs();
    initAccordions();
});

// Global RAVN Utilities
window.RAVN = {
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
    modal: (id, action) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (action === 'open') {
            el.classList.add('open');
            document.body.style.overflow = 'hidden';
        } else {
            el.classList.remove('open');
            document.body.style.overflow = '';
        }
    },
    showToast: (message) => {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerText = message;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },
    copy: (text, successMsg = 'Copied to clipboard') => {
        navigator.clipboard.writeText(text).then(() => {
            window.RAVN.showToast(successMsg);
        });
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

// Global Interactivity
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
