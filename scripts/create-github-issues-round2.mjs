import { execSync } from 'child_process';
import fs from 'fs';

const round2Issues = [
  {
    title: 'a11y: Increase mobile touch targets to meet 44x44px minimum sizing guidelines',
    labels: ['accessibility', 'ui/ux'],
    body: `### Description
Under WCAG 2.5.8 (Target Size - Minimum) and mobile interface guidelines (Apple HIG and Android Material), interactive touch targets should span at least 44x44px or 48x48px to prevent missed taps and accidental activations.

### Location
- \`src/components/FloatingNav.tsx\` (mobile buttons: \`w-9 h-9\`, 36px)
- \`src/components/BackButton.tsx\` (\`w-9 h-9\`, 36px)
- \`src/pages/HomePage.tsx\` ("About Me" and "View Portfolio" buttons: \`px-6 py-2\`, ~32px height)

### Current Behavior
Interactive buttons on touchscreens measure 32px to 36px bounding boxes, making them difficult to tap accurately for users with tremors, large fingers, or mobility impairments.

### Expected Behavior
Buttons should enforce a minimum 44px tap target area (e.g. using \`min-w-[44px] min-h-[44px]\` or pseudo-element padding hits) without breaking visual proportion.

### Suggested Fix
1. Increase button padding or add a transparent touch target boundary.
2. In \`FloatingNav.tsx\` mobile bar, ensure each icon slot satisfies \`min-w-[44px] min-h-[44px]\`.`
  },
  {
    title: 'a11y: Add autocomplete attributes to contact and newsletter form inputs (WCAG 1.3.5)',
    labels: ['accessibility', 'ui/ux'],
    body: `### Description
Form inputs across the portfolio do not define \`autoComplete\` attributes. Under WCAG 2.1 Success Criterion 1.3.5 (Identify Input Purpose), inputs collecting personal data (name, email) must specify their standard autocomplete token.

### Location
- \`src/components/NewsletterCard.tsx\` (email input)
- \`src/pages/ContactPage.tsx\` (name and email inputs)

### Current Behavior
Inputs lack \`autoComplete="name"\` and \`autoComplete="email"\`. Password managers and browser autofill tools cannot auto-populate user details reliably.

### Expected Behavior
1. \`name\` field should have \`autoComplete="name"\`.
2. \`email\` fields should have \`autoComplete="email"\`.

### Suggested Fix
Update \`<input>\` elements with standard autocomplete attributes.`
  },
  {
    title: 'a11y: Add missing visible focus rings (focus-visible) to interactive Link cards and buttons',
    labels: ['accessibility', 'ui/ux'],
    body: `### Description
Multiple interactive \`<Link>\` and anchor components do not declare \`focus-visible\` outline rings. Keyboard navigation with the Tab key fails to show where focus currently rests.

### Location
- \`src/pages/HomePage.tsx\` (Featured Portfolio preview card link, Blog preview rows)
- \`src/pages/BlogPage.tsx\` (Article list items)
- \`src/pages/ProjectDetailPage.tsx\` (Back to projects link)
- \`src/pages/BlogPostPage.tsx\` (Back to notes link)

### Current Behavior
Tabbing onto these links applies no visible outline or border color change, violating WCAG 2.4.7 (Focus Visible).

### Expected Behavior
All interactive links should display a high-contrast focus indicator (e.g. \`focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none\`).

### Suggested Fix
Add \`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black\` across all \`<Link>\` elements.`
  },
  {
    title: 'a11y: Add Windows High Contrast Mode support (forced-colors: active) for translucent glass cards',
    labels: ['accessibility', 'ui/ux'],
    body: `### Description
The portfolio\'s visual design is built on semi-transparent dark glass surfaces (\`rgba(16, 16, 20, 0.78)\`) and \`backdrop-filter: blur\`. When Windows High Contrast Mode (\`forced-colors: active\`) is enabled, transparency and backdrop filters are disabled by the OS.

### Location
- \`src/index.css\`

### Current Behavior
Cards, borders, and buttons may become indistinguishable from the background canvas or suffer severe contrast drop when system high contrast colors are enforced.

### Expected Behavior
Provide explicit CSS rules under \`@media (forced-colors: active)\` ensuring that card borders use \`CanvasText\` / \`ButtonBorder\` and buttons use \`Highlight\` / \`HighlightText\`.

### Suggested Fix
Add to \`src/index.css\`:
\`\`\`css
@media (forced-colors: active) {
  .glass-panel,
  .glass-panel-interactive {
    border: 2px solid CanvasText;
    background: Canvas;
  }
  .btn-accent {
    background: Highlight;
    color: HighlightText;
    border: 2px solid ButtonBorder;
  }
}
\`\`\``
  },
  {
    title: 'ui/ux: Add @media print stylesheet to support clean document export and printing',
    labels: ['ui/ux', 'enhancement'],
    body: `### Description
The website has no print-specific stylesheet. Attempting to print the page or export as PDF via browser print (\`Ctrl+P\` / \`Cmd+P\`) produces an unreadable output dominated by the fixed dark background, gradient overlays, and floating navigation.

### Location
- \`src/index.css\`

### Current Behavior
Printed pages include the fixed background image, dark translucent cards, floating navigation rail, and newsletter forms, rendering the text illegible and wasting ink.

### Expected Behavior
A clean print layout should hide decorative elements (\`SiteBackground\`, \`FloatingNav\`, \`NewsletterCard\`), set text color to pure black on white background, and ensure cards break cleanly across pages.

### Suggested Fix
Add print utility styles to \`src/index.css\`:
\`\`\`css
@media print {
  body {
    background: white !important;
    color: black !important;
  }
  nav,
  [aria-hidden="true"],
  .btn-accent,
  footer {
    display: none !important;
  }
  .glass-panel {
    background: transparent !important;
    border: 1px solid #ccc !important;
    box-shadow: none !important;
    color: black !important;
  }
}
\`\`\``
  },
  {
    title: 'security: Add client-side security headers, Referrer-Policy and CSP meta tags in index.html',
    labels: ['security', 'code-quality'],
    body: `### Description
\`index.html\` does not configure standard client-side security headers. External links clicked by users may leak full referrers to external sites, and scripts/styles lack a declared Content Security Policy.

### Location
- \`index.html\`

### Current Behavior
No \`Referrer-Policy\` or \`X-Content-Type-Options\` meta directives exist in the HTML document head.

### Expected Behavior
Add security-hardening meta tags:
1. \`<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin" />\`
2. \`<meta http-equiv="X-Content-Type-Options" content="nosniff" />\`
3. Restrictive CSP rules for script, font, and image origins.

### Suggested Fix
Add security directives inside \`<head>\` in \`index.html\`.`
  },
  {
    title: 'bug: ConnectCard website link erroneously conditions on social.github instead of profile.brandSite',
    labels: ['bug', 'ui/ux'],
    body: `### Description
In \`src/components/ConnectCard.tsx\`, the "Website" link definition uses:
\`\`\`tsx
{ name: 'Website', href: social.github ? PORTFOLIO_DATA.profile.brandSite : '#', icon: Globe }
\`\`\`

### Location
- \`src/components/ConnectCard.tsx\` (line 12)

### Current Behavior
The link to the official website (\`https://ladestack.in\`) is artificially gated on whether \`social.github\` is populated, rather than checking \`PORTFOLIO_DATA.profile.brandSite\`.

### Expected Behavior
The link href should resolve directly to \`PORTFOLIO_DATA.profile.brandSite || '#'\`.

### Suggested Fix
Update the link item in \`ConnectCard.tsx\` to:
\`\`\`tsx
{ name: 'Website', href: PORTFOLIO_DATA.profile.brandSite || '#', icon: Globe }
\`\`\``
  },
  {
    title: 'ui/ux: Expose verified Instagram and CodePen social links defined in portfolio data',
    labels: ['ui/ux', 'documentation'],
    body: `### Description
In \`src/data/portfolioData.ts\`, the \`social\` object contains:
- \`instagram: 'https://www.instagram.com/girish_lade_/'\`
- \`codepen: 'https://codepen.io/Girish-Lade-the-looper'\`

However, neither \`ConnectCard.tsx\` nor \`SiteFooter.tsx\` displays or links to these platforms.

### Location
- \`src/data/portfolioData.ts\`
- \`src/components/ConnectCard.tsx\`
- \`src/components/SiteFooter.tsx\`

### Current Behavior
Users and recruiters looking for frontend experiments on CodePen or social profiles have no way to find them from the website.

### Expected Behavior
Include CodePen and Instagram links in \`ConnectCard.tsx\` or provide a toggle/modal to view all public developer profiles.

### Suggested Fix
Add CodePen and Instagram icons/links to \`ConnectCard.tsx\` alongside GitHub and LinkedIn.`
  },
  {
    title: 'performance: Implement offline caching strategy and Service Worker for PWA resilience',
    labels: ['performance', 'enhancement'],
    body: `### Description
LadeStack and Girish Lade\'s products strongly champion a "browser-first, local-first" software philosophy. However, the portfolio itself currently lacks a Service Worker or offline cache strategy.

### Location
- \`public/sw.js\` (or \`vite-plugin-pwa\`)
- \`vite.config.ts\`

### Current Behavior
If a visitor loses internet connectivity after loading the site or tries to open it in airplane mode, the application fails with a standard browser offline error.

### Expected Behavior
A Service Worker should cache core assets (HTML, compiled CSS, JS chunks, and WebP images) with a stale-while-revalidate strategy, allowing full offline browsing.

### Suggested Fix
Integrate \`vite-plugin-pwa\` or register a lightweight Service Worker for offline asset caching.`
  },
  {
    title: 'code-quality: Remove unused springConfig exports and dead code in motion.ts',
    labels: ['code-quality', 'enhancement'],
    body: `### Description
In \`src/styles/motion.ts\`, \`springConfig\` exports multiple presets:
\`\`\`ts
export const springConfig = {
  tactile: { type: 'spring', stiffness: 400, damping: 28 },
  gentle: { type: 'spring', stiffness: 260, damping: 24 },
  bouncy: { type: 'spring', stiffness: 500, damping: 22 },
};
\`\`\`
Neither \`gentle\` nor \`bouncy\` is imported or utilized across any component in the project.

### Location
- \`src/styles/motion.ts\`

### Current Behavior
Unused configuration objects remain in the source code without documentation or active consumers.

### Expected Behavior
Remove unused configuration presets or integrate them consistently across interactive components.

### Suggested Fix
Clean up unused presets or apply them to card hover and route transitions.`
  }
];

async function createRound2Issues() {
  console.log(`=== CREATING ROUND 2 (${round2Issues.length}) GITHUB ISSUES ===\n`);
  let createdCount = 0;

  for (let i = 0; i < round2Issues.length; i++) {
    const item = round2Issues[i];
    console.log(`[${i + 1}/${round2Issues.length}] Creating: ${item.title}`);

    const labelFlags = item.labels.map(l => `--label "${l}"`).join(' ');
    const tempFile = `.gh-issue-round2-temp-${i}.md`;
    fs.writeFileSync(tempFile, item.body, 'utf-8');

    try {
      const cmd = `gh issue create --title "${item.title.replace(/"/g, '\\"')}" --body-file "${tempFile}" ${labelFlags}`;
      const output = execSync(cmd, { encoding: 'utf-8' });
      console.log(`    Created: ${output.trim()}`);
      createdCount++;
    } catch (err) {
      console.error(`    Error creating issue: ${err.message}`);
    } finally {
      if (fs.existsSync(tempFile)) {
        fs.unlinkSync(tempFile);
      }
    }
  }

  console.log(`\n=== ROUND 2 COMPLETED: ${createdCount}/${round2Issues.length} ISSUES CREATED ===`);
}

createRound2Issues().catch(console.error);
