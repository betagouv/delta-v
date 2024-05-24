/* eslint-disable import/no-cycle */

import type { Alpha2Code } from 'i18n-iso-countries';

import { StoreSlice } from '../store';
import { getAllProductRequest } from '@/api/lib/products';
import { Product, ProductDisplayTypes } from '@/model/product';
import { findProduct, findProductTree, setupProductsToDisplay } from '@/utils/product.util';
import { advancedSearch, SearchType } from '@/utils/search';

export interface ProductsUseCaseSlice {
  findProduct: (id: string) => Product | undefined;
  findProductTree: (id: string) => Product[];
  findProductTreeSteps: (id: string) => Product[];
  searchProducts: (searchValue: string) => SearchType<Product>[];
  searchNomenclatureProducts: (searchValue: string) => SearchType<Product>[];
  searchAllProducts: (searchValue: string) => SearchType<Product>[];
  getProductsResponse: () => Promise<void>;
  setProductsSimulatorToDisplay: () => void;
  setProductsNomenclatureToDisplay: (country: Alpha2Code) => void;
  setCountryForProductsNomenclature: (country: Alpha2Code | undefined) => void;
  setProductsDeclarationToDisplay: () => void;
  setProductsDeclarationToDisplayAgent: () => void;
  setProductsNomenclatureToDisplayAgent: (country: Alpha2Code) => void;
  setFavoriteProducts: (favorites: Product[]) => void;
  addFavoriteProducts: (favorite: Product) => void;
  removeFavoriteProducts: (id: string) => void;
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
  findProductTreeSteps: (id: string) => {
    const productTree = findProductTree(get().products.appState.products, id);
    const productWithoutCategory = productTree.filter(
      (product) => product.productDisplayTypes !== ProductDisplayTypes.category,
    );
    if (productWithoutCategory.length > 0) {
      return productWithoutCategory.reverse();
    }
    return productTree;
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
  setProductsSimulatorToDisplay: () => {
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
  setProductsNomenclatureToDisplay: (country: Alpha2Code) => {
    const { allProducts } = get().products.appState;

    set((state: any) => {
      const newState = { ...state };
      newState.products.appState.nomenclatureProducts = setupProductsToDisplay(
        allProducts,
        18,
        country,
      );

      newState.products.appState.flattenNomenclatureProducts = getFlattenProducts(
        newState.products.appState.nomenclatureProducts ?? [],
      );
      return newState;
    });
  },
  setCountryForProductsNomenclature: (country: Alpha2Code | undefined) => {
    const { allProducts } = get().products.appState;
    set((state: any) => {
      const newState = { ...state };
      newState.products.appState.countryForProductsNomenclature = country;
      if (country) {
        newState.products.appState.products = setupProductsToDisplay(allProducts, 18, country);
      }
      return newState;
    });
  },
  setProductsDeclarationToDisplay: () => {
    const { contactDetails, meansOfTransportAndCountry } =
      get().declaration.appState.declarationRequest;
    const { allProducts } = get().products.appState;

    set((state: any) => {
      if (contactDetails.age === undefined || !meansOfTransportAndCountry.country) {
        return state;
      }
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
  setProductsDeclarationToDisplayAgent: () => {
    const { contactDetails, meansOfTransportAndCountry } =
      get().declaration.appState.declarationAgentRequest;
    const { allProducts } = get().products.appState;

    set((state: any) => {
      if (contactDetails.age === undefined || !meansOfTransportAndCountry.country) {
        return state;
      }
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
  setProductsNomenclatureToDisplayAgent: (country: Alpha2Code) => {
    const { allProducts } = get().products.appState;

    set((state: any) => {
      const newState = { ...state };
      newState.products.appState.products = setupProductsToDisplay(allProducts, 18, country);
      newState.products.appState.flattenProducts = getFlattenProducts(
        newState.products.appState.products,
      );
      return newState;
    });
  },
  setFavoriteProducts: (favorites: Product[]) => {
    set((state: any) => {
      const newState = { ...state };
      newState.products.appState.favoriteProducts = favorites;
      return newState;
    });
  },
  addFavoriteProducts: (favorite: Product) => {
    set((state: any) => {
      const newState = { ...state };

      newState.products.appState.favoriteProducts.push(favorite);
      return newState;
    });
  },
  removeFavoriteProducts: (id: string) => {
    set((state: any) => {
      const newState = { ...state };

      const newFavoriteProducts = newState.products.appState.favoriteProducts.filter(
        (favorite: Product) => favorite.id !== id,
      );
      newState.products.appState.favoriteProducts = newFavoriteProducts;
      return newState;
    });
  },
  searchProducts: (searchValue: string) => {
    const products = get().products.appState.flattenProducts;
    return advancedSearch({
      minRankAllowed: 0.15,
      searchValue,
      searchList: products,
      searchKey: ['relatedWords'],
    });
  },
  searchNomenclatureProducts: (searchValue: string) => {
    const products = get().products.appState.flattenNomenclatureProducts;
    return advancedSearch({
      minRankAllowed: 0.15,
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
