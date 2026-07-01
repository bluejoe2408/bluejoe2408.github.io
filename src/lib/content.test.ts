import { describe, it, expect } from 'vitest';
import { sortByDate, getFeatured, filterPublished } from './content';

const item = (date: string, extra = {}) => ({ data: { date: new Date(date), ...extra } });

describe('content helpers', () => {
  it('sortByDate sorts descending', () => {
    const r = sortByDate([item('2020-01-01'), item('2022-01-01'), item('2021-01-01')]);
    expect(r.map(i => i.data.date.getFullYear())).toEqual([2022, 2021, 2020]);
  });
  it('filterPublished drops drafts', () => {
    const r = filterPublished([{ data: { draft: true } }, { data: { draft: false } }, { data: {} }]);
    expect(r.length).toBe(2);
  });
  it('getFeatured keeps featured sorted by order', () => {
    const r = getFeatured([
      { data: { featured: true, order: 2 } },
      { data: { featured: false } },
      { data: { featured: true, order: 1 } },
    ]);
    expect(r.map(i => i.data.order)).toEqual([1, 2]);
  });
});
