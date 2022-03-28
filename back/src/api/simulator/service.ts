import { ProductRepositoryInterface } from '../../repositories/product.repository';
import { MeansOfTransport } from '../common/enums/meansOfTransport.enum';
import {
  getCompleteShopingProducts,
  getProductTaxesDetails,
  getTotalCustomDuty,
  getTotalProducts,
  getTotalProductsCustomDuty,
  getTotalProductsVat,
  ProductTaxesDetails,
  ShopingProduct,
} from './services';
import { isFreeFranchise } from './services/franchise.service';

interface SimulateServiceOptions {
  productRepository: ProductRepositoryInterface;
  border: boolean;
  age: number;
  meanOfTransport?: MeansOfTransport;
  shopingProducts: ShopingProduct[];
}

interface SimulateServiceResponse {
  products?: ProductTaxesDetails[];
  total: number;
  totalCustomDuty: number;
  totalVat: number;
}

export const service = async ({
  productRepository,
  border,
  age,
  meanOfTransport,
  shopingProducts,
}: SimulateServiceOptions): Promise<SimulateServiceResponse> => {
  const productIds = shopingProducts.map(({ id }) => id);
  const products = await productRepository.getManyByIds(productIds);

  const total = getTotalProducts(shopingProducts);
  if (isFreeFranchise({ total, border, age, meanOfTransport })) {
    return { total, totalCustomDuty: 0, totalVat: 0 };
  }
  const completeShopingProducts = getCompleteShopingProducts(shopingProducts, products);
  const productstaxesDetails = completeShopingProducts.map(getProductTaxesDetails);
  const totalProductsCustomDuty = getTotalProductsCustomDuty(productstaxesDetails);

  return {
    products: productstaxesDetails,
    total,
    totalCustomDuty: getTotalCustomDuty(total, totalProductsCustomDuty),
    totalVat: getTotalProductsVat(productstaxesDetails),
  };
};