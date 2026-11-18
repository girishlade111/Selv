import fs from 'fs';

const files = [
  'src/components/FloatingNav.tsx',
  'src/components/BackButton.tsx',
  'src/components/NewsletterCard.tsx',
  'src/components/ConnectCard.tsx',
  'src/pages/HomePage.tsx',
  'src/pages/ProjectsPage.tsx',
  'src/pages/ProjectDetailPage.tsx',
  'src/pages/BlogPage.tsx',
  'src/pages/BlogPostPage.tsx',
  'src/pages/AboutPage.tsx',
  'src/pages/ContactPage.tsx'
];

const findings = [];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, 'utf-8');

  // Check 1: Links without focus-visible
  const linkMatches = content.match(/<Link\s+[^>]*className=["']([^"']*)["']/g) || [];
  for (const m of linkMatches) {
    if (!m.includes('focus-visible:ring') && !m.includes('focus-visible:outline')) {
      findings.push({
        file,
        type: 'A11Y_FOCUS_INDICATOR',
        desc: 'Interactive <Link> element lacks explicit focus-visible ring styles for keyboard navigation.'
      });
    }
  }

  // Check 2: Touch targets under 44px (w-9 h-9, w-8 h-8, w-10 h-10)
  const smallTargetMatches = content.match(/className=["'][^"']*\b(w-8|h-8|w-9|h-9)\b[^"']*["']/g) || [];
  for (const m of smallTargetMatches) {
    if (m.includes('button') || m.includes('NavLink') || m.includes('cursor-pointer') || file.includes('Nav') || file.includes('Back')) {
      findings.push({
        file,
        type: 'TOUCH_TARGET_SIZE',
        desc: `Control has small bounding dimension (${m.match(/\b(w-8|h-8|w-9|h-9)\b/)[0]}), falling below recommended 44x44px touch target guidelines.`
      });
    }
  }

  // Check 3: Form inputs missing autocomplete
  if (content.includes('<input') || content.includes('<textarea')) {
    const inputMatches = content.match(/<input\s+[^>]*>/g) || [];
    for (const input of inputMatches) {
      if (!input.includes('autoComplete=')) {
        findings.push({
          file,
          type: 'FORM_AUTOCOMPLETE',
          desc: 'Form input missing autoComplete attribute (violates WCAG 1.3.5 Identify Input Purpose).'
        });
      }
    }
  }
}

console.log('=== SECOND ROUND AUDIT: FOCUS, TARGETS, AUTOCOMPLETE ===');
console.log(`Total findings: ${findings.length}`);
console.table(findings.slice(0, 15));
