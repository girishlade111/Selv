import { execSync } from 'child_process';

const issues = [
  // --- ACCESSIBILITY ---
  {
    title: 'a11y: Add "Skip to main content" bypass link for keyboard accessibility',
    labels: ['accessibility', 'ui/ux'],
    body: `### Description
Under WCAG 2.4.1 (Bypass Blocks), keyboard and screen-reader users must be provided a mechanism to bypass repeated navigation components and jump directly to the primary content area.

### Location
- \`src/components/PageShell.tsx\`
- \`index.html\`

### Current Behavior
There is no hidden-until-focused anchor link at the top of the DOM. Keyboard users navigating with Tab must traverse the entire floating navigation rail before accessing page cards.

### Expected Behavior
A focusable anchor link (\`<a href="#main-content" className="sr-only focus:not-sr-only ...">Skip to content</a>\`) should be placed at the very top of \`PageShell\`, and \`<motion.main>\` should include \`id="main-content" tabIndex={-1}\`.

### Suggested Fix
1. Add visually hidden skip link at top of \`PageShell.tsx\`.
2. Add \`id="main-content"\` to the \`<motion.main>\` container.
3. Style the link so it appears prominently upon \`:focus\`.`
  },
  {
    title: 'a11y: Floating navigation links missing aria-current="page" attribute',
    labels: ['accessibility', 'bug'],
    body: `### Description
The floating navigation rail (desktop) and bottom navigation bar (mobile) indicate the active route visually with Motion indicators, but do not convey this state semantically to screen readers.

### Location
- \`src/components/FloatingNav.tsx\`

### Current Behavior
Active links in \`FloatingNav.tsx\` only receive visual styling via \`active ? 'text-black' : 'text-white/60'\` and the animated background pill, without setting \`aria-current="page"\`.

### Expected Behavior
Assistive technologies like NVDA, VoiceOver, and JAWS should announce "current page" when the user navigates over the active link.

### Suggested Fix
Update \`NavLink\` in \`FloatingNav.tsx\` to include:
\`\`\`tsx
aria-current={active ? 'page' : undefined}
\`\`\``
  },
  {
    title: 'a11y: Accordion trigger buttons missing aria-controls linkage to collapsible panels',
    labels: ['accessibility'],
    body: `### Description
Accordion trigger buttons on the Home page (Capabilities) and About page (Journey & Practice) utilize \`aria-expanded\`, but do not link to the controlled panel via \`aria-controls\`.

### Location
- \`src/pages/HomePage.tsx\` (Capabilities Section)
- \`src/pages/AboutPage.tsx\` (Journey & Practice Section)

### Current Behavior
Screen readers announce whether the item is expanded or collapsed, but cannot determine which DOM node is controlled or where focus moves next.

### Expected Behavior
Each button should contain \`aria-controls={panelId}\`, and the collapsible panel container should possess a matching \`id={panelId}\` and \`role="region"\`.

### Suggested Fix
1. Assign unique IDs to accordion panels (e.g. \`id={\`capability-panel-\${idx}\`}\`).
2. Add \`aria-controls={\`capability-panel-\${idx}\`}\` to the trigger button.
3. Add \`role="region"\` and \`aria-labelledby\` to the expanded content panel.`
  },
  {
    title: 'a11y: Form status alerts lack role="alert" and aria-describedby associations',
    labels: ['accessibility', 'bug'],
    body: `### Description
Form feedback messages (error and success states) in the Newsletter and Contact cards are rendered visually with motion, but fail to notify assistive technology dynamically.

### Location
- \`src/components/NewsletterCard.tsx\`
- \`src/pages/ContactPage.tsx\`

### Current Behavior
When submission errors occur (e.g. "Please enter a valid email address"), screen readers are not alerted, leaving visually impaired users unsure why the form did not proceed.

### Expected Behavior
Error containers should use \`role="alert"\` or \`aria-live="polite"\`. Input elements should reference the error element via \`aria-describedby="error-message-id"\` and set \`aria-invalid={true}\` when an error is active.

### Suggested Fix
1. Add \`id="newsletter-error"\` and \`role="alert"\` to error messages.
2. Add \`aria-invalid={status === 'error'}\` and \`aria-describedby={status === 'error' ? 'newsletter-error' : undefined}\` to inputs.`
  },
  {
    title: 'a11y: Add prefers-reduced-motion support for vestibular motion safety',
    labels: ['accessibility', 'ui/ux'],
    body: `### Description
The application features extensive spring-based animations and route transitions using Motion. Under WCAG 2.3.3 (Animation from Interactions), users who have enabled "Reduce Motion" in their OS must not experience forced non-essential animations.

### Location
- \`src/styles/motion.ts\`
- \`src/index.css\`

### Current Behavior
All users receive identical transform and scale animations regardless of operating system motion preferences.

### Expected Behavior
Animations should gracefully downgrade to immediate opacity changes or static states when \`window.matchMedia('(prefers-reduced-motion: reduce)')\` is active.

### Suggested Fix
1. Integrate \`useReducedMotion\` from \`motion/react\`.
2. Add CSS media query \`@media (prefers-reduced-motion: reduce)\` in \`index.css\` to neutralize transitions.`
  },

  // --- BUGS & FUNCTIONAL ISSUES ---
  {
    title: 'bug: Contact form does not clear input fields upon successful submission',
    labels: ['bug', 'ui/ux'],
    body: `### Description
Submitting the Contact form displays a success confirmation ("Draft created!"), but the user's name, email, and message remain populated in the input fields.

### Location
- \`src/pages/ContactPage.tsx\`

### Current Behavior
\`setFormData\` is never reset to blank values during the success callback, creating an impression that the form state was not committed.

### Expected Behavior
Form fields should clear cleanly on successful submission so the user can submit another inquiry if needed.

### Suggested Fix
Inside the \`handleSubmit\` timeout handler in \`ContactPage.tsx\`, add:
\`\`\`ts
setFormData({ name: '', email: '', message: '' });
\`\`\``
  },
  {
    title: 'bug: Delayed window.location.href mailto dispatch blocked by mobile navigation policies',
    labels: ['bug', 'ui/ux'],
    body: `### Description
In \`ContactPage.tsx\`, the \`mailto:\` protocol navigation is dispatched asynchronously inside a \`setTimeout\` delay (900ms).

### Location
- \`src/pages/ContactPage.tsx\`

### Current Behavior
Modern mobile browsers (Safari on iOS, Chrome Mobile) and popup blockers disallow programmatic navigation when invoked outside of synchronous user gesture callbacks, causing the mail client trigger to fail silently.

### Expected Behavior
The mail client dispatch should either occur synchronously within the user click handler or offer a clear fallback button ("Open Mail App") in the success banner.

### Suggested Fix
Provide a direct "Open Email Client" button in the success state container rather than relying on delayed window redirection.`
  },
  {
    title: 'bug: Catch-all route silently renders HomePage instead of a dedicated 404 page',
    labels: ['bug', 'ui/ux'],
    body: `### Description
The router in \`src/App.tsx\` handles non-existent paths via \`<Route path="*" element={<HomePage />} />\`.

### Location
- \`src/App.tsx\`

### Current Behavior
Visiting an invalid URL (e.g. \`/random-page\`) renders the Homepage under the invalid URL with no indication that the requested resource is missing.

### Expected Behavior
An explicit \`NotFoundPage\` should be presented with a clear 404 heading, explanation, and a "Return to Home" button.

### Suggested Fix
1. Create \`src/pages/NotFoundPage.tsx\`.
2. Route \`path="*"\` to \`<NotFoundPage />\` in \`App.tsx\`.`
  },

  // --- UI/UX & CSS POLISH ---
  {
    title: 'ui/ux: Floating mobile navigation relies on undefined safe-bottom CSS utility',
    labels: ['ui/ux', 'bug'],
    body: `### Description
The mobile bottom navigation container in \`FloatingNav.tsx\` applies the CSS class \`safe-bottom\` to accommodate device bottom insets (e.g., iPhone home indicator). However, \`.safe-bottom\` is not defined in \`src/index.css\` or Tailwind.

### Location
- \`src/components/FloatingNav.tsx\`
- \`src/index.css\`

### Current Behavior
On iOS Safari and devices with bottom gesture bars, the floating navigation bar sits flush against the bottom edge, risking accidental app closure when tapping icons.

### Expected Behavior
The floating bar should incorporate \`env(safe-area-inset-bottom)\` padding and margin to stay clear of the home indicator bar.

### Suggested Fix
Add to \`src/index.css\`:
\`\`\`css
.safe-bottom {
  padding-bottom: max(0.5rem, env(safe-area-inset-bottom));
  margin-bottom: env(safe-area-inset-bottom);
}
\`\`\``
  },
  {
    title: 'ui/ux: Floating vertical navigation rail crowds layout on small-height viewports',
    labels: ['ui/ux', 'enhancement'],
    body: `### Description
On desktop screens with small vertical viewport height (e.g. landscape tablets or laptops under 700px height), the vertical nav rail positioned at \`top-1/2 -translate-y-1/2\` can visually crowd the central content column or get vertically clipped.

### Location
- \`src/components/FloatingNav.tsx\`

### Current Behavior
The nav rail is always centered vertically regardless of viewport height.

### Expected Behavior
Add a media query rule (\`@media (max-height: 650px)\`) to switch the navigation to the bottom or reposition it cleanly to avoid content encroachment.

### Suggested Fix
Add responsive media queries based on viewport height in \`FloatingNav.tsx\`.`
  },
  {
    title: 'ui/ux: Project detail view lacks prominent experimental warning badge for LadeStack Drive',
    labels: ['ui/ux', 'documentation'],
    body: `### Description
On \`ProjectsPage.tsx\`, projects with experimental status (like LadeStack Drive) display a badge. However, once a user opens \`ProjectDetailPage.tsx\` for \`ladestack-drive\`, this warning is not prominently visible before clicking "Visit Live Project".

### Location
- \`src/pages/ProjectDetailPage.tsx\`

### Current Behavior
Users clicking the external link may encounter unverified or in-progress functionality without upfront context on the detail page.

### Expected Behavior
Render an explicit disclaimer banner on \`ProjectDetailPage.tsx\` whenever \`project.status\` is present.

### Suggested Fix
Add a status notice box above the "Visit Live Project" action buttons in \`ProjectDetailPage.tsx\`.`
  },

  // --- PERFORMANCE & ASSETS ---
  {
    title: 'performance: Optimize uncompressed profile.png (1.56MB) and background.png (1.19MB)',
    labels: ['performance'],
    body: `### Description
The two primary raster images in \`public/images/\` account for 2.75 MB of network payload:
- \`profile.png\`: 1.56 MB
- \`background.png\`: 1.19 MB

### Location
- \`public/images/profile.png\`
- \`public/images/background.png\`
- \`src/components/SiteBackground.tsx\`
- \`src/pages/HomePage.tsx\`
- \`src/pages/AboutPage.tsx\`

### Current Behavior
On cellular networks and mobile devices, loading multi-megabyte PNG files delays Largest Contentful Paint (LCP) and consumes excessive user bandwidth.

### Expected Behavior
Images should be converted to modern formats (WebP/AVIF) and sized appropriately for display viewports, reducing total asset payload by over 80%.

### Suggested Fix
1. Compress \`profile.png\` to WebP (~60KB).
2. Compress \`background.png\` to optimized WebP (~120KB).
3. Update source paths in components.`
  },
  {
    title: 'performance: Render-blocking Google Fonts stylesheet in head without font-display: swap optimization',
    labels: ['performance', 'ui/ux'],
    body: `### Description
\`index.html\` links Google Fonts (\`Plus Jakarta Sans\` and \`Space Grotesk\`) synchronously in the document \`<head>\`.

### Location
- \`index.html\`

### Current Behavior
Initial render can be blocked by external font DNS resolution and CSS download, leading to Flash of Invisible Text (FOIT) on slower connections.

### Expected Behavior
Include \`&display=swap\` parameter in the Google Fonts URL or self-host fonts with modern \`font-face\` rules to guarantee non-blocking rendering.

### Suggested Fix
Ensure \`&display=swap\` is appended to the Google Fonts link and add \`rel="preload"\` for critical font subsets.`
  },

  // --- SEO & METADATA ---
  {
    title: 'seo: Missing Open Graph and Twitter Card social preview metadata in index.html',
    labels: ['seo', 'enhancement'],
    body: `### Description
The HTML \`<head>\` in \`index.html\` contains only basic \`<title>\` and \`<meta name="description">\`. It lacks Open Graph and Twitter Card tags.

### Location
- \`index.html\`

### Current Behavior
Sharing links to the portfolio on LinkedIn, Twitter, Discord, WhatsApp, or Slack displays empty or broken preview cards without an image or branded title.

### Expected Behavior
Standard social preview meta tags should be included:
- \`og:title\`, \`og:description\`, \`og:image\`, \`og:url\`, \`og:type\`
- \`twitter:card\`, \`twitter:title\`, \`twitter:description\`, \`twitter:image\`

### Suggested Fix
Add OpenGraph and Twitter meta tags to \`index.html\`.`
  },
  {
    title: 'seo: Favicon uses default Vite placeholder logo instead of custom brand emblem',
    labels: ['seo', 'ui/ux'],
    body: `### Description
The portfolio currently references the default Vite logo for browser tabs:
\`<link rel="icon" type="image/svg+xml" href="/vite.svg" />\`

### Location
- \`index.html\`
- \`public/vite.svg\`

### Current Behavior
Browser tabs and bookmarks display the purple/yellow Vite development logo instead of Girish Lade's brand emblem or monogram.

### Expected Behavior
A custom SVG/PNG favicon representing Girish Lade / LadeStack should be linked.

### Suggested Fix
Replace \`public/vite.svg\` with a custom branded icon and update \`index.html\`.`
  },
  {
    title: 'seo: Missing canonical link tag and Web App Manifest (manifest.json)',
    labels: ['seo', 'enhancement'],
    body: `### Description
\`index.html\` lacks a canonical link tag (\`<link rel="canonical">\`) and does not link a Web App Manifest (\`manifest.json\`).

### Location
- \`index.html\`
- \`public/manifest.json\` (to be created)

### Current Behavior
Search engines may index duplicate URLs across custom domains, preview URLs, and GitHub Pages deployments. Mobile browsers cannot prompt users to add the web app to their home screen.

### Expected Behavior
Provide a canonical tag pointing to \`https://ladestack.in\` and a standard \`manifest.json\` defining app name, icons, and theme color.

### Suggested Fix
1. Add \`<link rel="canonical" href="https://ladestack.in" />\` in \`index.html\`.
2. Create \`public/manifest.json\` with theme and icon metadata.`
  },

  // --- DEPLOYMENT & CODE QUALITY ---
  {
    title: 'deployment: Add SPA rewrite rules for static hosting platforms (Vercel, Netlify, GitHub Pages)',
    labels: ['bug', 'code-quality'],
    body: `### Description
The portfolio is a client-side Single Page Application (SPA) using React Router with browser history (\`BrowserRouter\`).

### Location
- \`vercel.json\` (missing)
- \`public/_redirects\` (missing)
- \`public/404.html\` (missing)

### Current Behavior
Directly accessing or refreshing deep links such as \`/projects\`, \`/projects/gb-coder\`, or \`/blog\` on standard static web hosts returns a 404 HTTP response because the web server searches for a physical directory matching the path.

### Expected Behavior
All route requests should rewrite to \`/index.html\` so the client router can resolve the path.

### Suggested Fix
1. Add \`vercel.json\` with rewrites:
\`\`\`json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
\`\`\`
2. Add \`public/_redirects\` with \`/* /index.html 200\` for Netlify.
3. Add a copy script or fallback for GitHub Pages.`
  },
  {
    title: 'code-quality: Add automated testing suite and ESLint scripts to package.json',
    labels: ['code-quality', 'enhancement'],
    body: `### Description
The repository currently has only \`dev\`, \`build\`, and \`preview\` scripts in \`package.json\`. There is no test runner (Vitest) or linter (ESLint).

### Location
- \`package.json\`
- \`vite.config.ts\`

### Current Behavior
Code changes and PRs cannot be validated through automated CI/CD unit or smoke tests, increasing regression risks for routing, contact form validation, and accessibility components.

### Expected Behavior
A testing tool (Vitest + React Testing Library) and linter should be configured to ensure long-term code health.

### Suggested Fix
1. Install \`vitest\` and \`@testing-library/react\`.
2. Add \`"test": "vitest"\` and \`"lint": "tsc --noEmit"\` to \`package.json\`.`
  }
];

async function createIssues() {
  console.log(`=== CREATING ${issues.length} GITHUB ISSUES ===\n`);
  let createdCount = 0;

  for (let i = 0; i < issues.length; i++) {
    const item = issues[i];
    console.log(`[${i + 1}/${issues.length}] Creating: ${item.title}`);

    // Prepare labels flag
    const labelFlags = item.labels.map(l => `--label "${l}"`).join(' ');
    
    // Write body to temporary file to avoid shell escaping issues on Windows
    const tempFile = `.gh-issue-temp-${i}.md`;
    const fs = await import('fs');
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

  console.log(`\n=== COMPLETED: ${createdCount}/${issues.length} ISSUES CREATED ===`);
}

createIssues().catch(console.error);
