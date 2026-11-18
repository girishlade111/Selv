import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf-8');
const findings = [];

// Open Graph
if (!html.includes('property="og:title"')) findings.push({ category: 'SEO', issue: 'Missing og:title tag' });
if (!html.includes('property="og:description"')) findings.push({ category: 'SEO', issue: 'Missing og:description tag' });
if (!html.includes('property="og:image"')) findings.push({ category: 'SEO', issue: 'Missing og:image tag for social sharing cards' });
if (!html.includes('property="og:url"')) findings.push({ category: 'SEO', issue: 'Missing og:url canonical link' });
if (!html.includes('property="og:type"')) findings.push({ category: 'SEO', issue: 'Missing og:type metadata' });

// Twitter Cards
if (!html.includes('name="twitter:card"')) findings.push({ category: 'SEO', issue: 'Missing twitter:card tag' });
if (!html.includes('name="twitter:title"')) findings.push({ category: 'SEO', issue: 'Missing twitter:title tag' });
if (!html.includes('name="twitter:image"')) findings.push({ category: 'SEO', issue: 'Missing twitter:image tag' });

// Favicon check
if (html.includes('/vite.svg')) {
  findings.push({ category: 'Branding', issue: 'Favicon links to default vite.svg placeholder instead of custom brand logo' });
}

// Canonical
if (!html.includes('rel="canonical"')) {
  findings.push({ category: 'SEO', issue: 'Missing rel="canonical" tag to prevent duplicate content issues' });
}

// Manifest
if (!html.includes('manifest.json') && !html.includes('manifest.webmanifest')) {
  findings.push({ category: 'PWA/Mobile', issue: 'Missing web app manifest file for PWA and mobile bookmarking' });
}

console.log('=== SEO & META TAGS AUDIT ===');
console.log(`Found ${findings.length} findings:`);
console.table(findings);
