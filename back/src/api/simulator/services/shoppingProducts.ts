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

export interface CustomShoppingProduct {
  customId: string;
  customName: string;
  originalValue: number;
  currency: string;
}

export interface CompleteShoppingProduct extends ShoppingProduct {
  product: Product;
  value: number;
  rateCurrency?: number;
}

export interface CompleteCustomShoppingProduct extends CustomShoppingProduct {
  value: number;
  rateCurrency?: number;
}

interface GetAllProductsOptions {
  shoppingProducts: ShoppingProduct[];
  customShoppingProducts: CustomShoppingProduct[];
  productRepository: ProductRepositoryInterface;
  currencyRepository: CurrencyRepositoryInterface;
}

interface GetAllProductsResponse {
  completeShoppingProducts: CompleteShoppingProduct[];
  completeCustomShoppingProducts: CompleteCustomShoppingProduct[];
}

export const getCompleteProducts = async ({
  shoppingProducts,
  customShoppingProducts,
  productRepository,
  currencyRepository,
}: GetAllProductsOptions): Promise<GetAllProductsResponse> => {
  const productIds = shoppingProducts.map(({ id }) => id);
  const products = await productRepository.getManyByIds(productIds);
  const usedCurrencies = shoppingProducts.map((shoppingProduct) => shoppingProduct.currency);
  const currencies = await currencyRepository.getManyByIds(usedCurrencies);

  const completeShoppingProducts = shoppingProducts.map((shoppingProduct) =>
    getCompleteShoppingProduct(shoppingProduct, products, currencies),
  );

  const completeCustomShoppingProducts = customShoppingProducts.map((shoppingProduct) =>
    getCompleteCustomShoppingProduct(shoppingProduct, currencies),
  );

  return {
    completeShoppingProducts,
    completeCustomShoppingProducts,
  };
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

export const getCompleteCustomShoppingProduct = (
  CustomShoppingProduct: CustomShoppingProduct,
  currencies: Currency[],
): CompleteCustomShoppingProduct => {
  const currentCurrency = currencies.find(
    (currency) => currency.id === CustomShoppingProduct.currency,
  );
  if (!currentCurrency) {
    throw currencyNotFoundError();
  }

  return {
    ...CustomShoppingProduct,
    value: currency(CustomShoppingProduct.originalValue).divide(currentCurrency.value).value,
    rateCurrency: currentCurrency.value,
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
