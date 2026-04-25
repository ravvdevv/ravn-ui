import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const TEMPLATE_PATH = join(process.cwd(), 'docs', 'template.html');
const COMPONENTS_DIR = join(process.cwd(), 'docs', 'components');
const OUTPUT_PATH = join(process.cwd(), 'index.html');

function build() {
    console.log('🚀 Building modular documentation...');
    
    let template = readFileSync(TEMPLATE_PATH, 'utf-8');
    
    // Get all component files and sort them to maintain order if needed
    // or we can use a specific order array
    const componentOrder = [
        'hero.html',
        'install.html',
        'theming.html',
        'buttons.html',
        'inputs.html',
        'cards.html',
        'tables.html',
        'avatars.html',
        'toggles.html',
        'accordions.html',
        'skeletons.html',
        'forms.html',
        'alerts.html',
        'modals.html',
        'dropdowns.html',
        'progress.html',
        'tooltips.html',
        'sidebar.html'
    ];

    let componentsHtml = '';
    
    for (const file of componentOrder) {
        const filePath = join(COMPONENTS_DIR, file);
        try {
            const content = readFileSync(filePath, 'utf-8');
            componentsHtml += `\n        <!-- Section: ${file} -->\n        ${content}\n`;
        } catch (e) {
            console.warn(`⚠️ Warning: Missing component file ${file}`);
        }
    }

    const finalHtml = template.replace('{{COMPONENTS}}', componentsHtml);
    
    writeFileSync(OUTPUT_PATH, finalHtml);
    console.log('✅ Documentation assembled successfully!');
}

build();
