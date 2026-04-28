#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

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

console.log(BANNER);

const args = process.argv.slice(2);
const firstArg = args[0];

if (firstArg === 'add') {
    const feature = args[1];
    if (!feature) {
        console.error('\x1b[31mUsage: ravn add <feature>\x1b[0m');
        process.exit(1);
    }
    handleAddFeature(feature);
    return;
}

let mode = '--mpa';
if (args.includes('--spa')) mode = '--spa';
else if (args.includes('--hybrid')) mode = '--hybrid';

if (firstArg === '.' || (firstArg && !firstArg.startsWith('--'))) {
    askTemplate(firstArg === '.' ? '.' : firstArg, mode);
} else {
    rl.question('\x1b[1mProject name:\x1b[0m ', (name) => {
        askTemplate(name, mode);
    });
}

function handleAddFeature(feature) {
    const cwd = process.cwd();
    const componentsDir = path.join(cwd, 'components');
    const functionsDir = path.join(cwd, 'functions');

    if (!fs.existsSync(componentsDir)) fs.mkdirSync(componentsDir);
    if (!fs.existsSync(functionsDir)) fs.mkdirSync(functionsDir);

    if (feature === 'auth') {
        fs.writeFileSync(path.join(functionsDir, 'auth.js'), `export const auth = {\n    login: async (email, password) => {\n        // Integrate with RAVN.fetch here\n        return true;\n    },\n    logout: () => {}\n};\n`);
        fs.writeFileSync(path.join(componentsDir, 'auth-modal.js'), `export const AuthModal = () => \`\n<div class="card">\n    <div class="card-header"><h3>Login</h3></div>\n    <div class="card-content">\n        <div class="form-group">\n            <label class="label">Email</label>\n            <input type="email" class="input">\n        </div>\n        <button class="btn btn-primary w-full mt-4">Sign In</button>\n    </div>\n</div>\`;\n`);
        console.log('\x1b[32mAuth feature added successfully!\x1b[0m');
    } else if (feature === 'dashboard') {
        fs.writeFileSync(path.join(componentsDir, 'stat-card.js'), `export const StatCard = (title, value, trend) => \`\n<div class="card p-6">\n    <div class="text-sm text-muted">\${title}</div>\n    <div style="font-size: 1.75rem; font-weight: 800;">\${value}</div>\n    <div class="trend \${trend.startsWith('+') ? 'trend-up' : 'trend-down'}">\${trend}</div>\n</div>\`;\n`);
        console.log('\x1b[32mDashboard feature added successfully!\x1b[0m');
    } else if (feature === 'tables') {
        fs.writeFileSync(path.join(componentsDir, 'table.js'), `export const Table = (headers, rows) => \`\n<div class="table-container">\n    <table class="table">\n        <thead><tr>\${headers.map(h => \`<th>\${h}</th>\`).join('')}</tr></thead>\n        <tbody>\${rows.map(r => \`<tr>\${r.map(c => \`<td>\${c}</td>\`).join('')}</tr>\`).join('')}</tbody>\n    </table>\n</div>\`;\n`);
        console.log('\x1b[32mTables feature added successfully!\x1b[0m');
    } else {
        console.error(`\x1b[31mUnknown feature: ${feature}. Available: auth, dashboard, tables.\x1b[0m`);
    }
    process.exit(0);
}

function askTemplate(projectName, mode) {
    console.log('\n\x1b[1mChoose a starter template:\x1b[0m');
    console.log('  \x1b[36m1)\x1b[0m SaaS Dashboard (Best for apps)');
    console.log('  \x1b[36m2)\x1b[0m Landing Page (Best for marketing)');
    console.log('  \x1b[36m3)\x1b[0m Minimal Starter (Blank slate)');

    rl.question('\n\x1b[1mSelect (1-3):\x1b[0m ', (choice) => {
        let templateName = '';
        switch(choice) {
            case '2': templateName = 'Landing Page'; break;
            case '3': templateName = 'Minimal'; break;
            default: templateName = 'SaaS Dashboard'; break;
        }

        askTheme(projectName, templateName, mode);
    });
}

function askTheme(projectName, templateName, mode) {
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

        askInstallMethod(projectName, templateName, mode, theme);
    });
}

function askInstallMethod(projectName, templateName, mode, theme) {
    console.log('\n\x1b[1mInstall method:\x1b[0m');
    console.log('  \x1b[36m1)\x1b[0m CDN (Fastest, Online required)');
    console.log('  \x1b[36m2)\x1b[0m Local (Offline ready, uses node_modules)');

    rl.question('\n\x1b[1mSelect (1-2):\x1b[0m ', (method) => {
        const useLocal = method === '2';
        createProject(projectName, templateName, mode, theme, useLocal);
    });
}

