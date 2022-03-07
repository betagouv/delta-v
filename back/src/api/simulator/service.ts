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

interface SimulateServiceOptions {
  productRepository: ProductRepositoryInterface;
  shopingProducts: ShopingProduct[];
}

interface SimulateServiceResponse {
  products: ProductTaxesDetails[];
  total: number;
  totalCustomDuty: number;
  totalVat: number;
}

export const service = async ({
  productRepository,
  shopingProducts,
}: SimulateServiceOptions): Promise<SimulateServiceResponse> => {
  const productIds = shopingProducts.map(({ id }) => id);
  const products = await productRepository.getManyByIds(productIds);

  const completeShopingProducts = getCompleteShopingProducts(shopingProducts, products);
  const productstaxesDetails = completeShopingProducts.map(getProductTaxesDetails);

  return {
    products: productstaxesDetails,
    total: getTotalProducts(shopingProducts),
    totalCustomDuty: getTotalProductsCustomDuty(productstaxesDetails),
    totalVat: getTotalProductsVat(productstaxesDetails),
  };
};
