import { faker } from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';

import { SearchHistory, SearchHistoryProps } from './SearchHistory';
import { SearchHistoryItem, SearchHistoryItemProps } from './SearchHistoryItem';

export default {
  title: 'Components/Business/SearchHistory',
  component: SearchHistory,
} as Meta;

export const Playground: Story<SearchHistoryProps> = (args) => <SearchHistory {...args} />;

const searchedString = faker.commerce.product();

const SEARCH_HISTORY_ITEM_DATA: SearchHistoryItemProps = {
  matchingValue: searchedString,
  product: ` ${faker.commerce.product()} ${searchedString} ${faker.commerce.product()}`,
  category: faker.commerce.product(),
};

const SEARCH_HISTORY_DATA: SearchHistoryProps = {
  histories: [
    {
      matchingValue: searchedString,
      product: ` ${faker.commerce.product()} ${searchedString} ${faker.commerce.product()}`,
      category: faker.commerce.product(),
    },
    {
      matchingValue: searchedString,
      product: ` ${faker.commerce.product()} ${searchedString} ${faker.commerce.product()}`,
      category: faker.commerce.product(),
    },
    {
      matchingValue: searchedString,
      product: ` ${faker.commerce.product()} ${searchedString} ${faker.commerce.product()}`,
      category: faker.commerce.product(),
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

// import type { Meta, StoryObj } from '@storybook/react';

// import { ComponentDocumentation } from '@/components/atoms/ComponentDocumentation';

// import { Stack } from './Stack';
// import { StackItem } from './StackItem';
// import { Stacks } from './Stacks';

// const meta: Meta<typeof Stacks> = {
//   title: 'molecules/Stacks',
//   component: Stacks,
//   tags: ['autodocs']
// };

// export default meta;
// type Story = StoryObj<typeof Stacks>;

// export const Playground: Story = {
//   args: {
//     items: [
//       {
//         stackTitle: 'Category 1',
//         items: [
//           {
//             image: 'https://snowpact.com/static/bbfc78f3a6a4c94f955ebc166ba7a4d6/59649/stack-gatsby.png',
//             alt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a.',
//             title: 'No link'
//           },
//           {
//             image: 'https://snowpact.com/static/bbfc78f3a6a4c94f955ebc166ba7a4d6/59649/stack-gatsby.png',
//             alt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a.',
//             title: 'Has link',
//             link: 'https://snowpact.com/techno/gatsby'
//           },
//           {
//             image: 'https://snowpact.com/static/bbfc78f3a6a4c94f955ebc166ba7a4d6/59649/stack-gatsby.png',
//             alt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a.',
//             title: 'Has link',
//             link: 'https://snowpact.com/techno/gatsby'
//           },
//           {
//             image: 'https://snowpact.com/static/bbfc78f3a6a4c94f955ebc166ba7a4d6/59649/stack-gatsby.png',
//             alt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a.',
//             title: 'Has link',
//             link: 'https://snowpact.com/techno/gatsby'
//           }
//         ]
//       },
//       {
//         stackTitle: 'Category 2',
//         items: [
//           {
//             image: 'https://snowpact.com/static/bbfc78f3a6a4c94f955ebc166ba7a4d6/59649/stack-gatsby.png',
//             alt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a.',
//             title: 'Has link',
//             link: 'https://snowpact.com/techno/gatsby'
//           },
//           {
//             image: 'https://snowpact.com/static/bbfc78f3a6a4c94f955ebc166ba7a4d6/59649/stack-gatsby.png',
//             alt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a.',
//             title: 'No link'
//           },
//           {
//             image: 'https://snowpact.com/static/bbfc78f3a6a4c94f955ebc166ba7a4d6/59649/stack-gatsby.png',
//             alt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a.',
//             title: 'No link'
//           },
//           {
//             image: 'https://snowpact.com/static/bbfc78f3a6a4c94f955ebc166ba7a4d6/59649/stack-gatsby.png',
//             alt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a.',
//             title: 'Has link',
//             link: 'https://snowpact.com/techno/gatsby'
//           }
//         ]
//       },
//       {
//         stackTitle: 'Category 3',
//         items: [
//           {
//             image: 'https://snowpact.com/static/bbfc78f3a6a4c94f955ebc166ba7a4d6/59649/stack-gatsby.png',
//             alt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a.',
//             title: 'Has link',
//             link: 'https://snowpact.com/techno/gatsby'
//           },
//           {
//             image: 'https://snowpact.com/static/bbfc78f3a6a4c94f955ebc166ba7a4d6/59649/stack-gatsby.png',
//             alt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a.',
//             title: 'Has link',
//             link: 'https://snowpact.com/techno/gatsby'
//           },
//           {
//             image: 'https://snowpact.com/static/bbfc78f3a6a4c94f955ebc166ba7a4d6/59649/stack-gatsby.png',
//             alt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a.',
//             title: 'Has link',
//             link: 'https://snowpact.com/techno/gatsby'
//           },
//           {
//             image: 'https://snowpact.com/static/bbfc78f3a6a4c94f955ebc166ba7a4d6/59649/stack-gatsby.png',
//             alt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a.',
//             title: 'No link'
//           }
//         ]
//       }
//     ]
//   }
// };

// const STACKITEM_DATA = {
//   image: 'https://snowpact.com/static/bbfc78f3a6a4c94f955ebc166ba7a4d6/59649/stack-gatsby.png',
//   alt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a.',
//   link: 'https://snowpact.com/techno/gatsby'
// };

// export const StackItemComponent = () => (
//   <div>
//     <ComponentDocumentation title="With Link">
//       <StackItem image={STACKITEM_DATA.image} alt={STACKITEM_DATA.alt} title="Has a link" link={STACKITEM_DATA.link} />
//     </ComponentDocumentation>
//     <ComponentDocumentation title="Without Link">
//       <StackItem image={STACKITEM_DATA.image} alt={STACKITEM_DATA.alt} title="No link" />
//     </ComponentDocumentation>
//     <ComponentDocumentation title="Is gray with Link">
//       <StackItem
//         image={STACKITEM_DATA.image}
//         alt={STACKITEM_DATA.alt}
//         title="Has a link"
//         link={STACKITEM_DATA.link}
//         grayscale
//       />
//     </ComponentDocumentation>
//     <ComponentDocumentation title="Is gray without Link">
//       <StackItem image={STACKITEM_DATA.image} alt={STACKITEM_DATA.alt} title="No link" grayscale />
//     </ComponentDocumentation>
//   </div>
// );

// const STACK_DATA = {
//   stackTitle: 'Category',
//   items: [
//     {
//       image: 'https://snowpact.com/static/bbfc78f3a6a4c94f955ebc166ba7a4d6/59649/stack-gatsby.png',
//       alt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a.',
//       title: 'Has link',
//       link: 'https://snowpact.com/techno/gatsby'
//     },
//     {
//       image: 'https://snowpact.com/static/bbfc78f3a6a4c94f955ebc166ba7a4d6/59649/stack-gatsby.png',
//       alt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a.',
//       title: 'No link'
//     },
//     {
//       image: 'https://snowpact.com/static/bbfc78f3a6a4c94f955ebc166ba7a4d6/59649/stack-gatsby.png',
//       alt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a.',
//       title: 'No link (gray)',
//       grayscale: true
//     },
//     {
//       image: 'https://snowpact.com/static/bbfc78f3a6a4c94f955ebc166ba7a4d6/59649/stack-gatsby.png',
//       alt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a.',
//       title: 'Has link (gray)',
//       link: 'https://snowpact.com/techno/gatsby',
//       grayscale: true
//     }
//   ]
// };

// export const StackComponent = () => (
//   <div>
//     <ComponentDocumentation title="Vertical variant (default)">
//       <Stack stackTitle={STACK_DATA.stackTitle} items={STACK_DATA.items} />
//     </ComponentDocumentation>
//     <ComponentDocumentation title="Horizontal variant">
//       <Stack stackTitle={STACK_DATA.stackTitle} items={STACK_DATA.items} horizontal />
//     </ComponentDocumentation>
//   </div>
// );

// const STACKS_DATA = [
//   {
//     stackTitle: 'Category 1',
//     items: [
//       {
//         image: 'https://snowpact.com/static/bbfc78f3a6a4c94f955ebc166ba7a4d6/59649/stack-gatsby.png',
//         alt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a.',
//         title: 'No link'
//       },
//       {
//         image: 'https://snowpact.com/static/bbfc78f3a6a4c94f955ebc166ba7a4d6/59649/stack-gatsby.png',
//         alt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a.',
//         title: 'Has link (gray)',
//         link: 'https://snowpact.com/techno/gatsby',
//         grayscale: true
//       },
//       {
//         image: 'https://snowpact.com/static/bbfc78f3a6a4c94f955ebc166ba7a4d6/59649/stack-gatsby.png',
//         alt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a.',
//         title: 'Has link',
//         link: 'https://snowpact.com/techno/gatsby'
//       },
//       {
//         image: 'https://snowpact.com/static/bbfc78f3a6a4c94f955ebc166ba7a4d6/59649/stack-gatsby.png',
//         alt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a.',
//         title: 'Has link',
//         link: 'https://snowpact.com/techno/gatsby'
//       }
//     ]
//   },
//   {
//     stackTitle: 'Category 2',
//     items: [
//       {
//         image: 'https://snowpact.com/static/bbfc78f3a6a4c94f955ebc166ba7a4d6/59649/stack-gatsby.png',
//         alt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a.',
//         title: 'Has link',
//         link: 'https://snowpact.com/techno/gatsby'
//       },
//       {
//         image: 'https://snowpact.com/static/bbfc78f3a6a4c94f955ebc166ba7a4d6/59649/stack-gatsby.png',
//         alt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a.',
//         title: 'No link (gray)',
//         grayscale: true
//       },
//       {
//         image: 'https://snowpact.com/static/bbfc78f3a6a4c94f955ebc166ba7a4d6/59649/stack-gatsby.png',
//         alt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a.',
//         title: 'No link'
//       },
//       {
//         image: 'https://snowpact.com/static/bbfc78f3a6a4c94f955ebc166ba7a4d6/59649/stack-gatsby.png',
//         alt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a.',
//         title: 'Has link',
//         link: 'https://snowpact.com/techno/gatsby'
//       }
//     ]
//   },
//   {
//     stackTitle: 'Category 3',
//     items: [
//       {
//         image: 'https://snowpact.com/static/bbfc78f3a6a4c94f955ebc166ba7a4d6/59649/stack-gatsby.png',
//         alt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a.',
//         title: 'Has link',
//         link: 'https://snowpact.com/techno/gatsby'
//       },
//       {
//         image: 'https://snowpact.com/static/bbfc78f3a6a4c94f955ebc166ba7a4d6/59649/stack-gatsby.png',
//         alt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a.',
//         title: 'Has link',
//         link: 'https://snowpact.com/techno/gatsby'
//       },
//       {
//         image: 'https://snowpact.com/static/bbfc78f3a6a4c94f955ebc166ba7a4d6/59649/stack-gatsby.png',
//         alt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a.',
//         title: 'Has link (gray)',
//         link: 'https://snowpact.com/techno/gatsby',
//         grayscale: true
//       },
//       {
//         image: 'https://snowpact.com/static/bbfc78f3a6a4c94f955ebc166ba7a4d6/59649/stack-gatsby.png',
//         alt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a.',
//         title: 'No link'
//       }
//     ]
//   }
// ];

// export const StacksComponent = () => (
//   <div>
//     <ComponentDocumentation title="Vertical variant (default)">
//       <Stacks items={STACKS_DATA} />
//     </ComponentDocumentation>
//     <ComponentDocumentation title="Horizontal variant">
//       <Stacks items={STACKS_DATA} horizontal />
//     </ComponentDocumentation>
//   </div>
// );
