export function sortByDate<T extends { data: { date: Date } }>(items: T[]): T[] {
  return [...items].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
export function filterPublished<T extends { data: { draft?: boolean } }>(items: T[]): T[] {
  return items.filter(i => i.data.draft !== true);
}
export function getFeatured<T extends { data: { featured?: boolean; order?: number } }>(items: T[]): T[] {
  return items.filter(i => i.data.featured).sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
}
