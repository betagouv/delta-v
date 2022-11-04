import { Alpha2Code } from 'i18n-iso-countries';
import { ProductType } from '../../entities/product.entity';
import { ProductTaxes, ProductTaxesInterface } from '../../entities/productTaxes.entity';
import { CurrencyRepositoryInterface } from '../../repositories/currency.repository';
import { ProductRepositoryInterface } from '../../repositories/product.repository';
import { MeansOfTransport } from '../common/enums/meansOfTransport.enum';
import { getTotalProducts, manageProductTaxesDetails } from './services';
import { AmountGroup, checkAmountProducts } from './services/amountProducts/globalAmount.service';
import { getCompleteProducts, ShoppingProduct } from './services/shoppingProducts';
import { getFranchiseAmount } from './services/valueProducts/franchise.service';

interface SimulateServiceOptions {
  productRepository: ProductRepositoryInterface;
  currencyRepository: CurrencyRepositoryInterface;
  border: boolean;
  age: number;
  country: Alpha2Code;
  meanOfTransport?: MeansOfTransport;
  shoppingProducts: ShoppingProduct[];
}

interface SimulateServiceResponse {
  valueProducts: ProductTaxesInterface[];
  amountProducts: AmountGroup[];
  franchiseAmount: number;
}

export const service = async ({
  productRepository,
  currencyRepository,
  border,
  age,
  country,
  meanOfTransport,
  shoppingProducts,
}: SimulateServiceOptions): Promise<SimulateServiceResponse> => {
  const completeShoppingProducts = await getCompleteProducts({
    shoppingProducts,
    productRepository,
    currencyRepository,
  });

  const completeValueShoppingProducts = completeShoppingProducts.filter(
    (completeShoppingProduct) => completeShoppingProduct.product.productType === ProductType.value,
  );
  const productsTaxes = completeValueShoppingProducts.map((product) =>
    new ProductTaxes({}).setFromCompleteShoppingProduct(product),
  );

  const completeAmountShoppingProducts = completeShoppingProducts.filter(
    (completeShoppingProduct) => completeShoppingProduct.product.productType === ProductType.amount,
  );
  const amountProducts = checkAmountProducts(completeAmountShoppingProducts, country, border);

  const franchiseAmount = getFranchiseAmount({ border, age, country, meanOfTransport });
  const total = getTotalProducts(completeShoppingProducts);
  const productDetailed = manageProductTaxesDetails({
    franchiseAmount,
    total,
    productsTaxes,
  });

  return {
    valueProducts: productDetailed,
    amountProducts,
    franchiseAmount,
  };
};
