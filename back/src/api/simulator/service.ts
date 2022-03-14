import { ProductRepositoryInterface } from '../../repositories/product.repository';
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
  shopingProducts,
}: SimulateServiceOptions): Promise<SimulateServiceResponse> => {
  const productIds = shopingProducts.map(({ id }) => id);
  const products = await productRepository.getManyByIds(productIds);

  const total = getTotalProducts(shopingProducts);
  if (isFreeFranchise({ total, border, adult })) {
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
