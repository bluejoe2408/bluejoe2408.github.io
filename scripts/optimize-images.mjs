// 用法: node scripts/optimize-images.mjs <dir>  —— 就地把最长边降到 1600 并去 EXIF
import sharp from 'sharp';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

const dir = process.argv[2];
if (!dir) { console.error('usage: node scripts/optimize-images.mjs <dir>'); process.exit(1); }

const exts = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const entries = await readdir(dir, { recursive: true });
for (const rel of entries) {
  if (!exts.has(path.extname(rel).toLowerCase())) continue;
  const p = path.join(dir, rel);
  const buf = await sharp(p).rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).toBuffer();
  await sharp(buf).toFile(p);
  console.log('optimized', p);
}
