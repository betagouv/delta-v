import { faker } from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';

import { SearchHistory, SearchHistoryProps } from './SearchHistory';
import { SearchHistoryItem, SearchHistoryItemProps } from './SearchHistoryItem';

export default {
  title: 'Components/Business/SearchHistory',
  component: SearchHistory,
} as Meta;

export const Playground: Story<SearchHistoryProps> = (args) => <SearchHistory {...args} />;

const mockedString = `${faker.commerce.product()} ${faker.commerce.product()} ${faker.commerce.product()}`;
const mockedStart = mockedString.indexOf(' ');
const mockedEnd = mockedString.indexOf(' ', mockedStart + 1);

const SEARCH_HISTORY_ITEM_DATA: SearchHistoryItemProps = {
  matchingValue: mockedString,
  searchStart: mockedStart,
  searchEnd: mockedEnd,
  category: faker.commerce.product(),
};

const SEARCH_HISTORY_DATA: SearchHistoryProps = {
  histories: [
    {
      ...SEARCH_HISTORY_ITEM_DATA,
    },
    {
      ...SEARCH_HISTORY_ITEM_DATA,
    },
    {
      ...SEARCH_HISTORY_ITEM_DATA,
    },
  ],
};

Playground.args = SEARCH_HISTORY_DATA;

export const SearchHistoryItemComponent = (): JSX.Element => {
  return (
    <div>
      <SearchHistoryItem {...SEARCH_HISTORY_ITEM_DATA} />
    </div>
  );
};

export const SearchHistoryComponent = (): JSX.Element => {
  return (
    <div>
      <SearchHistory {...SEARCH_HISTORY_DATA} />
    </div>
  );
};
