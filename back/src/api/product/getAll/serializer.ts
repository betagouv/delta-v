import { Product } from '../../../entities/product.entity';
import { sortProducts } from '../../../utils/product.util';
import {
  productSerializer,
  SerializedProduct,
} from '../../declaration/common/serializer/declarationSerializer';

export interface SerializedGetAllProducts {
  products: SerializedProduct[];
}

export const serializer = (products: Product[]): SerializedGetAllProducts => {
  return {
    products: products.sort(sortProducts).map(productSerializer),
  };
};
