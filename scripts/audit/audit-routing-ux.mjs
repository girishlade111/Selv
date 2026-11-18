import fs from 'fs';

const appTsx = fs.readFileSync('src/App.tsx', 'utf-8');
const css = fs.readFileSync('src/index.css', 'utf-8');
const navTsx = fs.readFileSync('src/components/FloatingNav.tsx', 'utf-8');
const contactTsx = fs.readFileSync('src/pages/ContactPage.tsx', 'utf-8');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

const findings = [];

// 1. 404 Route handling
if (appTsx.includes('path="*" element={<HomePage />}')) {
  findings.push({
    category: 'Routing / UX',
    severity: 'Medium',
    issue: 'Catch-all route silently renders HomePage instead of an explicit 404 NotFound page.',
  });
}

// 2. SPA Rewrites configuration (vercel.json / _redirects / 404.html)
if (!fs.existsSync('vercel.json') && !fs.existsSync('public/_redirects') && !fs.existsSync('public/404.html')) {
  findings.push({
    category: 'Deployment / Hosting',
    severity: 'High',
    issue: 'Missing SPA redirect/rewrite rules (vercel.json or _redirects); deep links on static host will 404 on refresh.',
  });
}

// 3. Undefined CSS class 'safe-bottom'
if (navTsx.includes('safe-bottom') && !css.includes('.safe-bottom')) {
  findings.push({
    category: 'UI/UX & CSS',
    severity: 'Medium',
    issue: 'FloatingNav uses "safe-bottom" class for iOS safe areas, but the class is not defined in index.css.',
  });
}

// 4. Contact form state reset
if (!contactTsx.includes('setFormData({ name: \'\', email: \'\', message: \'\' })') && !contactTsx.includes('setFormData({name:\'\',email:\'\',message:\'\'})')) {
  findings.push({
    category: 'Bug / Functional',
    severity: 'Medium',
    issue: 'Contact form fields are not cleared upon successful submission.',
  });
}

// 5. Automated testing setup
if (!packageJson.scripts.test) {
  findings.push({
    category: 'Code Quality',
    severity: 'Low',
    issue: 'Missing test suite script (e.g. Vitest / React Testing Library) in package.json.',
  });
}

// 6. Linting setup
if (!packageJson.scripts.lint) {
  findings.push({
    category: 'Code Quality',
    severity: 'Low',
    issue: 'Missing linting script (e.g. ESLint / biome) in package.json.',
  });
}

console.log('=== ROUTING, UX & CODE QUALITY AUDIT ===');
console.log(`Found ${findings.length} findings:`);
console.table(findings);
