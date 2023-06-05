import { ProductDeclaration } from '../../../../entities/declaration.entity';
import { ProductTaxesInterface } from '../../../../entities/productTaxes.entity';
import { AmountGroup } from '../../../common/services/amountProducts/globalAmount.service';
import { Declaration } from '../../../common/services/declaration';
import { DetailedShoppingProduct } from '../../../common/services/detailedShoppingProduct';

const getProductDeclarationFromProductTaxes = (
  productTaxes: ProductTaxesInterface,
): ProductDeclaration => ({
  id: productTaxes.id,
  customId: productTaxes.customId,
  name: productTaxes.name,
  value: productTaxes.unitPrice,
  currency: productTaxes.originalCurrency,
  rateCurrency: productTaxes.rateCurrency,
  originalValue: productTaxes.originalPrice,
  calculatedCustomDuty: productTaxes.getUnitCustomDuty(),
  calculatedVat: productTaxes.getUnitVat(),
  calculatedTaxes: productTaxes.getUnitTaxes(),
  customName: productTaxes.customName,
  customDuty: productTaxes.customDuty,
  vat: productTaxes.vat,
});

const getProductsDeclarationFromDetailedShoppingProduct = (
  detailedShoppingProduct: DetailedShoppingProduct,
): ProductDeclaration => ({
  id: detailedShoppingProduct.product?.id,
  customId: detailedShoppingProduct.shoppingProduct.customId,
  customName: detailedShoppingProduct.shoppingProduct.customName,
  customDuty: 0,
  vat: 0,
  value: detailedShoppingProduct.shoppingProduct.originalValue,
  originalValue: detailedShoppingProduct.shoppingProduct.originalValue,
  currency: undefined,
  rateCurrency: 1,
  calculatedCustomDuty: 0,
  calculatedVat: 0,
  calculatedTaxes: 0,
  name: detailedShoppingProduct.product?.name,
});

const getProductsDeclarationsFromAmountGroup = (amountGroup: AmountGroup): ProductDeclaration[] =>
  amountGroup.detailedShoppingProducts.map(getProductsDeclarationFromDetailedShoppingProduct);

const getProductDeclarationFromAmountGroups = (amountGroups: AmountGroup[]): ProductDeclaration[] =>
  amountGroups.reduce(
    (acc: ProductDeclaration[], amountGroup) => [
      ...acc,
      ...getProductsDeclarationsFromAmountGroup(amountGroup),
    ],
    [],
  );

export const getProductsDeclarationFromDeclaration = (
  declaration: Declaration,
): ProductDeclaration[] => {
  const valueProducts = declaration.getRealProductsTaxes();
  const customProducts = declaration.uncompletedRealProductsTaxes;
  const amountProducts = declaration.getAmountProductsGrouped();

  const products: ProductDeclaration[] = [
    ...valueProducts.map(getProductDeclarationFromProductTaxes),
    ...customProducts.map(getProductDeclarationFromProductTaxes),
    ...getProductDeclarationFromAmountGroups(amountProducts),
  ];

  return products;
};
