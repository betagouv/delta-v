import currency from 'currency.js';
import { ProductTaxesInterface } from '../../entities/productTaxes.entity';
import { AmountGroup } from './services/amountProducts/globalAmount.service';

interface SerializedValueProduct {
  id: string;
  name: string;
  customId: string;
  customName?: string;
  customDuty: number;
  vat: number;
  unitPrice: number;
  unitCustomDuty: number;
  unitVat: number;
  unitTaxes: number;
}

interface SerializedAmountProduct {
  group: string;
  products: {
    id: string;
    name: string;
    customName?: string;
    customId: string;
    amount: number;
  }[];
  isOverMaximum: boolean;
}

interface SerializedSimulatorOptions {
  valueProducts: ProductTaxesInterface[];
  amountProducts: AmountGroup[];
  franchiseAmount: number;
}

interface SerializedSimulatorResponse {
  valueProducts?: SerializedValueProduct[];
  amountProducts?: SerializedAmountProduct[];
  total: number;
  totalCustomDuty: number;
  totalVat: number;
  totalTaxes: number;
  franchiseAmount: number | string;
}

const serializeValueProduct = (productTaxes: ProductTaxesInterface): SerializedValueProduct => ({
  id: productTaxes.id,
  name: productTaxes.name,
  customId: productTaxes.customId,
  customName: productTaxes.customName,
  unitPrice: productTaxes.unitPrice,
  customDuty: productTaxes.customDuty,
  vat: productTaxes.vat,
  unitCustomDuty: productTaxes.getUnitCustomDuty(),
  unitVat: productTaxes.getUnitVat(),
  unitTaxes: productTaxes.getUnitTaxes(),
});

const serializeAmountProduct = (amountGroup: AmountGroup): SerializedAmountProduct => ({
  group: amountGroup.group,
  isOverMaximum: amountGroup.isOverMaximum,
  products: amountGroup.completeShoppingProducts.map((completeShoppingProduct) => ({
    amount: completeShoppingProduct.value,
    customName: completeShoppingProduct.customName,
    customId: completeShoppingProduct.customId,
    name: completeShoppingProduct.product.name,
    id: completeShoppingProduct.id,
  })),
});

export const serializeSimulator = ({
  valueProducts,
  amountProducts,
  franchiseAmount,
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
    amountProducts: amountProducts.map(serializeAmountProduct),
    total: valueProducts.reduce(
      (total, productTaxes) => currency(total).add(productTaxes.unitPrice).value,
      0,
    ),
    totalCustomDuty,
    totalVat,
    totalTaxes: currency(totalCustomDuty).add(totalVat).value,
    franchiseAmount: franchiseAmount === Infinity ? '∞' : franchiseAmount,
  };
};
