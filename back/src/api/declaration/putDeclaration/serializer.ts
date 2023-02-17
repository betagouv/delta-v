import { ProductTaxesInterface } from '../../../entities/productTaxes.entity';
import {
  AmountGroup,
  AmountProduct,
} from '../../common/services/amountProducts/globalAmount.service';
import { Declaration } from '../../common/services/declaration';
import { getTaxesDataFromDeclaration } from '../../common/services/declaration/getTaxesDataFromDeclaration.service';

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

interface SerializedSimulatorResponse {
  valueProducts?: SerializedValueProduct[];
  customProducts?: SerializedValueProduct[];
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
  originalPrice: productTaxes.originalPrice,
  originalCurrency: productTaxes.originalCurrency,
  rateCurrency: productTaxes.rateCurrency,
  customDuty: productTaxes.customDuty,
  vat: productTaxes.vat,
  unitCustomDuty: productTaxes.getUnitCustomDuty(),
  unitVat: productTaxes.getUnitVat(),
  unitTaxes: productTaxes.getUnitTaxes(),
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

export const serializeSimulator = (declaration: Declaration): SerializedSimulatorResponse => {
  const taxesData = getTaxesDataFromDeclaration(declaration);
  return {
    valueProducts: declaration.getRealProductsTaxes().map(serializeValueProduct),
    customProducts: declaration.uncompletedRealProductsTaxes.map(serializeValueProduct),
    amountProducts: declaration.getAmountProductsGrouped().map(serializeAmountProduct),
    total: taxesData.totalAmount,
    totalCustomDuty: taxesData.totalCustomDutyAmount,
    totalVat: taxesData.totalVatAmount,
    totalTaxes: taxesData.totalTaxesAmount,
    franchiseAmount: taxesData.franchiseAmount,
  };
};
