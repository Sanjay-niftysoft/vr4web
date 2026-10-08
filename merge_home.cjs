const fs = require('fs');
const path = require('path');

const baseDir = path.join('c:', 'Users', 'welcome', 'Desktop', 'vr4web', 'src', 'shared', 'components');
const sectionsDir = path.join(baseDir, 'home-sections');

const components = [
    'AboutUs.jsx',
    'OurServices.jsx',
    'WhyChooseUs.jsx',
    'IndustriesWeServe.jsx',
    'OurWorkProcess.jsx',
    'ProjectsCaseStudies.jsx',
    'FAQSection.jsx',
    'CallToAction.jsx'
];

let allImports = new Set();
let allCode = [];

for (const comp of components) {
    const filePath = path.join(sectionsDir, comp);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf-8');
        
        // Reduce padding: replace py-20 md:py-28 with py-12 md:py-16
        content = content.replace(/py-20 md:py-28/g, 'py-12 md:py-16');
        content = content.replace(/py-12 md:py-16/g, 'py-10 md:py-14'); // If CompanyHighlights existed
        
        const lines = content.split('\n');
        const codeLines = [];
        
        for (const line of lines) {
            if (line.startsWith('import ')) {
                allImports.add(line);
            } else if (line.startsWith('export default function')) {
                codeLines.push(line.replace('export default function', 'function'));
            } else {
                codeLines.push(line);
            }
        }
        allCode.push(codeLines.join('\n').trim());
    }
}

let homeContent = fs.readFileSync(path.join(baseDir, 'Home.jsx'), 'utf-8');

// Remove existing local component imports from home
homeContent = homeContent.replace(/import [A-Za-z]+ from '\.\/home-sections\/[A-Za-z]+';\n?/g, '');

const homeLines = homeContent.split('\n');
for (const line of homeLines) {
    if (line.startsWith('import ')) {
        allImports.add(line);
    }
}

homeContent = homeContent.replace(/import .*\n?/g, '').trimStart();

let lucideIcons = new Set();

for (const imp of allImports) {
    if (imp.includes('lucide-react')) {
        const match = imp.match(/import \{(.*?)\} from 'lucide-react'/);
        if (match) {
            match[1].split(',').forEach(icon => lucideIcons.add(icon.trim()));
        }
    }
}

const finalImports = `import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ${Array.from(lucideIcons).sort().join(', ')} } from 'lucide-react';`;

const finalContent = finalImports + '\n\n' + allCode.join('\n\n') + '\n\n' + homeContent;

fs.writeFileSync(path.join(baseDir, 'Home.jsx'), finalContent, 'utf-8');
console.log('Successfully merged all components and reduced padding.');
