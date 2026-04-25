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
        <!-- Sidebar -->
        <aside class="layout-sidebar sidebar">
            <div class="sidebar-header">
                <div style="font-weight: 900; font-size: 1.5rem; letter-spacing: -0.05em; color: var(--primary);">RAVN</div>
            </div>
            <div class="sidebar-content">
                <nav class="sidebar-nav">
                    <a href="javascript:void(0)" class="sidebar-item active" data-target-view="overview">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                        <span>Dashboard</span>
                    </a>
                    <a href="javascript:void(0)" class="sidebar-item" data-target-view="analytics">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                        <span>Analytics</span>
                    </a>
                    <a href="javascript:void(0)" class="sidebar-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        <span>Customers</span>
                    </a>
                </nav>
            </div>
            <div style="padding: var(--space-4); border-top: 1px solid var(--border);">
                <a href="javascript:void(0)" class="sidebar-item" onclick="RAVN.toggleSidebar()">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
                    <span>Collapse</span>
                </a>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="layout-main">
            <header class="layout-header" style="justify-content: space-between;">
                <div class="breadcrumbs">
                    <a href="#" class="breadcrumb-item">Project</a>
                    <span class="breadcrumb-item active">Overview</span>
                </div>
                <div class="flex items-center gap-4">
                    <button class="btn btn-ghost btn-sm">Docs</button>
                    <div class="avatar" style="width: 32px; height: 32px;">JD</div>
                </div>
            </header>
            
            <div class="layout-content" id="main-content">
                <!-- View: Overview -->
                <div data-view="overview" style="display: block;">
                    <div class="metrics-grid">
                        <div class="card" style="padding: var(--space-4);">
                            <div class="text-sm text-muted mb-1">REVENUE</div>
                            <div style="font-size: 1.75rem; font-weight: 800;">$45,231.89</div>
                            <div class="trend trend-up">↑ 12%</div>
                        </div>
                        <div class="card" style="padding: var(--space-4);">
                            <div class="text-sm text-muted mb-1">SUBSCRIPTIONS</div>
                            <div style="font-size: 1.75rem; font-weight: 800;">+2,350</div>
                            <div class="trend trend-up">↑ 180%</div>
                        </div>
                        <div class="card" style="padding: var(--space-4);">
                            <div class="text-sm text-muted mb-1">ACTIVE NOW</div>
                            <div style="font-size: 1.75rem; font-weight: 800;">573</div>
                            <div class="trend trend-down">↓ 4</div>
                        </div>
                    </div>

                    <div class="card mt-6">
                        <div class="card-header"><h3>Recent Transactions</h3></div>
                        <div class="table-container" style="border: none;">
                            <table class="table">
                                <thead>
                                    <tr><th>Customer</th><th>Status</th><th>Amount</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td>Alex Rivera</td><td><span class="badge badge-secondary">Paid</span></td><td>$240.00</td></tr>
                                    <tr><td>Sarah Chen</td><td><span class="badge">Pending</span></td><td>$1,200.00</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- View: Analytics -->
                <div data-view="analytics" style="display: none;">
                    <div class="card" style="padding: var(--space-12); text-align: center; border-style: dashed;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">📊</div>
                        <h3>Analytics Stream</h3>
                        <p class="text-muted">Configure your data sources to begin visualization.</p>
                        <button class="btn btn-primary mt-4">Connect Source</button>
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

        askInstallMethod(projectName, content, templateName);
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

    console.log(`\x1b[34mCreating modular ${templateName} in ${isCurrentDir ? 'current directory' : targetDir}...\x1b[0m`);
    
    if (!isCurrentDir) {
        fs.mkdirSync(targetDir);
    }

    // Create Modular Directories
    const jsDir = path.join(targetDir, 'js');
    const cssDir = path.join(targetDir, 'css');
    const cssCompDir = path.join(cssDir, 'components');
    const jsModDir = path.join(jsDir, 'modules');
    
    [jsDir, cssDir, cssCompDir, jsModDir].forEach(d => {
        if (!fs.existsSync(d)) fs.mkdirSync(d);
    });

    // Modular CSS
    const layoutCss = `/* Layout Core Styles */
.app-container { min-height: 100vh; display: flex; flex-direction: column; }`;
    const dashboardCss = `/* Dashboard Specific Styles */
.metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--space-6); }`;

    // Modular JS
    const dashboardJs = `// Dashboard Logic Module
export const initDashboard = () => {
    console.log('Dashboard Module Initialized');
};`;
    const appJs = `// Main Application Entry
import { initDashboard } from './modules/dashboard.js';

document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
});`;

    let finalContent = content;
    const uiCssPath = useLocal ? './node_modules/@ravn-ui/core/dist/ui.css' : 'https://unpkg.com/@ravn-ui/core/dist/ui.css';
    const themesCssPath = useLocal ? './node_modules/@ravn-ui/core/dist/themes.css' : 'https://unpkg.com/@ravn-ui/core/dist/themes.css';
    const uiJsPath = useLocal ? './node_modules/@ravn-ui/core/dist/ui.js' : 'https://unpkg.com/@ravn-ui/core/dist/ui.js';

    // Inject modular links into template
    finalContent = content
        .replace(/<link rel="stylesheet" href="https:\/\/unpkg\.com\/@ravn-ui\/core\/dist\/ui\.css">/g, 
            `<link rel="stylesheet" href="${uiCssPath}">\n    <link rel="stylesheet" href="${themesCssPath}">\n    <link rel="stylesheet" href="./css/layout.css">\n    <link rel="stylesheet" href="./css/components/dashboard.css">`)
        .replace(/<link rel="stylesheet" href="https:\/\/unpkg\.com\/@ravn-ui\/core\/dist\/themes\.css">/g, '')
        .replace(/<script src="https:\/\/unpkg\.com\/@ravn-ui\/core\/dist\/ui\.js"><\/script>/g, 
            `<script src="${uiJsPath}"></script>\n    <script type="module" src="./js/app.js"></script>`);
    
    fs.writeFileSync(path.join(targetDir, 'index.html'), finalContent);
    fs.writeFileSync(path.join(jsDir, 'app.js'), appJs);
    fs.writeFileSync(path.join(jsModDir, 'dashboard.js'), dashboardJs);
    fs.writeFileSync(path.join(cssDir, 'layout.css'), layoutCss);
    fs.writeFileSync(path.join(cssCompDir, 'dashboard.css'), dashboardCss);

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
    
    console.log('\n\x1b[32mSuccess! Your modular project is ready.\x1b[0m');
    console.log(`\x1b[1mModular Folder Structure:\x1b[0m`);
    console.log(`  ├── css/`);
    console.log(`  │   ├── layout.css`);
    console.log(`  │   └── components/dashboard.css`);
    console.log(`  ├── js/`);
    console.log(`  │   ├── app.js (Entry)`);
    console.log(`  │   └── modules/dashboard.js`);
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
