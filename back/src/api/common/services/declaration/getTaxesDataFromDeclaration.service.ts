import currency from 'currency.js';
import { TaxesData } from '../../../../entities/declaration.entity';
import { Declaration } from '../../../common/services/declaration';
import { getRoundedNumber } from '../../../../utils/roundedNumber';

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

  const totalTaxesValueAmount = currency(totalCustomDutyAmount).add(totalVatAmount).value;
  const totalTaxesValueRoundedAmount = getRoundedNumber(
    currency(totalCustomDutyAmount).add(totalVatRoundedAmount).value,
  );

  return {
    totalCustomDutyAmount,
    totalVatAmount,
    franchiseAmount: declaration.franchiseAmount,
    totalTaxesValueAmount,
    totalTaxesValueRoundedAmount,
    totalTobaccoTaxAmount: declaration.tobaccoTaxAmount,
    totalAlcoholTaxAmount: declaration.alcoholTaxAmount,
    totalTobaccoTaxRoundedAmount: getRoundedNumber(declaration.tobaccoTaxRoundedAmount),
    totalTaxesRoundedAmount: getRoundedNumber(
      currency(totalCustomDutyAmount)
        .add(totalTaxesValueRoundedAmount)
        .add(declaration.alcoholTaxRoundedAmount)
        .add(declaration.tobaccoTaxRoundedAmount).value,
    ),
    totalTaxesAmount: currency(totalCustomDutyAmount)
      .add(totalTaxesValueAmount)
      .add(declaration.tobaccoTaxAmount)
      .add(declaration.alcoholTaxAmount).value,
    totalAlcoholTaxRoundedAmount: getRoundedNumber(declaration.alcoholTaxRoundedAmount),
    totalAmount: declaration.total,
  };
};
