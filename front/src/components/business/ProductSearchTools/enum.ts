export enum ProductSearchBarStyle {
  DECLARATION = 'declaration',
  NOMENCLATURE = 'nomenclature',
}
export const getSearchPagePath = (variant: ProductSearchBarStyle): string | undefined => {
  switch (variant) {
    case ProductSearchBarStyle.DECLARATION:
      return '/agent/declaration/produits/recherche';
    case ProductSearchBarStyle.NOMENCLATURE:
      return '/agent/nomenclature/recherche';
    default:
      return undefined;
  }
};
