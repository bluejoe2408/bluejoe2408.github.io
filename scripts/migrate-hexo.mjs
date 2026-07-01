// 用法: node scripts/migrate-hexo.mjs <hexo_posts_dir>
// 只迁 ALLOW 列表里的文件；规范化 frontmatter；输出 src/content/tech/<slug>/index.md
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SRC = process.argv[2];
if (!SRC) { console.error('usage: node scripts/migrate-hexo.mjs <hexo_posts_dir>'); process.exit(1); }
const IMPORT_DATE = '2026-06-19';

// 首批：文件名(无 .md) -> { category, title? }
const ALLOW = {
  'rust_learning1': { cat: 'Rust' }, 'rust_learning2': { cat: 'Rust' },
  'rust_learning3': { cat: 'Rust' }, 'rust_learning4': { cat: 'Rust' },
  'linux_learning': { cat: 'Linux' },
  'cpp_STL_cheat_list': { cat: 'C++' }, 'vector': { cat: 'C++' }, 'type_size': { cat: 'C++' },
  'Creview': { cat: 'C' },
  'bianma': { cat: 'Notes', title: '编码复习' },           // 覆盖占位标题
  '机器成本优化项目': { cat: 'Project', title: '机器成本优化项目' },
  'neetcode_record 200': { cat: 'LeetCode' },
};

const slugify = (name) => name.toLowerCase().trim()
  .replace(/[^\w一-龥]+/g, '-').replace(/^-+|-+$/g, '');

const yamlEscape = (s) => '"' + String(s).replace(/"/g, '\\"') + '"';

function parse(raw) {
  if (raw.startsWith('---')) {
    const end = raw.indexOf('\n---', 3);
    if (end !== -1) {
      const fm = raw.slice(3, end);
      const body = raw.slice(end + 4).replace(/^\s*\n/, '');
      const get = (k) => (fm.match(new RegExp(`^${k}:\\s*(.*)$`, 'm'))?.[1] ?? '').replace(/^["']|["']$/g, '').trim();
      return { title: get('title'), excerpt: get('excerpt'), body };
    }
  }
  return { title: '', excerpt: '', body: raw };
}

for (const [name, meta] of Object.entries(ALLOW)) {
  const raw = await readFile(path.join(SRC, name + '.md'), 'utf8');
  const p = parse(raw);
  const title = meta.title || p.title || name;
  const slug = slugify(name);
  const fm = [
    '---',
    `title: ${yamlEscape(title)}`,
    `date: ${IMPORT_DATE}`,
    `categories: [${meta.cat}]`,
    p.excerpt ? `description: ${yamlEscape(p.excerpt)}` : null,
    'draft: false',
    '---',
    '',
  ].filter(Boolean).join('\n');
  const dir = path.join('src/content/tech', slug);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.md'), fm + p.body);
  console.log('migrated', slug);
}
