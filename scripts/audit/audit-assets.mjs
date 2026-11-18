import fs from 'fs';
import path from 'path';

const imagesDir = path.resolve('public/images');
const files = fs.readdirSync(imagesDir);

console.log('=== ASSET SIZE AUDIT ===');
let totalBytes = 0;
const heavyAssets = [];

for (const file of files) {
  const filePath = path.join(imagesDir, file);
  const stats = fs.statSync(filePath);
  totalBytes += stats.size;
  const sizeKb = (stats.size / 1024).toFixed(1);
  const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);

  if (stats.size > 500 * 1024) {
    heavyAssets.push({ file, sizeKb, sizeMb });
    console.log(`[ALERT: HEAVY] ${file}: ${sizeMb} MB (${sizeKb} KB)`);
  } else {
    console.log(`[OK] ${file}: ${sizeKb} KB`);
  }
}

console.log(`Total public/images weight: ${(totalBytes / (1024 * 1024)).toFixed(2)} MB`);
console.log(`Heavy assets count (>500KB): ${heavyAssets.length}`);
