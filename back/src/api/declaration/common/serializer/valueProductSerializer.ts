import { ProductDeclaration } from '../../../../entities/declaration.entity';

export interface SerializedValueProduct {
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

export const serializeValueProduct = (
  productTaxes: ProductDeclaration,
): SerializedValueProduct => ({
  id: productTaxes.id,
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
});
