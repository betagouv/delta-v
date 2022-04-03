import { ProductTaxes, ProductTaxesInterface } from '../../entities/productTaxes.entity';
import { ProductRepositoryInterface } from '../../repositories/product.repository';
import { MeansOfTransport } from '../common/enums/meansOfTransport.enum';
import {
  getCompleteShopingProducts,
  getTotalProducts,
  manageProductTaxeDetails,
  ShopingProduct,
} from './services';
import { getFranchiseAmount } from './services/franchise.service';

interface SimulateServiceOptions {
  productRepository: ProductRepositoryInterface;
  border: boolean;
  age: number;
  meanOfTransport?: MeansOfTransport;
  shopingProducts: ShopingProduct[];
}

interface SimulateServiceResponse {
  products: ProductTaxesInterface[];
  franchiseAmount: number;
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
  const franchiseAmount = getFranchiseAmount({ border, age, meanOfTransport });
  const completeShopingProducts = getCompleteShopingProducts(shopingProducts, products);
  const productsTaxes = completeShopingProducts.map((product) =>
    new ProductTaxes({}).setFromCompleteShopingProduct(product),
  );

  const productDetailled = manageProductTaxeDetails({
    franchiseAmount,
    total,
    productsTaxes,
  });

  return {
    products: productDetailled,
    franchiseAmount,
  };
};
