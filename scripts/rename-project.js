import fs from 'fs';
import path from 'path';

const roots = ['./src', './public', './scripts', '.', './cms-admin'];
const patterns = [
    { from: /femsol\.org/g, to: 'isyandayiz.org' },
    { from: /femsol/g, to: 'isyandayiz' },
    { from: /Femsol/g, to: 'Isyandayiz' },
    { from: /FEMSOL/g, to: 'ISYANDAYIZ' }
];

function processFile(filePath) {
    if (filePath.includes('node_modules') || filePath.includes('.git') || filePath.endsWith('.png') || filePath.endsWith('.jpg') || filePath.endsWith('.bat')) {
        return;
    }

    // Skip the script itself
    if (filePath.endsWith('rename-project.js')) return;

    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let changed = false;

        patterns.forEach(p => {
            if (p.from.test(content)) {
                content = content.replace(p.from, p.to);
                changed = true;
            }
        });

        if (changed) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated: ${filePath}`);
        }
    } catch (e) {
        // Skip binary files
    }
}

function walk(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                walk(fullPath);
            }
        } else {
            processFile(fullPath);
        }
    });
}

roots.forEach(root => {
    if (fs.existsSync(root)) {
        if (fs.statSync(root).isDirectory()) {
            walk(root);
        } else {
            processFile(root);
        }
    }
});

console.log('Replacement complete.');
