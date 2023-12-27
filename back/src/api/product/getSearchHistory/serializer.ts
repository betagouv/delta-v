/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { SearchProductHistoryEntityInterface } from '../../../entities/searchProductHistory.entity';
import { SerializedProduct } from '../../declaration/common/serializer/declarationSerializer';

export type SearchProductHistoryItem = Pick<SerializedProduct, 'id' | 'name'>;

export interface SerializedGetSearchProductHistory {
  productsHistory: SearchProductHistoryItem[];
}

export const serializer = (
  history: SearchProductHistoryEntityInterface[],
): SerializedGetSearchProductHistory => {
  return {
    productsHistory: history.map((search) => {
      return {
        id: search.productId,
        name: search.product!.name,
      };
    }),
  };
};
