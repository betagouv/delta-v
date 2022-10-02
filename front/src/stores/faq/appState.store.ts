import ReactDOMServer from 'react-dom/server';

// eslint-disable-next-line import/no-cycle
import { StoreSlice } from '../store';
import { BlocElements } from '@/staticData';
import { Border, Declaration, Legal, Payment } from '@/staticData/Faq';

export interface FaqAppStateSlice {
  faq: {
    appState: {
      blocks: BlocElements[];
    };
  };
}

const prepareData = (): BlocElements[] => {
  const rawBlocks = [
    { title: 'Déclaration', elements: Declaration },
    { title: 'Passage frontière', elements: Border },
    { title: 'Paiement', elements: Payment },
    { title: 'Légal', elements: Legal },
  ];

  const test = rawBlocks.map((block) => ({
    title: block.title,
    elements: block.elements.map((item) => ({
      ...item,
      search: [
        item.question,
        ReactDOMServer.renderToStaticMarkup(item.answer)
          .replace(/<[^>]*>?/gm, ' ')
          .replace(/ +(?= )/g, '')
          .replace(/&#x27;/g, "'")
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, ''),
      ],
    })),
  }));

  return test;
};

export const createFaqAppStateSlice: StoreSlice<FaqAppStateSlice> = () => ({
  faq: {
    appState: { blocks: prepareData() },
  },
});
