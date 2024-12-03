import currency from 'currency.js';
import { ProductTaxesInterface } from '../../../entities/productTaxes.entity';
import {
  AmountGroup,
  AmountProduct,
} from '../../common/services/amountProducts/globalAmount.service';
import {
  TobaccoTaxCalculator,
  TobaccoTaxDetail,
} from '../../common/services/tobacco/tobaccoTaxCalculator';
import {
  AlcoholTaxCalculator,
  AlcoholTaxDetail,
} from '../../common/services/alcohol/alcoholTaxCalculator';

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
  unitTaxesRounded: number;
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
}

interface SerializedSimulatorResponse {
  valueProducts?: SerializedValueProduct[];
  customProducts?: SerializedValueProduct[];
  amountProducts?: SerializedAmountProduct[];
  total: number;
  totalCustomDuty: number;
  totalVat: number;
  totalTaxes: number;
  totalTaxesRounded: number;
  franchiseAmount: number | string;
  canCalculateTaxes: boolean;
  totalTaxesValue: number;
  totalTaxesValueRounded: number;
  tobaccoTax?: number;
  tobaccoTaxRounded?: number;
  tobaccoTaxDetails?: TobaccoTaxDetail[];
  alcoholTax?: number;
  alcoholTaxRounded?: number;
  alcoholTaxDetails?: AlcoholTaxDetail[];
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
  unitTaxesRounded: productTaxes.getUnitTaxesRounded(),
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
}: SerializedSimulatorOptions): SerializedSimulatorResponse => {
  const totalCustomDuty = valueProducts.reduce(
    (acc, productTaxes) => currency(acc).add(productTaxes.getUnitCustomDuty()).value,
    0,
  );
  const totalVat = valueProducts.reduce(
    (acc, productTaxes) => currency(acc).add(productTaxes.getUnitVat()).value,
    0,
  );
  const totalVatRounded = valueProducts.reduce(
    (acc, productTaxes) => currency(acc).add(productTaxes.getUnitVatRounded()).value,
    0,
  );
  const totalTaxesValue = currency(totalCustomDuty).add(totalVat).value;
  const totalTaxesValueRounded = currency(totalCustomDuty).add(totalVatRounded).value;

  const allDetailedProducts = amountProducts.flatMap((group) => group.detailedShoppingProducts);
  const tobaccoTax = TobaccoTaxCalculator.calculateTax(allDetailedProducts);
  const tobaccoTaxRounded = TobaccoTaxCalculator.calculateRoundedTax(allDetailedProducts);
  const tobaccoTaxDetails = TobaccoTaxCalculator.calculateDetailedTaxes(allDetailedProducts);
  const alcoholTax = AlcoholTaxCalculator.calculateTax(allDetailedProducts);
  const alcoholTaxRounded = AlcoholTaxCalculator.calculateRoundedTax(allDetailedProducts);
  const alcoholTaxDetails = AlcoholTaxCalculator.calculateDetailedTaxes(allDetailedProducts);

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
    totalTaxesValue,
    totalTaxesValueRounded,
    totalTaxes: currency(totalCustomDuty).add(totalTaxesValue).add(tobaccoTax).add(alcoholTax)
      .value,
    totalTaxesRounded: currency(totalCustomDuty)
      .add(totalTaxesValueRounded)
      .add(tobaccoTaxRounded)
      .add(alcoholTaxRounded).value,
    franchiseAmount: franchiseAmount === Infinity ? '∞' : franchiseAmount,
    canCalculateTaxes,
    tobaccoTax,
    tobaccoTaxRounded,
    tobaccoTaxDetails,
    alcoholTax,
    alcoholTaxRounded,
    alcoholTaxDetails,
  };
};
