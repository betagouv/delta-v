import { ProductTaxesInterface } from '../../../../entities/productTaxes.entity';

interface SeparateFreeAndPaidProductsOptions {
  franchiseAmount: number;
  productsTaxes: ProductTaxesInterface[];
}

interface SeparateFreeAndPaidProductsResponse {
  freeProducts: ProductTaxesInterface[];
  paidProducts: ProductTaxesInterface[];
}

interface SimpleProduct {
  id: string;
  customName?: string;
  price: number;
  taxes: number;
}

export const separateFreeAndPaidProducts = ({
  franchiseAmount,
  productsTaxes,
}: SeparateFreeAndPaidProductsOptions): SeparateFreeAndPaidProductsResponse => {
  const productThatCanFitInFranchise = productsTaxes.filter(
    (productTaxesDetails) => productTaxesDetails.unitPrice <= franchiseAmount,
  );
  const productThatCantFitInFranchise = productsTaxes.filter(
    (productTaxesDetails) => productTaxesDetails.unitPrice > franchiseAmount,
  );

  const simpleProducts: SimpleProduct[] = productThatCanFitInFranchise.map(
    (productTaxesDetails) => ({
      id: productTaxesDetails.customId,
      customName: productTaxesDetails.customName,
      price: productTaxesDetails.unitPrice * 100,
      taxes: productTaxesDetails.getUnitTaxes(),
    }),
  );
  const { fitProducts, notFitProducts } = getBestFitProducts(simpleProducts, franchiseAmount * 100);
  const freeProductsTaxDetails = mergeSimpleProducts(fitProducts, productThatCanFitInFranchise);
  const notFreeProductsTaxDetails = mergeSimpleProducts(
    notFitProducts,
    productThatCanFitInFranchise,
  );

  return {
    freeProducts: freeProductsTaxDetails.map((product) => product.resetFreeTaxesDetails()),
    paidProducts: [...notFreeProductsTaxDetails, ...productThatCantFitInFranchise],
  };
};

export const manageFreeProducts = ({
  franchiseAmount,
  productsTaxes,
}: SeparateFreeAndPaidProductsOptions): ProductTaxesInterface[] => {
  const { freeProducts, paidProducts } = separateFreeAndPaidProducts({
    franchiseAmount,
    productsTaxes,
  });

  return [...freeProducts, ...paidProducts];
};

const mergeSimpleProducts = (
  simpleProducts: SimpleProduct[],
  productsTaxes: ProductTaxesInterface[],
): ProductTaxesInterface[] => {
  return simpleProducts.map((simpleProduct) => {
    return productsTaxes.find((productTaxes) => productTaxes.customId === simpleProduct.id);
  }) as ProductTaxesInterface[];
};

interface GetBestFitProductsResponse {
  fitProducts: SimpleProduct[];
  notFitProducts: SimpleProduct[];
}

const getBestFitProducts = (
  unitProducts: SimpleProduct[],
  franchiseAmount: number,
): GetBestFitProductsResponse => {
  let idxItem = 0,
    idxWeight = 0,
    oldMax = 0,
    newMax = 0;

  const numItems = unitProducts.length,
    weightMatrix: number[][] = new Array(numItems + 1),
    keepMatrix: number[][] = new Array(numItems + 1),
    solutionSet = [],
    notSolutionSet = [];

  // Setup matrices
  for (idxItem = 0; idxItem < numItems + 1; idxItem++) {
    weightMatrix[idxItem] = new Array(franchiseAmount + 1);
    keepMatrix[idxItem] = new Array(franchiseAmount + 1);
  }

  // Build weightMatrix from [0][0] -> [numItems-1][capacity-1]
  for (idxItem = 0; idxItem <= numItems; idxItem++) {
    for (idxWeight = 0; idxWeight <= franchiseAmount; idxWeight++) {
      // Fill top row and left column with zeros
      if (idxItem === 0 || idxWeight === 0) {
        weightMatrix[idxItem][idxWeight] = 0;
      }

      // If item will fit, decide if there's greater value in keeping it,
      // or leaving it
      else if (unitProducts[idxItem - 1].price <= idxWeight) {
        newMax =
          unitProducts[idxItem - 1].taxes +
          weightMatrix[idxItem - 1][idxWeight - unitProducts[idxItem - 1].price];
        oldMax = weightMatrix[idxItem - 1][idxWeight];

        // Update the matrices
        if (newMax > oldMax) {
          weightMatrix[idxItem][idxWeight] = newMax;
          keepMatrix[idxItem][idxWeight] = 1;
        } else {
          weightMatrix[idxItem][idxWeight] = oldMax;
          keepMatrix[idxItem][idxWeight] = 0;
        }
      }

      // Else, item can't fit; value and weight are the same as before
      else {
        weightMatrix[idxItem][idxWeight] = weightMatrix[idxItem - 1][idxWeight];
      }
    }
  }

  // Traverse through keepMatrix ([numItems][capacity] -> [1][?])
  // to create solutionSet
  idxWeight = franchiseAmount;
  idxItem = numItems;
  for (idxItem; idxItem > 0; idxItem--) {
    if (keepMatrix[idxItem][idxWeight] === 1) {
      solutionSet.push(unitProducts[idxItem - 1]);
      idxWeight = idxWeight - unitProducts[idxItem - 1].price;
    } else {
      notSolutionSet.push(unitProducts[idxItem - 1]);
    }
  }

  return {
    fitProducts: solutionSet,
    notFitProducts: notSolutionSet,
  };
};
