import currency from 'currency.js';
import { TaxesData } from '../../../../entities/declaration.entity';
import { Declaration } from '../../../common/services/declaration';

export const getTaxesDataFromDeclaration = (declaration: Declaration): TaxesData => {
  const valueProducts = declaration.getRealProductsTaxes();

  const totalCustomDutyAmount = valueProducts.reduce(
    (acc, productTaxes) => currency(acc).add(productTaxes.getUnitCustomDuty()).value,
    0,
  );
  const totalVatAmount = valueProducts.reduce(
    (acc, productTaxes) => currency(acc).add(productTaxes.getUnitVat()).value,
    0,
  );
  const totalVatRoundedAmount = valueProducts.reduce(
    (acc, productTaxes) => currency(acc).add(productTaxes.getUnitVatRounded()).value,
    0,
  );

  const totalTaxesAmount = currency(totalCustomDutyAmount).add(totalVatAmount).value;
  const totalTaxesValueRoundedAmount =
    currency(totalCustomDutyAmount).add(totalVatRoundedAmount).value;

  return {
    totalCustomDutyAmount,
    totalVatAmount,
    franchiseAmount: declaration.franchiseAmount,
    totalTaxesRoundedAmount:
      totalTaxesValueRoundedAmount +
      declaration.alcoholTaxRoundedAmount +
      declaration.tobaccoTaxRoundedAmount,
    totalTaxesAmount:
      totalTaxesAmount + declaration.alcoholTaxAmount + declaration.tobaccoTaxAmount,
    totalTobaccoTaxAmount: declaration.tobaccoTaxAmount,
    totalAlcoholTaxAmount: declaration.alcoholTaxAmount,
    totalTobaccoTaxRoundedAmount: declaration.tobaccoTaxRoundedAmount,
    totalAlcoholTaxRoundedAmount: declaration.alcoholTaxRoundedAmount,
    totalTaxesValueAmount: totalCustomDutyAmount + totalVatAmount,
    totalTaxesValueRoundedAmount,
    totalAmount: declaration.total,
  };
};
