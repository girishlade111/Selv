import fs from 'fs';
import path from 'path';

const scanDirs = ['src/components', 'src/pages', 'src', 'index.html'];
const findings = [];

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Check 1: Skip to content
  if (filePath.endsWith('index.html') || filePath.endsWith('PageShell.tsx')) {
    if (!content.includes('skip-to-content') && !content.includes('Skip to content') && !content.includes('#main-content')) {
      findings.push({
        file: filePath,
        type: 'A11Y_SKIP_LINK',
        desc: 'Missing "Skip to main content" link for keyboard/screen-reader navigation.',
      });
    }
  }

  // Check 2: Accordion aria-controls
  if (content.includes('aria-expanded')) {
    if (!content.includes('aria-controls')) {
      findings.push({
        file: filePath,
        type: 'A11Y_ARIA_CONTROLS',
        desc: 'Element has aria-expanded but lacks aria-controls referencing the target container id.',
      });
    }
  }

  // Check 3: Nav active aria-current
  if (filePath.endsWith('FloatingNav.tsx')) {
    if (!content.includes('aria-current=')) {
      findings.push({
        file: filePath,
        type: 'A11Y_ARIA_CURRENT',
        desc: 'Active navigation link does not announce aria-current="page" to screen readers.',
      });
    }
  }

  // Check 4: Inputs without aria-describedby for errors
  if (content.includes('setStatus(\'error\')') || content.includes('status === \'error\'')) {
    if (!content.includes('aria-describedby') && !content.includes('role="alert"')) {
      findings.push({
        file: filePath,
        type: 'A11Y_FORM_ALERT',
        desc: 'Form displays error state but error message lacks role="alert" or aria-describedby link.',
      });
    }
  }

  // Check 5: prefers-reduced-motion
  if (filePath.endsWith('motion.ts') || filePath.endsWith('index.css')) {
    if (!content.includes('prefers-reduced-motion')) {
      findings.push({
        file: filePath,
        type: 'A11Y_REDUCED_MOTION',
        desc: 'Missing prefers-reduced-motion media query or Motion useReducedMotion support for vestibular safety.',
      });
    }
  }
}

function traverse(target) {
  if (fs.statSync(target).isDirectory()) {
    const files = fs.readdirSync(target);
    for (const f of files) {
      traverse(path.join(target, f));
    }
  } else if (target.endsWith('.tsx') || target.endsWith('.ts') || target.endsWith('.html') || target.endsWith('.css')) {
    checkFile(target);
  }
}

for (const d of scanDirs) {
  if (fs.existsSync(d)) traverse(d);
}

console.log('=== A11Y & SEMANTICS AUDIT ===');
console.log(`Found ${findings.length} findings:`);
console.table(findings);
