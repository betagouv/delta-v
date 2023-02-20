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

  return {
    totalCustomDutyAmount,
    totalVatAmount,
    franchiseAmount: declaration.franchiseAmount,
    totalTaxesAmount: currency(totalCustomDutyAmount).add(totalVatAmount).value,
    totalAmount: declaration.total,
  };
};
