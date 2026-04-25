#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const BANNER = `
\x1b[1m\x1b[35m  _____             __      __  _    _  _____ 
 |  __ \\     /\\     \\ \\    / / | |  | ||_   _|
 | |__) |   /  \\     \\ \\  / /  | |  | |  | |  
 |  _  /   / /\\ \\     \\ \\/ /   | |  | |  | |  
 | | \\ \\  / ____ \\     \\  /    | |__| | _| |_ 
 |_|  \\_\\/_/    \\_\\     \\/      \\____/ |_____|\x1b[0m

 \x1b[36mWelcome to RAVN UI — The SaaS Fast Track.\x1b[0m
 ------------------------------------------
`;

const USERS_PAGE_HTML = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Users — Boilerplate</title>
    <link rel="stylesheet" href="../node_modules/@ravn-ui/core/dist/ui.css">
    <link rel="stylesheet" href="../node_modules/@ravn-ui/core/dist/themes.css">
    <link rel="stylesheet" href="../assets/css/app.css">
</head>
<body>
    <div class="layout-shell">
        <aside class="layout-sidebar sidebar">
            <div class="sidebar-header"><div style="font-weight: 900; font-size: 1.5rem; color: var(--primary);">RAVN</div></div>
            <div class="sidebar-content">
                <nav class="sidebar-nav">
                    <a href="../index.html" class="sidebar-item">Dashboard</a>
                    <a href="javascript:void(0)" class="sidebar-item active">Users</a>
                    <a href="./settings.html" class="sidebar-item">Settings</a>
                </nav>
            </div>
        </aside>
        <main class="layout-main">
            <header class="layout-header">
                <div class="breadcrumbs"><a href="../index.html" class="breadcrumb-item">App</a><span class="breadcrumb-item active">Users</span></div>
            </header>
            <div class="layout-content">
                <div class="card">
                    <div class="card-header" style="justify-content: space-between; display: flex;">
                        <h3>Team Members</h3>
                        <button class="btn btn-primary btn-sm">+ Add User</button>
                    </div>
                    <div class="table-container" style="border: none;">
                        <table class="table">
                            <thead><tr><th>User</th><th>Role</th><th>Status</th><th>Joined</th></tr></thead>
                            <tbody>
                                <tr><td>Jane Cooper</td><td>Admin</td><td><span class="badge badge-secondary">Active</span></td><td>Jan 12, 2024</td></tr>
                                <tr><td>Cody Fisher</td><td>Editor</td><td><span class="badge">Offline</span></td><td>Feb 1, 2024</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    </div>
    <script src="../node_modules/@ravn-ui/core/dist/ui.js"></script>
    <script src="../assets/js/app.js"></script>
</body>
</html>`;

const SETTINGS_PAGE_HTML = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Settings — Boilerplate</title>
    <link rel="stylesheet" href="../node_modules/@ravn-ui/core/dist/ui.css">
    <link rel="stylesheet" href="../node_modules/@ravn-ui/core/dist/themes.css">
    <link rel="stylesheet" href="../assets/css/app.css">
</head>
<body>
    <div class="layout-shell">
        <aside class="layout-sidebar sidebar">
            <div class="sidebar-header"><div style="font-weight: 900; font-size: 1.5rem; color: var(--primary);">RAVN</div></div>
            <div class="sidebar-content">
                <nav class="sidebar-nav">
                    <a href="../index.html" class="sidebar-item">Dashboard</a>
                    <a href="./users.html" class="sidebar-item">Users</a>
                    <a href="javascript:void(0)" class="sidebar-item active">Settings</a>
                </nav>
            </div>
        </aside>
        <main class="layout-main">
            <header class="layout-header">
                <div class="breadcrumbs"><a href="../index.html" class="breadcrumb-item">App</a><span class="breadcrumb-item active">Settings</span></div>
            </header>
            <div class="layout-content" style="max-width: 800px;">
                <div class="card mb-8">
                    <div class="card-header"><h3>General Settings</h3></div>
                    <div class="p-6">
                        <div class="mb-4">
                            <label class="label">Organization Name</label>
                            <input type="text" class="input w-full" value="Acme Corp">
                        </div>
                        <div class="mb-4">
                            <label class="label">Primary Email</label>
                            <input type="email" class="input w-full" value="admin@acme.com">
                        </div>
                        <button class="btn btn-primary">Save Changes</button>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header"><h3>Security</h3></div>
                    <div class="p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <h4 class="mb-1">Two-Factor Authentication</h4>
                                <p class="text-sm text-muted">Add an extra layer of security to your account.</p>
                            </div>
                            <button class="btn btn-outline btn-sm">Enable</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
    <script src="../node_modules/@ravn-ui/core/dist/ui.js"></script>
    <script src="../assets/js/app.js"></script>
</body>
</html>`;

const DASHBOARD_HTML = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard — RAVN UI</title>
    <link rel="stylesheet" href="https://unpkg.com/@ravn-ui/core/dist/ui.css">
    <link rel="stylesheet" href="https://unpkg.com/@ravn-ui/core/dist/themes.css">
</head>
<body>
    <div class="layout-shell">
        <aside class="layout-sidebar sidebar">
            <div class="sidebar-header"><div style="font-weight: 900; font-size: 1.5rem; color: var(--primary);">RAVN</div></div>
            <div class="sidebar-content">
                <nav class="sidebar-nav">
                    <a href="javascript:void(0)" class="sidebar-item active">Dashboard</a>
                    <a href="./pages/users.html" class="sidebar-item">Users</a>
                    <a href="./pages/settings.html" class="sidebar-item">Settings</a>
                </nav>
            </div>
            <div style="padding: var(--space-4); border-top: 1px solid var(--border);">
                <a href="javascript:void(0)" class="sidebar-item" onclick="RAVN.toggleSidebar()">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
                    <span>Collapse</span>
                </a>
            </div>
        </aside>
        <main class="layout-main">
            <header class="layout-header" style="justify-content: space-between;">
                <div class="breadcrumbs"><span class="breadcrumb-item active">Overview</span></div>
                <div class="flex items-center gap-4">
                    <button class="btn btn-ghost btn-sm">Support</button>
                    <div class="avatar" style="width: 32px; height: 32px;">JD</div>
                </div>
            </header>
            <div class="layout-content">
                <div class="metrics-grid">
                    <div class="card" style="padding: var(--space-4);">
                        <div class="text-sm text-muted mb-1">REVENUE</div>
                        <div style="font-size: 1.75rem; font-weight: 800;">$45,231.89</div>
                        <div class="trend trend-up">↑ 12%</div>
                    </div>
                    <div class="card" style="padding: var(--space-4);">
                        <div class="text-sm text-muted mb-1">ACTIVE USERS</div>
                        <div style="font-size: 1.75rem; font-weight: 800;">2,350</div>
                        <div class="trend trend-up">↑ 180%</div>
                    </div>
                </div>
                <div class="card mt-6">
                    <div class="card-header"><h3>Project Status</h3></div>
                    <div class="p-12 text-center">
                        <div class="skeleton mx-auto mb-6" style="width: 64px; height: 64px; border-radius: 50%;"></div>
                        <h3>Welcome to your new SaaS!</h3>
                        <p class="text-muted mb-6">This is your production-ready boilerplate. Start by editing <code>index.html</code>.</p>
                        <div class="flex gap-4 justify-center">
                            <a href="./pages/users.html" class="btn btn-primary">Manage Team</a>
                            <a href="./pages/settings.html" class="btn btn-outline">Configure App</a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
    <script src="https://unpkg.com/@ravn-ui/core/dist/ui.js"></script>
</body>
</html>`;

const LANDING_HTML = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RAVN UI — Ship Faster</title>
    <link rel="stylesheet" href="https://unpkg.com/@ravn-ui/core/dist/ui.css">
    <link rel="stylesheet" href="https://unpkg.com/@ravn-ui/core/dist/themes.css">
</head>
<body>
    <header style="height: 72px; border-bottom: 1px solid var(--border); display: flex; align-items: center; padding: 0 var(--space-8); justify-content: space-between;">
        <div style="font-weight: 900; font-size: 1.25rem;">RAVN</div>
        <nav class="flex gap-6">
            <a href="#" class="text-sm font-medium">Features</a>
            <a href="#" class="text-sm font-medium">Pricing</a>
            <a href="#" class="text-sm font-medium">Docs</a>
        </nav>
        <button class="btn btn-primary btn-sm">Get Started</button>
    </header>

    <main style="max-width: 1000px; margin: 120px auto; padding: 0 var(--space-6);">
        <section style="text-align: center; margin-bottom: 100px;">
            <h1 style="font-size: 5rem; font-weight: 900; letter-spacing: -0.06em; line-height: 0.9; margin-bottom: 24px;">
                The SaaS UI for<br><span style="color: var(--primary);">Elite Builders.</span>
            </h1>
            <p style="font-size: 1.25rem; color: var(--muted-foreground); max-width: 600px; margin: 0 auto 40px;">
                A minimal, high-fidelity UI system designed for speed, scale, and aesthetic precision.
            </p>
            <div class="flex items-center justify-center gap-4">
                <button class="btn btn-primary btn-lg">Start Building</button>
                <button class="btn btn-outline btn-lg">View Components</button>
            </div>
        </section>

        <section class="grid" style="grid-template-columns: repeat(3, 1fr); gap: var(--space-8);">
            <div class="card" style="padding: var(--space-6);">
                <h3 style="margin-bottom: 8px;">Zero Config</h3>
                <p class="text-sm text-muted">No build steps. No Tailwind config. Just pure CSS excellence.</p>
            </div>
            <div class="card" style="padding: var(--space-6);">
                <h3 style="margin-bottom: 8px;">CDN First</h3>
                <p class="text-sm text-muted">Include two lines of code and you're ready to ship your MVP.</p>
            </div>
            <div class="card" style="padding: var(--space-6);">
                <h3 style="margin-bottom: 8px;">Premium Feel</h3>
                <p class="text-sm text-muted">Designed by SaaS experts for high-density enterprise apps.</p>
            </div>
        </section>
    </main>

    <footer style="margin-top: 120px; padding: var(--space-12) 0; border-top: 1px solid var(--border); text-align: center;">
        <p class="text-sm text-muted">© 2026 RAVN UI. Built with precision.</p>
    </footer>
    <script src="https://unpkg.com/@ravn-ui/core/dist/ui.js"></script>
</body>
</html>`;

const MINIMAL_HTML = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <title>New Project — RAVN UI</title>
    <link rel="stylesheet" href="https://unpkg.com/@ravn-ui/core/dist/ui.css">
    <link rel="stylesheet" href="https://unpkg.com/@ravn-ui/core/dist/themes.css">
</head>
<body style="padding: var(--space-12);">
    <div class="card" style="max-width: 400px; margin: 0 auto; padding: var(--space-8);">
        <h2 style="margin-bottom: var(--space-2);">Start Here</h2>
        <p class="text-muted mb-6">Your minimal RAVN UI environment is ready.</p>
        <button class="btn btn-primary w-full" onclick="RAVN.showToast('Ready to build!')">Get Started</button>
    </div>
    <script src="https://unpkg.com/@ravn-ui/core/dist/ui.js"></script>
</body>
</html>`;

console.log(BANNER);

const { execSync } = require('child_process');

rl.on('close', () => process.exit(0));

const args = process.argv.slice(2);
const firstArg = args[0];

if (firstArg === '.') {
    askTemplate('.');
} else {
    rl.question('\x1b[1mProject name:\x1b[0m ', (name) => {
        askTemplate(name);
    });
}

function askTemplate(projectName) {
    console.log('\n\x1b[1mChoose a starter template:\x1b[0m');
    console.log('  \x1b[36m1)\x1b[0m SaaS Dashboard (Best for apps)');
    console.log('  \x1b[36m2)\x1b[0m Landing Page (Best for marketing)');
    console.log('  \x1b[36m3)\x1b[0m Minimal Starter (Blank slate)');

    rl.question('\n\x1b[1mSelect (1-3):\x1b[0m ', (choice) => {
        let content = '';
        let templateName = '';

        switch(choice) {
            case '2': content = LANDING_HTML; templateName = 'Landing Page'; break;
            case '3': content = MINIMAL_HTML; templateName = 'Minimal'; break;
            default: content = DASHBOARD_HTML; templateName = 'SaaS Dashboard'; break;
        }

        askTheme(projectName, content, templateName);
    });
}

function askTheme(projectName, content, templateName) {
    console.log('\n\x1b[1mSelect a starting theme:\x1b[0m');
    console.log('  \x1b[36m1)\x1b[0m Light (Default)');
    console.log('  \x1b[36m2)\x1b[0m Dark (Night mode)');
    console.log('  \x1b[36m3)\x1b[0m Midnight (Elite Black)');
    console.log('  \x1b[36m4)\x1b[0m Indigo (SaaS Classic)');
    console.log('  \x1b[36m5)\x1b[0m Rose Pine (Sophisticated)');
    console.log('  \x1b[36m6)\x1b[0m Nord (Arctic Frost)');

    rl.question('\n\x1b[1mSelect (1-6):\x1b[0m ', (choice) => {
        let theme = 'light';
        switch(choice) {
            case '2': theme = 'dark'; break;
            case '3': theme = 'midnight'; break;
            case '4': theme = 'indigo'; break;
            case '5': theme = 'rose-pine'; break;
            case '6': theme = 'nord'; break;
            default: theme = 'light'; break;
        }

        const finalContent = content.replace('data-theme="light"', `data-theme="${theme}"`);
        askInstallMethod(projectName, finalContent, templateName);
    });
}

function askInstallMethod(projectName, content, templateName) {
    console.log('\n\x1b[1mInstall method:\x1b[0m');
    console.log('  \x1b[36m1)\x1b[0m CDN (Fastest, Online required)');
    console.log('  \x1b[36m2)\x1b[0m Local (Offline ready, uses node_modules)');

    rl.question('\n\x1b[1mSelect (1-2):\x1b[0m ', (method) => {
        const useLocal = method === '2';
        createProject(projectName, content, templateName, useLocal);
    });
}

function createProject(name, content, templateName, useLocal) {
    const isCurrentDir = name === '.';
    const targetDir = isCurrentDir ? process.cwd() : path.join(process.cwd(), name || 'ravn-app');
    
    if (!isCurrentDir && fs.existsSync(targetDir)) {
        console.error(`\x1b[31mError: Directory ${name} already exists.\x1b[0m`);
        process.exit(1);
    }

    console.log(`\x1b[34mCreating ${templateName} with React-like structure in ${isCurrentDir ? 'current directory' : targetDir}...\x1b[0m`);
    
    if (!isCurrentDir) {
        fs.mkdirSync(targetDir);
    }

    // Create directories (PHP-style)
    const assetsDir = path.join(targetDir, 'assets');
    const cssDir = path.join(assetsDir, 'css');
    const jsDir = path.join(assetsDir, 'js');
    const pagesDir = path.join(targetDir, 'pages');
    const functionsDir = path.join(targetDir, 'functions');

    if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir);
    if (!fs.existsSync(cssDir)) fs.mkdirSync(cssDir);
    if (!fs.existsSync(jsDir)) fs.mkdirSync(jsDir);
    if (!fs.existsSync(pagesDir)) fs.mkdirSync(pagesDir);
    if (!fs.existsSync(functionsDir)) fs.mkdirSync(functionsDir);

    // Default app.js logic
    const appJs = `// RAVN UI - Custom App Logic
document.addEventListener('DOMContentLoaded', () => {
    console.log('RAVN UI Project Initialized');
});`;

    // Default app.css
    const appCss = `/* Custom Styles */
body {
    background-color: var(--muted);
}`;

    // Default functions/utils.js
    const utilsJs = `// Utility Functions
export const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
};`;

    let finalContent = content;
    const uiCssPath = useLocal ? './node_modules/@ravn-ui/core/dist/ui.css' : 'https://unpkg.com/@ravn-ui/core/dist/ui.css';
    const themesCssPath = useLocal ? './node_modules/@ravn-ui/core/dist/themes.css' : 'https://unpkg.com/@ravn-ui/core/dist/themes.css';
    const uiJsPath = useLocal ? './node_modules/@ravn-ui/core/dist/ui.js' : 'https://unpkg.com/@ravn-ui/core/dist/ui.js';

    // Inject links into template (pointing to assets/)
    finalContent = content
        .replace(/<link rel="stylesheet" href="https:\/\/unpkg\.com\/@ravn-ui\/core\/dist\/ui\.css">/g, `<link rel="stylesheet" href="${uiCssPath}">\n    <link rel="stylesheet" href="${themesCssPath}">\n    <link rel="stylesheet" href="./assets/css/app.css">`)
        .replace(/<link rel="stylesheet" href="https:\/\/unpkg\.com\/@ravn-ui\/core\/dist\/themes\.css">/g, '')
        .replace(/<script src="https:\/\/unpkg\.com\/@ravn-ui\/core\/dist\/ui\.js"><\/script>/g, `<script src="${uiJsPath}"></script>\n    <script src="./assets/js/app.js"></script>`);
    
    fs.writeFileSync(path.join(targetDir, 'index.html'), finalContent);
    fs.writeFileSync(path.join(jsDir, 'app.js'), appJs);
    fs.writeFileSync(path.join(cssDir, 'app.css'), appCss);
    fs.writeFileSync(path.join(functionsDir, 'utils.js'), utilsJs);

    // Create boilerplate pages in pages/
    const pagesToCreate = [
        { name: 'users.html', content: USERS_PAGE_HTML },
        { name: 'settings.html', content: SETTINGS_PAGE_HTML }
    ];

    pagesToCreate.forEach(page => {
        let pageContent = page.content;
        if (!useLocal) {
            pageContent = pageContent
                .replace(/..\/node_modules\/@ravn-ui\/core\/dist\/ui\.css/g, 'https://unpkg.com/@ravn-ui/core/dist/ui.css')
                .replace(/..\/node_modules\/@ravn-ui\/core\/dist\/themes.css/g, 'https://unpkg.com/@ravn-ui/core/dist/themes.css')
                .replace(/..\/node_modules\/@ravn-ui\/core\/dist\/ui\.js/g, 'https://unpkg.com/@ravn-ui/core/dist/ui.js');
        }
        fs.writeFileSync(path.join(pagesDir, page.name), pageContent);
    });

    if (useLocal) {
        // Create basic package.json
        const pkg = {
            name: name === '.' ? path.basename(process.cwd()) : name,
            version: '0.1.0',
            private: true,
            scripts: {
                "dev": "npx serve .",
                "start": "npx serve ."
            }
        };
        fs.writeFileSync(path.join(targetDir, 'package.json'), JSON.stringify(pkg, null, 2));

        console.log(`\x1b[33mInstalling dependencies...\x1b[0m`);
        try {
            execSync('bun add @ravn-ui/core', { cwd: targetDir, stdio: 'inherit' });
        } catch (e) {
            console.log('\x1b[31mBun not found, falling back to npm...\x1b[0m');
            execSync('npm install @ravn-ui/core', { cwd: targetDir, stdio: 'inherit' });
        }
    }
    
    console.log('\n\x1b[32mSuccess! Your premium project is ready.\x1b[0m');
    console.log(`\x1b[1mFolder structure:\x1b[0m`);
    console.log(`  ├── assets/`);
    console.log(`  │   ├── css/app.css`);
    console.log(`  │   └── js/app.js`);
    console.log(`  ├── pages/`);
    console.log(`  ├── functions/utils.js`);
    console.log(`  ├── index.html`);
    if (useLocal) console.log(`  └── package.json`);
    
    console.log(`\n\x1b[1mNext steps:\x1b[0m`);
    if (!isCurrentDir) {
        console.log(`  cd ${name || 'ravn-app'}`);
    }
    if (useLocal) {
        console.log(`  bun dev (or npm run dev)`);
    } else {
        console.log(`  Open index.html in your browser\n`);
    }
    console.log(`\x1b[35mHappy building with RAVN UI!\x1b[0m\n`);
    
    process.exit(0);
}
