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
    <title>RAVN Dashboard</title>
    <link rel="stylesheet" href="https://unpkg.com/@ravn-ui/core/dist/ui.css">
    <link rel="stylesheet" href="https://unpkg.com/@ravn-ui/core/dist/themes.css">
</head>
<body>
    <div class="layout-shell">
        <aside class="layout-sidebar sidebar">
            <div class="sidebar-header"><div style="font-weight: 800; font-size: 1.25rem;">RAVN App</div></div>
            <div class="sidebar-content">
                <nav class="sidebar-nav">
                    <a href="#" class="sidebar-item active">Overview</a>
                    <a href="#" class="sidebar-item">Analytics</a>
                </nav>
            </div>
            <div style="padding: var(--space-4); border-top: 1px solid var(--border);">
                <button class="btn btn-ghost btn-sm w-full" onclick="RAVN.toggleSidebar()">Toggle Sidebar</button>
            </div>
        </aside>
        <main class="layout-main">
            <header class="layout-header"><div class="breadcrumbs"><span class="breadcrumb-item active">Overview</span></div></header>
            <div class="layout-content">
                <div class="metrics-grid">
                    <div class="card" style="padding: var(--space-4);">
                        <div style="font-size: 0.75rem; color: var(--muted-foreground); text-transform: uppercase;">Revenue</div>
                        <div style="font-size: 1.75rem; font-weight: 800;">$45,231.89</div>
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
    <title>Welcome to RAVN</title>
    <link rel="stylesheet" href="https://unpkg.com/@ravn-ui/core/dist/ui.css">
    <link rel="stylesheet" href="https://unpkg.com/@ravn-ui/core/dist/themes.css">
</head>
<body>
    <main style="max-width: 800px; margin: 100px auto; padding: 0 20px; text-align: center;">
        <h1 style="font-size: 4rem; font-weight: 900; letter-spacing: -0.05em; margin-bottom: 20px;">Built for builders.</h1>
        <p style="font-size: 1.25rem; color: var(--muted-foreground); margin-bottom: 40px;">The minimal UI system for elite SaaS products.</p>
        <div class="flex items-center justify-center gap-4">
            <button class="btn btn-primary btn-lg">Get Started</button>
            <button class="btn btn-outline btn-lg">Documentation</button>
        </div>
    </main>
    <script src="https://unpkg.com/@ravn-ui/core/dist/ui.js"></script>
</body>
</html>`;

const MINIMAL_HTML = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <link rel="stylesheet" href="https://unpkg.com/@ravn-ui/core/dist/ui.css">
    <link rel="stylesheet" href="https://unpkg.com/@ravn-ui/core/dist/themes.css">
</head>
<body>
    <button class="btn btn-primary">Hello RAVN</button>
    <script src="https://unpkg.com/@ravn-ui/core/dist/ui.js"></script>
</body>
</html>`;

console.log(BANNER);

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

        createProject(projectName, content, templateName);
    });
}

function createProject(name, content, templateName) {
    const targetDir = path.join(process.cwd(), name || 'ravn-app');
    
    if (fs.existsSync(targetDir)) {
        console.error(`\x1b[31mError: Directory ${name} already exists.\x1b[0m`);
        process.exit(1);
    }

    console.log(`\x1b[34mCreating ${templateName} in ${targetDir}...\x1b[0m`);
    
    fs.mkdirSync(targetDir);
    fs.writeFileSync(path.join(targetDir, 'index.html'), content);
    
    console.log('\n\x1b[32mSuccess! Your project is ready.\x1b[0m');
    console.log(`\x1b[1mNext steps:\x1b[0m`);
    console.log(`  cd ${name || 'ravn-app'}`);
    console.log(`  Open index.html in your browser\n`);
    console.log(`\x1b[35mHappy building with RAVN UI!\x1b[0m\n`);
    
    process.exit(0);
}

rl.question('\x1b[1mProject name:\x1b[0m ', (name) => {
    askTemplate(name);
});
