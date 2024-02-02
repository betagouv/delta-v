import { useEffect, useState } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import shallow from 'zustand/shallow';

import { useCreateFavoriteMutation } from '@/api/hooks/useAPIFavorite';
import { usePutSearchProductHistoryMutation } from '@/api/hooks/useAPIProducts';
import { CategoryProductMobile } from '@/components/autonomous/CategoryProduct';
import {
  FormAddFavoriteData,
  ModalAddFavoriteProduct,
} from '@/components/autonomous/ModalAddFavoriteProduct/ModalAddFavoriteProduct';
import { ModalAddProductCartDeclaration } from '@/components/autonomous/ModalAddProductCartDeclaration';
import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { OnAddProductOptions } from '@/components/business/FormSelectProduct';
import { NomenclatureCard } from '@/components/business/NomenclatureCard';
import { Typography } from '@/components/common/Typography';
import { declarationAgent } from '@/core/hoc/declarationAgent.hoc';
import { Meta } from '@/layout/Meta';
import { Product } from '@/model/product';
import { ShoppingProduct } from '@/stores/simulator/appState.store';
import { useStore } from '@/stores/store';
import { MainAgent } from '@/templates/MainAgent';

const SearchProduct = () => {
  const [openModalAddProduct, setOpenModalAddProduct] = useState<boolean>(false);
  const { trackEvent } = useMatomo();
  const {
    addProductCartDeclarationAgent,
    searchProducts,
    findProduct,
    defaultCurrency,
    addFavoriteProducts,
  } = useStore(
    (state) => ({
      findProduct: state.findProduct,
      addProductCartDeclarationAgent: state.addProductCartDeclarationAgent,
      searchProducts: state.searchProducts,
      addFavoriteProducts: state.addFavoriteProducts,
      defaultCurrency: state.declaration.appState.declarationAgentRequest.defaultCurrency,
    }),
    shallow,
  );

  const router = useRouter();

  const { search, selectedId }: { search?: string; selectedId?: string } = router.query;

  const [openCategoryDownModal, setOpenCategoryDownModal] = useState<boolean>(false);
  const [productsThatMatch, setProductsThatMatch] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [favoriteValue, setFavoriteValue] = useState('');
  const [openModalAddFavorite, setOpenModalAddFavorite] = useState(false);
  const updateSearchProductHistory = usePutSearchProductHistoryMutation({});

  const setupSearchProductResults = (): void => {
    if (!selectedId) {
      setProductsThatMatch(searchProducts((search as string) ?? ''));
      return;
    }

    const reducedProductsThatMatch = searchProducts((search as string) ?? '');
    const searchProductsWithoutSelectedProduct = reducedProductsThatMatch.filter(
      (product) => product.id !== selectedId,
    );

    const productOnTop = findProduct(selectedId);

    if (!productOnTop) {
      setProductsThatMatch(searchProductsWithoutSelectedProduct);
      return;
    }

    setProductsThatMatch([productOnTop, ...searchProductsWithoutSelectedProduct]);
  };

  const createFavoriteMutation = useCreateFavoriteMutation({
    onSuccess: () => {},
  });

  const onClickFavorite = (product: Product) => {
    setSelectedProduct(product);
    setOpenCategoryDownModal(false);
    setOpenModalAddFavorite(true);
  };

  const onCloseModalAddFavorite = () => {
    setOpenModalAddFavorite(false);
    setFavoriteValue('');
  };

  const onSubmit = (data: FormAddFavoriteData) => {
    if (!selectedProduct) {
      return;
    }
    addFavoriteProducts({ ...selectedProduct, name: data.name });
    createFavoriteMutation.mutate({
      productId: selectedProduct?.id,
      name: data.name,
    });
    setFavoriteValue(data.name);
  };

  useEffect(() => {
    if (selectedId) {
      setSelectedProduct(findProduct(selectedId));
      setOpenCategoryDownModal(true);
    }
  }, [selectedId]);

  useEffect(() => {
    setupSearchProductResults();
  }, [selectedId, search]);

  const onAddProduct = ({ product, value, currency, name, customName }: OnAddProductOptions) => {
    const shoppingProduct: ShoppingProduct = {
      id: uuidv4(),
      productId: product.id,
      name,
      value: parseFloat(value),
      amount: 1,
      currency: currency ?? 'EUR',
    };

    addProductCartDeclarationAgent(shoppingProduct);
    updateSearchProductHistory.mutate({ productId: product.id, searchValue: customName });
    trackEvent({ category: 'user-action', action: 'add-product', name: product.name });
    setOpenCategoryDownModal(false);
    setOpenModalAddProduct(false);
    router.push(`/agent/declaration/ajout/marchandises`);
  };

  const onClickProduct = (product: Product) => {
    setSelectedProduct(product);
    setOpenCategoryDownModal(true);
  };

  return (
    <AgentRoute>
      <MainAgent
        meta={
          <Meta
            title="Simulateur Déclare Douanes"
            description="Simuler la déclaration de douane en quelques clics"
          />
        }
        withTitle
        titleHeader="Recherche"
      >
        <div className="flex flex-1 flex-col border-t border-secondary-300 py-4 mx-5">
          <div className="">
            <Typography size="text-sm" color="black">
              {`${productsThatMatch.length} résultat${
                productsThatMatch.length > 1 ? 's' : ''
              } pour "${search}"`}
            </Typography>
          </div>
          <div className="flex flex-1 flex-col gap-4 mt-2">
            {productsThatMatch?.map((product) => (
              <NomenclatureCard
                key={product.id}
                product={product}
                onClick={onClickProduct}
                onAddFavorite={onClickFavorite}
                searchValue={search as string}
              />
            ))}
          </div>
        </div>
        <CategoryProductMobile
          open={openCategoryDownModal}
          onClose={() => setOpenCategoryDownModal(false)}
          onAddProduct={onAddProduct}
          defaultCurrency={defaultCurrency}
          defaultProduct={selectedProduct}
        />
        <ModalAddProductCartDeclaration
          open={openModalAddProduct}
          onClose={() => setOpenModalAddProduct(false)}
          onAddProduct={onAddProduct}
          currentProduct={selectedProduct}
          defaultCurrency={defaultCurrency}
        />

        <ModalAddFavoriteProduct
          open={openModalAddFavorite}
          onClose={onCloseModalAddFavorite}
          onSubmit={onSubmit}
          value={favoriteValue}
        />
      </MainAgent>
    </AgentRoute>
  );
};
export default declarationAgent(SearchProduct);
