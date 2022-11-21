import ReactDOMServer from 'react-dom/server';

// eslint-disable-next-line import/no-cycle
import { StoreSlice } from '../store';
import {
  ForbiddenGoods,
  Money,
  ParticularGoods,
  PrepareMyDocuments,
  WhenDeclare,
} from '@/staticData/PrepareMyTrip';
import { allBuying, BuyingData } from '@/staticData/PrepareMyTrip/Buying';

export interface PrepareMyTripAppStateSlice {
  prepareMyTrip: {
    appState: {
      data: BuyingData[];
    };
  };
}

export const formatDataElement = (element: BuyingData): BuyingData => ({
  ...element,
  search: [
    element.question,
    ReactDOMServer.renderToStaticMarkup(element.answer)
      .replace(/<[^>]*>?/gm, ' ')
      .replace(/ +(?= )/g, '')
      .replace(/&#x27;/g, "'")
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''),
  ],
});

const prepareData = (): BuyingData[] => {
  const prepareMyTripData: BuyingData[] = [
    ...PrepareMyDocuments,
    ...WhenDeclare,
    ...allBuying(),
    ...ParticularGoods,
    ...ForbiddenGoods,
    ...Money,
  ];

  return prepareMyTripData.map(formatDataElement);
};

export const createPrepareMyTripAppStateSlice: StoreSlice<PrepareMyTripAppStateSlice> = () => ({
  prepareMyTrip: {
    appState: { data: prepareData() },
  },
});
