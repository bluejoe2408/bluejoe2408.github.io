import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE } from '../config/site';

export async function GET(context: APIContext) {
  const posts = (await getCollection('tech')).filter(p => !p.data.draft);
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site!,
    items: posts.map(p => ({ title: p.data.title, pubDate: p.data.date, link: `/tech/${p.id}` })),
  });
}
