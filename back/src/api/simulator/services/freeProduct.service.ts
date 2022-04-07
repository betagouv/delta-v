import { ProductTaxes, ProductTaxesInterface } from '../../../entities/productTaxes.entity';

interface SeparateFreeAndPaidProductsOptions {
  franchiseAmount: number;
  productsTaxes: ProductTaxesInterface[];
}

interface SeparateFreeAndPaidProductsResponse {
  freeProducts: ProductTaxesInterface[];
  paidProducts: ProductTaxesInterface[];
}

interface UnitProducts {
  id: string;
  price: number;
  taxes: number;
}

export const separateFreeAndPaidProducts = ({
  franchiseAmount,
  productsTaxes,
}: SeparateFreeAndPaidProductsOptions): SeparateFreeAndPaidProductsResponse => {
  const produitThatCanFitInFranchise = productsTaxes.filter(
    (productTaxesDetails) => productTaxesDetails.unitPrice <= franchiseAmount,
  );
  const produitThatCantFitInFranchise = productsTaxes.filter(
    (productTaxesDetails) => productTaxesDetails.unitPrice > franchiseAmount,
  );

  const unitProducts = getUnitProducts(produitThatCanFitInFranchise);
  const { fitProducts, notFitProducts } = getBestFitProducts(unitProducts, franchiseAmount);
  const freeProductsTaxDetails = mergeUnitProducts(fitProducts, productsTaxes);
  const notFreeProductsTaxDetails = mergeUnitProducts(notFitProducts, productsTaxes);

  return {
    freeProducts: freeProductsTaxDetails.map((product) => product.resetFreeTaxeDetails()),
    paidProducts: [...notFreeProductsTaxDetails, ...produitThatCantFitInFranchise],
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

const mergeUnitProducts = (
  unitProducts: UnitProducts[],
  productsTaxes: ProductTaxesInterface[],
): ProductTaxesInterface[] => {
  const mergedProductsTaxes: ProductTaxesInterface[] = [];
  unitProducts.forEach((unitProduct) => {
    const indexExistingProductTaxes = mergedProductsTaxes.findIndex(
      (productTaxes) =>
        productTaxes.id === unitProduct.id && productTaxes.unitPrice === unitProduct.price,
    );
    const productTaxes = productsTaxes.find(
      (productTaxes) =>
        productTaxes.id === unitProduct.id && productTaxes.unitPrice === unitProduct.price,
    );

    if (indexExistingProductTaxes !== -1) {
      mergedProductsTaxes[indexExistingProductTaxes].addProduct(1);
    } else if (productTaxes) {
      const newProductTaxes = new ProductTaxes({}).setFromProductTaxes(productTaxes);
      newProductTaxes.resetAmount();
      mergedProductsTaxes.push(newProductTaxes);
    }
  });

  return mergedProductsTaxes;
};

const getUnitProducts = (productsTaxesDetails: ProductTaxesInterface[]): UnitProducts[] => {
  return productsTaxesDetails.reduce(
    (accumulator: UnitProducts[], currentProduct: ProductTaxesInterface) => {
      for (let index = 0; index < currentProduct.amount; index++) {
        accumulator.push({
          id: currentProduct.id,
          price: currentProduct.unitPrice,
          taxes: currentProduct.getUnitTaxes(),
        });
      }

      return accumulator;
    },
    [],
  );
};

interface GetBestFitProductsResponse {
  fitProducts: UnitProducts[];
  notFitProducts: UnitProducts[];
}

const getBestFitProducts = (
  unitProducts: UnitProducts[],
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
