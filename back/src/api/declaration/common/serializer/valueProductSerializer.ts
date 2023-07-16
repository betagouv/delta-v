import { ProductDeclaration, ProductStatus } from '../../../../entities/declaration.entity';
import { AmountProduct } from '../../../common/services/amountProducts/globalAmount.service';

export interface SerializedValueProduct {
  id?: string;
  status: ProductStatus;
  amountProduct?: AmountProduct;
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

export const serializeValueProduct = (
  productTaxes: ProductDeclaration,
): SerializedValueProduct => ({
  id: productTaxes.id,
  status: productTaxes.status,
  amountProduct: productTaxes.amountProduct,
  name: productTaxes.name,
  customId: productTaxes.customId,
  customName: productTaxes.customName,
  unitPrice: productTaxes.value,
  originalPrice: productTaxes.originalValue,
  originalCurrency: productTaxes.currency,
  rateCurrency: productTaxes.rateCurrency,
  customDuty: productTaxes.customDuty,
  vat: productTaxes.vat,
  unitCustomDuty: productTaxes.calculatedCustomDuty,
  unitVat: productTaxes.calculatedVat,
  unitTaxes: productTaxes.calculatedTaxes,
  notManagedProduct: productTaxes.notManagedProduct,
});