function createProject(name, templateName, mode, theme, useLocal) {
    const isCurrentDir = name === '.';
    const targetDir = isCurrentDir ? process.cwd() : path.join(process.cwd(), name || 'ravn-app');
    
    if (!isCurrentDir && fs.existsSync(targetDir)) {
        console.error(`\x1b[31mError: Directory ${name} already exists.\x1b[0m`);
        process.exit(1);
    }

    console.log(`\x1b[34mCreating ${templateName} (${mode}) in ${isCurrentDir ? 'current directory' : targetDir}...\x1b[0m`);
    
    if (!isCurrentDir) {
        fs.mkdirSync(targetDir);
    }

    // Modern file structure
    const cssDir = path.join(targetDir, 'css');
    const componentsDir = path.join(targetDir, 'components');
    const functionsDir = path.join(targetDir, 'functions');

    if (!fs.existsSync(cssDir)) fs.mkdirSync(cssDir);
    if (!fs.existsSync(componentsDir)) fs.mkdirSync(componentsDir);
    if (!fs.existsSync(functionsDir)) fs.mkdirSync(functionsDir);

    // CSS
    fs.writeFileSync(path.join(cssDir, 'app.css'), `/* Custom App Styles */\nbody { background-color: var(--muted); }`);

    // Official Function Modules
    fs.writeFileSync(path.join(functionsDir, 'api.js'), `export const api = {\n    get: (url) => window.RAVN.fetch(url),\n    post: (url, data) => window.RAVN.fetch(url, { method: 'POST', body: JSON.stringify(data) })\n};`);
    fs.writeFileSync(path.join(functionsDir, 'auth.js'), `export const auth = {\n    login: async (user, pass) => { return true; },\n    logout: () => {}\n};`);
    fs.writeFileSync(path.join(functionsDir, 'store.js'), `export const store = {\n    set: (k, v) => window.RAVN.store.set(k, v),\n    get: (k) => window.RAVN.store.get(k),\n    subscribe: (fn) => window.RAVN.store.subscribe(fn)\n};`);
    fs.writeFileSync(path.join(functionsDir, 'storage.js'), `export const storage = {\n    save: (k, v) => localStorage.setItem(k, JSON.stringify(v)),\n    load: (k) => JSON.parse(localStorage.getItem(k))\n};`);
    fs.writeFileSync(path.join(functionsDir, 'forms.js'), `export const forms = {\n    validate: (formEl) => formEl.checkValidity()\n};`);

    // Components
    fs.writeFileSync(path.join(componentsDir, 'card.js'), `export function Card(content) {\n    return \`<div class="card p-6">\${content}</div>\`;\n}`);
    fs.writeFileSync(path.join(componentsDir, 'modal.js'), `export function Modal(title, content) {\n    return \`<div class="modal-content card"><div class="modal-header"><h3>\${title}</h3></div><div class="modal-body p-6">\${content}</div></div>\`;\n}`);
    fs.writeFileSync(path.join(componentsDir, 'toast.js'), `export function Toast(message) {\n    return \`<div class="toast alert alert-info">\${message}</div>\`;\n}`);

    // App Logic (Render Pattern)
    const appJs = `import { Card } from './components/card.js';
import { store } from './functions/store.js';

document.addEventListener('DOMContentLoaded', () => {
    store.set('appState', { initialized: true });

    function render() {
        const app = document.getElementById('app-root');
        if (app) {
            app.innerHTML = Card('<h3>Welcome to RAVN UI</h3><p class="text-muted">Your SaaS is ready to build.</p>');
        }
    }
    
    // Initial Render
    render();

    // Event Delegation (No inline onclick)
    window.RAVN.on('click', '[data-action="demo"]', (e, el) => {
        window.RAVN.toast('Demo action triggered!', { type: 'success' });
    });
});`;
    fs.writeFileSync(path.join(targetDir, 'app.js'), appJs);

    // index.html
    const uiCssPath = useLocal ? './node_modules/@ravn-ui/core/dist/ui.css' : 'https://unpkg.com/@ravn-ui/core/dist/ui.css';
    const themesCssPath = useLocal ? './node_modules/@ravn-ui/core/dist/themes.css' : 'https://unpkg.com/@ravn-ui/core/dist/themes.css';
    const uiJsPath = useLocal ? './node_modules/@ravn-ui/core/dist/ui.js' : 'https://unpkg.com/@ravn-ui/core/dist/ui.js';

    const indexHtml = `<!DOCTYPE html>
<html lang="en" data-theme="${theme}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name || 'RAVN App'}</title>
    <link rel="stylesheet" href="${uiCssPath}">
    <link rel="stylesheet" href="${themesCssPath}">
    <link rel="stylesheet" href="./css/app.css">
</head>
<body style="padding: var(--space-8);">
    <div id="app-root" style="max-width: 800px; margin: 0 auto;"></div>
    
    <div style="max-width: 800px; margin: 2rem auto; text-align: center;">
        <button class="btn btn-primary" data-action="demo">Test Event Delegation</button>
    </div>

    <script src="${uiJsPath}"></script>
    <script type="module" src="./app.js"></script>
</body>
</html>`;

    fs.writeFileSync(path.join(targetDir, 'index.html'), indexHtml);

    if (useLocal) {
        const pkg = {
            name: name === '.' ? path.basename(process.cwd()) : name,
            version: '0.1.0',
            private: true,
            scripts: { "dev": "npx serve ." }
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
    console.log(`  ├── components/`);
    console.log(`  │   ├── card.js`);
    console.log(`  │   ├── modal.js`);
    console.log(`  │   └── toast.js`);
    console.log(`  ├── functions/`);
    console.log(`  │   ├── api.js`);
    console.log(`  │   ├── auth.js`);
    console.log(`  │   ├── forms.js`);
    console.log(`  │   ├── storage.js`);
    console.log(`  │   └── store.js`);
    console.log(`  ├── css/app.css`);
    console.log(`  ├── app.js (Entry Point)`);
    console.log(`  └── index.html`);
    
    console.log(`\n\x1b[1mNext steps:\x1b[0m`);
    if (!isCurrentDir) console.log(`  cd ${name || 'ravn-app'}`);
    if (useLocal) console.log(`  bun dev`);
    else console.log(`  Open index.html in your browser\n`);
    console.log(`\x1b[35mHappy building with RAVN UI!\x1b[0m\n`);
    
    process.exit(0);
}
