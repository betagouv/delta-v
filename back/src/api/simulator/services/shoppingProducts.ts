import currency from 'currency.js';
import { Currency } from '../../../entities/currency.entity';
import { Product } from '../../../entities/product.entity';
import { CurrencyRepositoryInterface } from '../../../repositories/currency.repository';
import { ProductRepositoryInterface } from '../../../repositories/product.repository';
import currencyNotFoundError from '../../common/errors/currencyNotFound.error';
import productNotFoundError from '../../common/errors/productNotFound.error';

export interface ShoppingProduct {
  id: string;
  customId: string;
  customName?: string;
  originalValue: number;
  currency: string;
}

export interface CompleteShoppingProduct extends ShoppingProduct {
  product: Product;
  value: number;
  rateCurrency?: number;
}

interface GetAllProductsOptions {
  shoppingProducts: ShoppingProduct[];
  productRepository: ProductRepositoryInterface;
  currencyRepository: CurrencyRepositoryInterface;
}

export const getCompleteProducts = async ({
  shoppingProducts,
  productRepository,
  currencyRepository,
}: GetAllProductsOptions): Promise<CompleteShoppingProduct[]> => {
  const productIds = shoppingProducts.map(({ id }) => id);
  const products = await productRepository.getManyByIds(productIds);
  const usedCurrencies = shoppingProducts.map((shoppingProduct) => shoppingProduct.currency);
  const currencies = await currencyRepository.getManyByIds(usedCurrencies);

  return getCompleteShoppingProducts(shoppingProducts, products, currencies);
};

export const getCompleteShoppingProduct = (
  shoppingProduct: ShoppingProduct,
  products: Product[],
  currencies: Currency[],
): CompleteShoppingProduct => {
  const currentProduct = products.find((product) => product.id === shoppingProduct.id);

  if (!currentProduct) {
    throw productNotFoundError(shoppingProduct.id);
  }

  const currentCurrency = currencies.find((currency) => currency.id === shoppingProduct.currency);
  if (!currentCurrency) {
    throw currencyNotFoundError();
  }

  return {
    ...shoppingProduct,
    value: currency(shoppingProduct.originalValue).divide(currentCurrency.value).value,
    rateCurrency: currentCurrency.value,
    product: currentProduct,
  };
};

export const getCompleteShoppingProducts = (
  shoppingProducts: ShoppingProduct[],
  products: Product[],
  currencies: Currency[],
): CompleteShoppingProduct[] => {
  return shoppingProducts.map((shoppingProduct) =>
    getCompleteShoppingProduct(shoppingProduct, products, currencies),
  );
};
