import { faker } from '@faker-js/faker';

import { advancedSearch } from './search';

interface Item {
  id: string;
  name: string;
}

const DEFAULT_ITEMS = [...Array(10)].map((): Item => {
  return {
    id: faker.datatype.uuid(),
    name: `aaaaaaaaaaaaaaa ${faker.commerce.productName()}`,
  };
});

describe('advancedSearch', () => {
  it('should find matching element', () => {
    const searchValue = 'test';
    const bestMatchingId = '12';
    const secondMatchingId = '13';
    const items: Item[] = [
      ...DEFAULT_ITEMS,
      { id: bestMatchingId, name: searchValue },
      { id: faker.datatype.uuid(), name: 'tatotias' },
      { id: secondMatchingId, name: 'testos' },
    ];

    const results = advancedSearch({
      searchKey: ['name', 'words'],
      searchList: items,
      searchValue,
    });

    expect(results[0]?.id).toEqual(bestMatchingId);
    expect(results[1]?.id).toEqual(secondMatchingId);
  });
  it('should not find element', () => {
    const searchValue = 'bbbbb';
    const items: Item[] = [...DEFAULT_ITEMS];

    const results = advancedSearch({
      searchKey: ['name', 'words'],
      searchList: items,
      searchValue,
    });

    expect(results.length).toEqual(0);
  });
  it.each([
    [1, 0],
    [0, 2.5],
  ])('should get %d elements - with minRankAllowed = %d', (nbMatch, minRankAllowed) => {
    const searchValue = 'iph';
    const items: Item[] = [{ id: '12', name: 'appareil photo' }];

    const results = advancedSearch({
      searchKey: ['name', 'words'],
      searchList: items,
      searchValue,
      minRankAllowed,
    });

    expect(results.length).toEqual(nbMatch);
  });
});
