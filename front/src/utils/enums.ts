export enum Constants {
  LIST_LIMIT = 20,
  TABLE_LIMIT = 8,
  MINI_TABLE_LIMIT = 5,
  SEE_MORE_LIMIT = 3,
  SEE_MORE_DECLARATION = 2,
}

export enum TailwindDefaultScreenSize {
  MOBILE = '640px',
  TABLET = '768px',
  DESKTOP = '1024px',
}

export enum ProductSearchContext {
  DECLARATION = 'declaration',
  NOMENCLATURE = 'nomenclature',
}
export const getSearchPagePath = (variant: ProductSearchContext): string | undefined => {
  switch (variant) {
    case ProductSearchContext.DECLARATION:
      return '/agent/declaration/produits/recherche';
    case ProductSearchContext.NOMENCLATURE:
      return '/agent/nomenclature/recherche';
    default:
      return undefined;
  }
};
