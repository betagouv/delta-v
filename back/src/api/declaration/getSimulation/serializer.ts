import currency from 'currency.js';
import { ProductTaxesInterface } from '../../../entities/productTaxes.entity';
import {
  AmountGroup,
  AmountProduct,
} from '../../common/services/amountProducts/globalAmount.service';

interface SerializedValueProduct {
  id?: string;
  name?: string;
  customId: string;
  customName?: string;
  customDuty: number;
  vat: number;
  unitPrice: number;
  originalPrice: number;
  originalCurrency?: string;
  rateCurrency: number;
  unitCustomDuty: number;
  unitVat: number;
  unitTaxes: number;
  notManagedProduct: boolean;
}

interface SerializedAmountProduct {
  group: string;
  products: {
    id?: string;
    name?: string;
    amountProduct?: AmountProduct;
    customName?: string;
    customId: string;
    amount: number;
  }[];
  isOverMaximum: boolean;
}

interface SerializedSimulatorOptions {
  valueProducts: ProductTaxesInterface[];
  customProducts: ProductTaxesInterface[];
  amountProducts: AmountGroup[];
  franchiseAmount: number;
  canCalculateTaxes: boolean;
  canCreateDeclaration: boolean;
}

interface SerializedSimulatorResponse {
  valueProducts?: SerializedValueProduct[];
  customProducts?: SerializedValueProduct[];
  amountProducts?: SerializedAmountProduct[];
  total: number;
  totalCustomDuty: number;
  totalVat: number;
  totalTaxes: number;
  franchiseAmount: number | string;
  canCalculateTaxes: boolean;
  canCreateDeclaration: boolean;
}

const serializeValueProduct = (productTaxes: ProductTaxesInterface): SerializedValueProduct => ({
  id: productTaxes.id,
  name: productTaxes.name,
  customId: productTaxes.customId,
  customName: productTaxes.customName,
  unitPrice: productTaxes.unitPrice,
  originalPrice: productTaxes.originalPrice,
  originalCurrency: productTaxes.originalCurrency,
  rateCurrency: productTaxes.rateCurrency,
  customDuty: productTaxes.customDuty,
  vat: productTaxes.vat,
  unitCustomDuty: productTaxes.getUnitCustomDuty(),
  unitVat: productTaxes.getUnitVat(),
  unitTaxes: productTaxes.getUnitTaxes(),
  notManagedProduct: productTaxes.notManagedProduct,
});

const serializeAmountProduct = (amountGroup: AmountGroup): SerializedAmountProduct => ({
  group: amountGroup.group,
  isOverMaximum: amountGroup.isOverMaximum,
  products: amountGroup.detailedShoppingProducts.map((detailedShoppingProduct) => ({
    amount: detailedShoppingProduct.getDefaultCurrencyValue(),
    amountProduct: detailedShoppingProduct.product?.amountProduct,
    customName: detailedShoppingProduct.shoppingProduct.customName,
    customId: detailedShoppingProduct.shoppingProduct.customId,
    name: detailedShoppingProduct.product?.name,
    id: detailedShoppingProduct.product?.id,
  })),
});

export const serializeSimulator = ({
  valueProducts,
  customProducts,
  amountProducts,
  franchiseAmount,
  canCalculateTaxes,
  canCreateDeclaration,
}: SerializedSimulatorOptions): SerializedSimulatorResponse => {
  const totalCustomDuty = valueProducts.reduce(
    (acc, productTaxes) => currency(acc).add(productTaxes.getUnitCustomDuty()).value,
    0,
  );
  const totalVat = valueProducts.reduce(
    (acc, productTaxes) => currency(acc).add(productTaxes.getUnitVat()).value,
    0,
  );
  return {
    valueProducts: valueProducts.map(serializeValueProduct),
    customProducts: customProducts.map(serializeValueProduct),
    amountProducts: amountProducts.map(serializeAmountProduct),
    total: [...valueProducts, ...customProducts].reduce(
      (total, productTaxes) => currency(total).add(productTaxes.unitPrice).value,
      0,
    ),
    totalCustomDuty,
    totalVat,
    totalTaxes: currency(totalCustomDuty).add(totalVat).value,
    franchiseAmount: franchiseAmount === Infinity ? '∞' : franchiseAmount,
    canCalculateTaxes,
    canCreateDeclaration,
  };
};
