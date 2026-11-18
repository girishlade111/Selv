import fs from 'fs';

const findings = [];
const css = fs.readFileSync('src/index.css', 'utf-8');
const html = fs.readFileSync('index.html', 'utf-8');
const connectTsx = fs.readFileSync('src/components/ConnectCard.tsx', 'utf-8');
const portfolioData = fs.readFileSync('src/data/portfolioData.ts', 'utf-8');

// 1. Print stylesheet
if (!css.includes('@media print')) {
  findings.push({
    category: 'CSS & Print',
    type: 'PRINT_STYLES_MISSING',
    desc: 'Missing @media print stylesheet; dark background and fixed navigation will ruin printed/PDF output.'
  });
}

// 2. Forced Colors Mode (Windows High Contrast)
if (!css.includes('forced-colors')) {
  findings.push({
    category: 'Accessibility',
    type: 'HIGH_CONTRAST_MODE',
    desc: 'Missing @media (forced-colors: active) rules; translucent glass panels lose contrast in Windows High Contrast.'
  });
}

// 3. Security Headers / CSP in index.html
if (!html.includes('http-equiv="Content-Security-Policy"') && !html.includes('X-Content-Type-Options')) {
  findings.push({
    category: 'Security',
    type: 'SECURITY_HEADERS_MISSING',
    desc: 'Missing client-side security headers (CSP meta tag, X-Content-Type-Options, Referrer-Policy: strict-origin-when-cross-origin).'
  });
}

// 4. Data Logic Bug in ConnectCard
if (connectTsx.includes('social.github ? PORTFOLIO_DATA.profile.brandSite : \'#\'')) {
  findings.push({
    category: 'Bug & Data Integrity',
    type: 'CONNECT_CARD_LINK_BUG',
    desc: 'ConnectCard Website link conditionally checks social.github instead of social.brandSite or profile.brandSite.'
  });
}

// 5. Unused Social Profiles in Data
if (portfolioData.includes('instagram:') || portfolioData.includes('codepen:')) {
  if (!connectTsx.includes('instagram') && !connectTsx.includes('codepen')) {
    findings.push({
      category: 'Data & UI Inconsistency',
      type: 'UNUSED_SOCIAL_PROFILES',
      desc: 'Instagram and CodePen URLs are defined in portfolioData.ts but are not rendered or exposed in ConnectCard or SiteFooter.'
    });
  }
}

// 6. Offline / Service Worker Support
if (!fs.existsSync('public/sw.js') && !fs.existsSync('src/sw.ts') && !html.includes('serviceWorker')) {
  findings.push({
    category: 'PWA & Resilience',
    type: 'OFFLINE_CACHE_MISSING',
    desc: 'Missing Service Worker or offline cache strategy; application fails to load without an active internet connection.'
  });
}

console.log('=== SECOND ROUND AUDIT: SECURITY, PRINT, CONTRAST, DATA ===');
console.log(`Total findings: ${findings.length}`);
console.table(findings);
