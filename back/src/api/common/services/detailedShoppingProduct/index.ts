import currency from 'currency.js';
import { Currency } from '../../../../entities/currency.entity';
import { Product, ProductDisplayTypes, ProductType } from '../../../../entities/product.entity';
import { ShoppingProduct } from '../shoppingProducts';

export class DetailedShoppingProduct {
  shoppingProduct: ShoppingProduct;
  product?: Product;
  currency?: Currency;

  isValueProduct(): boolean {
    if (!this.product || this.isUncompletedProduct()) {
      return false;
    }

    return this.product.productType === ProductType.value;
  }

  isAmountProduct(): boolean {
    if (!this.product || this.isUncompletedProduct()) {
      return false;
    }

    return this.product.productType === ProductType.amount;
  }

  isUncompletedProduct(): boolean {
    if (!this.product) {
      return true;
    }
    return this.product.productDisplayTypes === ProductDisplayTypes.notManaged;
  }

  getDefaultCurrencyValue(): number {
    if (!this.currency) {
      return 0;
    }

    if (this.isAmountProduct()) {
      return this.shoppingProduct.originalValue;
    }

    return currency(this.shoppingProduct.originalValue).divide(this.currency.value).value;
  }
}

interface CreateDetailedShoppingProductOptions {
  shoppingProduct: ShoppingProduct;
  products: Product[];
  currencies: Currency[];
}

export const createDetailedShoppingProduct = ({
  shoppingProduct,
  products,
  currencies,
}: CreateDetailedShoppingProductOptions): DetailedShoppingProduct => {
  const detailedShoppingProduct = new DetailedShoppingProduct();
  detailedShoppingProduct.shoppingProduct = shoppingProduct;

  detailedShoppingProduct.product = products.find((product) => product.id === shoppingProduct.id);
  detailedShoppingProduct.currency = currencies.find(
    (currency) => currency.id === shoppingProduct.currency,
  );

  return detailedShoppingProduct;
};
