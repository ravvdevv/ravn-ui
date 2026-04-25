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

const STARTER_HTML = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RAVN Dashboard</title>
    <!-- Core Styles -->
    <link rel="stylesheet" href="https://unpkg.com/@ravn-ui/core/dist/ui.css">
    <link rel="stylesheet" href="https://unpkg.com/@ravn-ui/core/dist/themes.css">
    <style>
        body { background: var(--muted); }
    </style>
</head>
<body>
    <div class="layout-shell">
        <!-- Sidebar -->
        <aside class="layout-sidebar sidebar">
            <div class="sidebar-header">
                <div style="font-weight: 800; font-size: 1.25rem;">RAVN App</div>
            </div>
            <div class="sidebar-content">
                <nav class="sidebar-nav">
                    <a href="javascript:void(0)" class="sidebar-item active" data-target-view="overview">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                        <span>Overview</span>
                    </a>
                    <a href="javascript:void(0)" class="sidebar-item" data-target-view="analytics">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                        <span>Analytics</span>
                    </a>
                </nav>
            </div>
            <div style="padding: var(--space-4); border-top: 1px solid var(--border);">
                <button class="btn btn-ghost btn-sm w-full" onclick="RAVN.toggleSidebar()">
                    <span>Collapse Sidebar</span>
                </button>
            </div>
        </aside>

        <!-- Main -->
        <main class="layout-main">
            <header class="layout-header">
                <div class="breadcrumbs">
                    <span class="breadcrumb-item active">Dashboard</span>
                </div>
            </header>
            
            <div class="layout-content">
                <!-- Overview View -->
                <div data-view="overview" style="display: block;">
                    <div class="metrics-grid">
                        <div class="card" style="padding: var(--space-4);">
                            <div style="font-size: 0.75rem; color: var(--muted-foreground); text-transform: uppercase; font-weight: 600;">Total Revenue</div>
                            <div style="font-size: 1.75rem; font-weight: 800;">$45,231.89</div>
                            <div class="trend trend-up">↑ 20.1%</div>
                        </div>
                        <div class="card" style="padding: var(--space-4);">
                            <div style="font-size: 0.75rem; color: var(--muted-foreground); text-transform: uppercase; font-weight: 600;">Active Users</div>
                            <div style="font-size: 1.75rem; font-weight: 800;">+2,350</div>
                            <div class="trend trend-up">↑ 180%</div>
                        </div>
                    </div>
                </div>

                <!-- Analytics View -->
                <div data-view="analytics" style="display: none;">
                    <div class="card" style="padding: var(--space-12); text-align: center;">
                        <h3>Analytics View</h3>
                        <p class="text-muted">Real-time data visualization placeholder.</p>
                        <div class="skeleton" style="height: 200px; margin-top: 2rem;"></div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <!-- Core Logic -->
    <script src="https://unpkg.com/@ravn-ui/core/dist/ui.js"></script>
</body>
</html>`;

console.log(BANNER);

rl.question('\x1b[1mProject name:\x1b[0m ', (name) => {
    const targetDir = path.join(process.cwd(), name || 'ravn-app');
    
    if (fs.existsSync(targetDir)) {
        console.error(`\x1b[31mError: Directory ${name} already exists.\x1b[0m`);
        process.exit(1);
    }

    console.log(`\x1b[34mCreating project in ${targetDir}...\x1b[0m`);
    
    fs.mkdirSync(targetDir);
    fs.writeFileSync(path.join(targetDir, 'index.html'), STARTER_HTML);
    
    console.log('\n\x1b[32mSuccess! Your SaaS dashboard is ready.\x1b[0m');
    console.log(`\x1b[1mNext steps:\x1b[0m`);
    console.log(`  cd ${name || 'ravn-app'}`);
    console.log(`  Open index.html in your browser\n`);
    console.log(`\x1b[35mHappy building with RAVN UI!\x1b[0m\n`);
    
    process.exit(0);
});
