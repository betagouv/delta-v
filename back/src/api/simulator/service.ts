import { ProductRepositoryInterface } from '../../repositories/product.repository';
import { MeansOfTransport } from '../common/enums/meansOfTransport.enum';
import {
  getCompleteShopingProducts,
  getProductTaxesDetails,
  getTotalProducts,
  getTotalProductsCustomDuty,
  getTotalProductsVat,
  ProductTaxesDetails,
  ShopingProduct,
} from './services';
import { isFreeFranchise } from './services/franchise.service';

interface SimulateServiceOptions {
  productRepository: ProductRepositoryInterface;
  border?: boolean;
  adult?: boolean;
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
  border = false,
  adult = false,
  meanOfTransport,
  shopingProducts,
}: SimulateServiceOptions): Promise<SimulateServiceResponse> => {
  const productIds = shopingProducts.map(({ id }) => id);
  const products = await productRepository.getManyByIds(productIds);

  const total = getTotalProducts(shopingProducts);
  if (isFreeFranchise({ total, border, adult, meanOfTransport })) {
    return { total, totalCustomDuty: 0, totalVat: 0 };
  }
  const completeShopingProducts = getCompleteShopingProducts(shopingProducts, products);
  const productstaxesDetails = completeShopingProducts.map(getProductTaxesDetails);

  return {
    products: productstaxesDetails,
    total,
    totalCustomDuty: getTotalProductsCustomDuty(productstaxesDetails),
    totalVat: getTotalProductsVat(productstaxesDetails),
  };
};
