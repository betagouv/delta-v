/* eslint-disable import/no-cycle */

import { StoreSlice } from '../store';
import { getAllProductRequest } from '@/api/lib/products';
import { Product } from '@/model/product';
import { findProduct, findProductTree, setupProductsToDisplay } from '@/utils/product.util';
import { advancedSearch, SearchType } from '@/utils/search';

export interface ProductsUseCaseSlice {
  findProduct: (id: string) => Product | undefined;
  findProductTree: (id: string) => Product[] | undefined;
  searchProducts: (searchValue: string) => SearchType<Product>[];
  searchAllProducts: (searchValue: string) => SearchType<Product>[];
  getProductsResponse: () => Promise<void>;
  setProductsToDisplay: () => void;
  setProductsDeclarationToDisplay: () => void;
}

const getFlattenProducts = (products: Product[]): Product[] => {
  let subProducts: Product[] = [];

  return products
    .map((product) => {
      const p = { ...product }; // use spread operator
      if (p.subProducts && p.subProducts.length) {
        subProducts = [...subProducts, ...p.subProducts];
      }
      p.subProducts = [];
      return p;
    })
    .concat(subProducts.length ? getFlattenProducts(subProducts) : subProducts)
    .map((product) => {
      const p = { ...product };
      p.related = product.relatedWords.join(',');
      return p;
    });
};

export const createUseCaseProductSlice: StoreSlice<ProductsUseCaseSlice> = (set, get) => ({
  findProduct: (id: string) => {
    return findProduct(get().products.appState.products, id);
  },
  findProductTree: (id: string) => {
    return findProductTree(get().products.appState.products, id);
  },
  getProductsResponse: async () => {
    const allProducts = await getAllProductRequest();

    set((state: any) => {
      const newState = { ...state };
      newState.products.appState.allProducts = allProducts;

      newState.products.appState.flattenAllProducts = getFlattenProducts(
        newState.products.appState.allProducts,
      );
      return newState;
    });
  },
  setProductsToDisplay: () => {
    const { age, country } = get().simulator.appState.simulatorRequest;
    const { allProducts } = get().products.appState;

    if (!age || !country) {
      return;
    }

    set((state: any) => {
      const newState = { ...state };
      newState.products.appState.products = setupProductsToDisplay(allProducts, age, country);
      newState.products.appState.flattenProducts = getFlattenProducts(
        newState.products.appState.products,
      );
      return newState;
    });
  },
  setProductsDeclarationToDisplay: () => {
    const { contactDetails, meansOfTransportAndCountry } =
      get().declaration.appState.declarationRequest;
    const { allProducts } = get().products.appState;

    if (!contactDetails || !meansOfTransportAndCountry) {
      return;
    }

    set((state: any) => {
      const newState = { ...state };
      newState.products.appState.products = setupProductsToDisplay(
        allProducts,
        contactDetails.age,
        meansOfTransportAndCountry.country,
      );
      newState.products.appState.flattenProducts = getFlattenProducts(
        newState.products.appState.products,
      );
      return newState;
    });
  },
  searchProducts: (searchValue: string) => {
    const products = get().products.appState.flattenProducts;
    return advancedSearch({
      searchValue,
      searchList: products,
      searchKey: ['relatedWords'],
    });
  },
  searchAllProducts: (searchValue: string) => {
    const products = get().products.appState.flattenAllProducts;
    return advancedSearch({ searchValue, searchList: products, searchKey: ['relatedWords'] });
  },
});
