import { useEffect, useState } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

import { AddProductToFavorites } from '@/components/autonomous/AddProductToFavorites';
import { ModalSelectCountry } from '@/components/autonomous/ModalSelectCountry';
import { OnAddProductOptions } from '@/components/business/FormSelectProduct';
import { ProductSearchTools } from '@/components/business/ProductSearchTools/desktop';
import { ProductSearchBarStyle } from '@/components/business/ProductSearchTools/enum';
import { CategoryList, Item } from '@/components/common/CategoryList';
import CenterModal from '@/components/common/CenterModal';
import { NavBar } from '@/components/common/NavBar';
import { SvgNames } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';
import { Product } from '@/model/product';
import { ShoppingProduct } from '@/stores/simulator/appState.store';
import { useStore } from '@/stores/store';
import { MAIN_MENU_AGENT_ITEMS } from '@/utils/const';

interface DisplayedProduct {
  id: string;
  svgNames: SvgNames;
  title: string;
}

const NomenclatureAgentDesktop = () => {
  const { findProduct, findProductTree, addProductCartDeclarationAgent, products } = useStore(
    (state) => ({
      findProduct: state.findProduct,
      findProductTree: state.findProductTree,
      addProductCartDeclarationAgent: state.addProductCartDeclarationAgent,
      products: state.products.appState.products,
    }),
  );
  const router = useRouter();
  const path = router.pathname;

  const { trackEvent } = useMatomo();
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);

  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(undefined);
  const [productTree, setProductTree] = useState<Product[]>([]);
  const [showCategoryFilters, setShowCategoryFilters] = useState<boolean>(false);

  const defaultDisplayedProducts: DisplayedProduct[] = products?.map((product): Item => {
    return {
      id: product.id,
      svgNames: product.icon ?? 'categoryOther',
      title: product.name,
    };
  });
  const [displayedProducts, setDisplayedProducts] =
    useState<DisplayedProduct[]>(defaultDisplayedProducts);

  useEffect(() => {
    if (currentId) {
      const selectedProduct = findProduct(currentId);

      setProductTree(findProductTree(currentId));
      setCurrentProduct(selectedProduct);
      setDisplayedProducts(
        selectedProduct?.subProducts.map((product) => {
          return {
            id: product.id,
            svgNames: product.icon ?? 'categoryOther',
            title: product.name,
          };
        }) ?? [],
      );
    } else {
      setProductTree([]);
      setDisplayedProducts(defaultDisplayedProducts);
    }
  }, [currentId]);

  const onSelectProduct = (idSelected: string) => {
    setCurrentId(idSelected);
  };

  const onAddProduct = ({ product, value, currency, name }: OnAddProductOptions) => {
    const shoppingProduct: ShoppingProduct = {
      id: uuidv4(),
      productId: product.id,
      name,
      value: parseFloat(value),
      amount: 1,
      currency: currency ?? 'EUR',
    };

    addProductCartDeclarationAgent(shoppingProduct);
    trackEvent({ category: 'user-action', action: 'add-product', name: product.name });
  };

  const onParentCategoryClick = () => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    setCurrentId(productTree?.[1]?.id);
  };

  const isFinalProduct = currentProduct?.finalProduct;

  return (
    <>
      <div className="flex flex-col pl-[103px] pr-20 gap-[14px] border-b">
        <NavBar links={MAIN_MENU_AGENT_ITEMS} activePath={path} />
      </div>
      <div className="flex flex-col px-[126px] pt-[60px] gap-[30px]">
        <Typography size="text-3xl">Nomenclature</Typography>
        <ProductSearchTools
          variant={ProductSearchBarStyle.NOMENCLATURE}
          onFilterByCategoryClick={() => setShowCategoryFilters(!showCategoryFilters)}
        />
        <div className="flex flex-col relative w-full h-full">
          {showCategoryFilters && (
            <>
              {isFinalProduct ? (
                <CenterModal open={true} noMargin>
                  <AddProductToFavorites
                    currentProduct={currentProduct}
                    onAddProduct={onAddProduct}
                    onRemoveProduct={() => console.log('removed')}
                    onSelectProduct={onSelectProduct}
                  />
                </CenterModal>
              ) : (
                <div>
                  <CategoryList
                    onSelectProduct={onSelectProduct}
                    productTree={productTree}
                    items={displayedProducts}
                    displayType="card"
                    onClick={onParentCategoryClick}
                    bigSize
                  />
                </div>
              )}
            </>
          )}
          <div className="absolute right-0">
            <ModalSelectCountry />
          </div>
        </div>
      </div>
    </>
  );
};

export { NomenclatureAgentDesktop };
