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
        
        // Only apply saved/default theme if the user hasn't hardcoded one in HTML
        if (!currentTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme || 'light');
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
    }
};

window.RAVN.initTheme();
