import currency from 'currency.js';
import { Currency } from '../../../../entities/currency.entity';
import { Product, ProductDisplayTypes, ProductType } from '../../../../entities/product.entity';
import { ShoppingProduct } from '../shoppingProducts';

export class DetailedShoppingProduct {
  shoppingProduct: ShoppingProduct;
  product?: Product;
  currency?: Currency;
  taxableValue?: number;

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

  isNotManagedShoppingProduct(): boolean {
    return (
      this.product === undefined ||
      this.product?.productDisplayTypes === ProductDisplayTypes.notManaged
    );
  }

  public clone(): DetailedShoppingProduct {
    const clonedProduct = createDetailedShoppingProduct({
      shoppingProduct: {
        ...this.shoppingProduct,
        id: this.shoppingProduct.id,
        originalValue: this.shoppingProduct.originalValue,
        currency: this.shoppingProduct.currency,
        alcoholDegree: this.shoppingProduct.alcoholDegree,
      },
      products: this.product ? [this.product] : [],
      currencies: this.currency ? [this.currency] : [],
    });

    return clonedProduct;
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

  const product = products.find((product) => product.id === shoppingProduct.id);
  if (product && shoppingProduct.alcoholDegree !== undefined) {
    product.alcoholDegree = shoppingProduct.alcoholDegree;
  }
  detailedShoppingProduct.product = product;

  detailedShoppingProduct.currency = currencies.find(
    (currency) => currency.id === shoppingProduct.currency,
  );

  return detailedShoppingProduct;
};
