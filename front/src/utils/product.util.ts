import type { Alpha2Code } from 'i18n-iso-countries';

import { CountryType, getCountryType } from './country.util';
import { AmountProduct, Product, ProductDisplayTypes } from '@/model/product';

export const findProduct = (products: Product[], id: string): Product | undefined => {
  let existingProduct;
  const stack: Product[] = [...products];

  while (stack.length > 0) {
    const product = stack.pop()!;
    if (product.id === id) {
      existingProduct = product;
      break;
    }
    if (product.subProducts.length > 0) {
      stack.push(...product.subProducts);
      // eslint-disable-next-line unused-imports/no-unused-vars
      const productFind = findProduct(product.subProducts, id);
      if (productFind) {
        existingProduct = productFind;
        break;
      }
    }
  }

  return existingProduct;
};

export const findProductTree = (products: Product[], id: string): Product[] => {
  const existingProduct: Product[] = [];
  const stack: Product[] = [...products];

  while (stack.length > 0) {
    const product = stack.pop()!;
    if (product.id === id) {
      existingProduct.push(product);
      break;
    }
    if (product.subProducts.length > 0) {
      stack.push(...product.subProducts);
      // eslint-disable-next-line unused-imports/no-unused-vars
      const productFind = findProductTree(product.subProducts, id);
      if (productFind.length > 0) {
        existingProduct.push(...productFind);
        existingProduct.push(product);
        break;
      }
    }
  }

  return existingProduct;
};

const filterCountryProducts = (product: Product, country: Alpha2Code): boolean => {
  if (product.countries.length === 0) {
    return true;
  }

  return product.countries.includes(country);
};

const filterSpecialProducts = (product: Product, age: number, country: Alpha2Code): boolean => {
  if (
    product.amountProduct === AmountProduct.tobaccoCategory ||
    product.amountProduct === AmountProduct.alcoholCategory
  ) {
    if (getCountryType(country) === CountryType.EU) {
      return age >= 18;
    }
    return age >= 17;
  }

  return true;
};

export const setupProductsToDisplay = (
  products: Product[],
  age: number,
  country: Alpha2Code,
): Product[] => {
  return products
    .filter((product) => filterCountryProducts(product, country))
    .filter((product) => filterSpecialProducts(product, age, country))
    .map((product) => {
      const newProduct = { ...product };
      // eslint-disable-next-line unused-imports/no-unused-vars
      newProduct.subProducts = setupProductsToDisplay(product.subProducts, age, country);
      return newProduct;
    });
};

export const haveAgeRestriction = (product: Product): boolean => {
  return (
    product.amountProduct === AmountProduct.cigarette ||
    product.amountProduct === AmountProduct.cigarillos ||
    product.amountProduct === AmountProduct.cigar ||
    product.amountProduct === AmountProduct.tobacco ||
    product.amountProduct === AmountProduct.softAlcohol ||
    product.amountProduct === AmountProduct.alcoholIntermediate ||
    product.amountProduct === AmountProduct.strongAlcohol ||
    product.amountProduct === AmountProduct.spiritDrink ||
    product.amountProduct === AmountProduct.beer ||
    product.amountProduct === AmountProduct.wine ||
    product.amountProduct === AmountProduct.sparklingWine
  );
};

export const checkIsFinalProduct = (product?: Product): boolean => {
  if (!product) {
    return false;
  }
  if (product.productDisplayTypes !== ProductDisplayTypes.category) {
    return true;
  }
  return false;
};
