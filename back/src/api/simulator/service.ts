import { Alpha2Code } from 'i18n-iso-countries';
import { ProductTaxes, ProductTaxesInterface } from '../../entities/productTaxes.entity';
import { ProductRepositoryInterface } from '../../repositories/product.repository';
import { MeansOfTransport } from '../common/enums/meansOfTransport.enum';
import {
  getCompleteShoppingProducts,
  getTotalProducts,
  manageProductTaxesDetails,
  ShoppingProduct,
} from './services';
import { getFranchiseAmount } from './services/franchise.service';

interface SimulateServiceOptions {
  productRepository: ProductRepositoryInterface;
  border: boolean;
  age: number;
  country: Alpha2Code;
  meanOfTransport?: MeansOfTransport;
  shoppingProducts: ShoppingProduct[];
}

interface SimulateServiceResponse {
  products: ProductTaxesInterface[];
  franchiseAmount: number;
}

export const service = async ({
  productRepository,
  border,
  age,
  country,
  meanOfTransport,
  shoppingProducts,
}: SimulateServiceOptions): Promise<SimulateServiceResponse> => {
  const productIds = shoppingProducts.map(({ id }) => id);
  const products = await productRepository.getManyByIds(productIds);

  const total = getTotalProducts(shoppingProducts);
  const franchiseAmount = getFranchiseAmount({ border, age, country, meanOfTransport });
  const completeShoppingProducts = getCompleteShoppingProducts(shoppingProducts, products);
  const productsTaxes = completeShoppingProducts.map((product) =>
    new ProductTaxes({}).setFromCompleteShoppingProduct(product),
  );

  const productDetailed = manageProductTaxesDetails({
    franchiseAmount,
    total,
    productsTaxes,
  });

  return {
    products: productDetailed,
    franchiseAmount,
  };
};
