import { CurrencyRepositoryInterface } from '../../../../repositories/currency.repository';
import { ProductRepositoryInterface } from '../../../../repositories/product.repository';
import { ShoppingProduct } from '../shoppingProducts';
import { getAllMatchingProducts } from '../product/getMatchingProducts.service';
import { getAllMatchingCurrencies } from '../currencies/getCurrencies.service';
import { createDetailedShoppingProduct, DetailedShoppingProduct } from '.';

interface InitDetailedShoppingProductsOptions {
  shoppingProducts: ShoppingProduct[];
  productRepository: ProductRepositoryInterface;
  currencyRepository: CurrencyRepositoryInterface;
}

interface InitDetailedShoppingProductsWithoutCurrenciesOptions {
  shoppingProducts: ShoppingProduct[];
  productRepository: ProductRepositoryInterface;
}

export const initDetailedShoppingProducts = async ({
  shoppingProducts,
  productRepository,
  currencyRepository,
}: InitDetailedShoppingProductsOptions): Promise<DetailedShoppingProduct[]> => {
  const products = await getAllMatchingProducts({ shoppingProducts, productRepository });
  const currencies = await getAllMatchingCurrencies({ shoppingProducts, currencyRepository });

  return shoppingProducts.map((shoppingProduct) =>
    createDetailedShoppingProduct({ shoppingProduct, products, currencies }),
  );
};

export const initDetailedShoppingProductsWithoutCurrencies = async ({
  shoppingProducts,
  productRepository,
}: InitDetailedShoppingProductsWithoutCurrenciesOptions): Promise<DetailedShoppingProduct[]> => {
  const products = await getAllMatchingProducts({ shoppingProducts, productRepository });

  return shoppingProducts.map((shoppingProduct) =>
    createDetailedShoppingProduct({ shoppingProduct, products, currencies: [] }),
  );
};
