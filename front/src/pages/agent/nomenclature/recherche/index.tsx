import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';

import { useCreateFavoriteMutation } from '@/api/hooks/useAPIFavorite';
import {
  FormAddFavoriteData,
  ModalAddFavoriteProduct,
} from '@/components/autonomous/ModalAddFavoriteProduct/ModalAddFavoriteProduct';
import { ModalCategoryNomenclatureProduct } from '@/components/autonomous/ModalCategoryNomenclatureProduct';
import { ModalSelectCountry } from '@/components/autonomous/ModalSelectCountry';
import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { NomenclatureCard } from '@/components/business/NomenclatureCard';
import { Typography } from '@/components/common/Typography';
import { declarationAgent } from '@/core/hoc/declarationAgent.hoc';
import { Meta } from '@/layout/Meta';
import { Product } from '@/model/product';
import { useStore } from '@/stores/store';
import { MainAgent } from '@/templates/MainAgent';

const SearchProduct = () => {
  const { findProduct, searchNomenclatureProducts, addFavoriteProducts } = useStore(
    (state) => ({
      findProduct: state.findProduct,
      searchNomenclatureProducts: state.searchNomenclatureProducts,
      addFavoriteProducts: state.addFavoriteProducts,
    }),
    shallow,
  );

  const router = useRouter();

  const { search, selectedId }: { search?: string; selectedId?: string } = router.query;

  const [openCategoryDownModal, setOpenCategoryDownModal] = useState<boolean>(false);
  const [productsThatMatch, setProductsThatMatch] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);

  const [value, setValue] = useState('');
  const [openModalAddFavorite, setOpenModalAddFavorite] = useState(false);

  const setupSearchProductResults = (): void => {
    if (!selectedId) {
      setProductsThatMatch(searchNomenclatureProducts((search as string) ?? ''));
      return;
    }

    const reducedProductsThatMatch = searchNomenclatureProducts((search as string) ?? '');
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

  useEffect(() => {
    if (selectedId) {
      setSelectedProduct(findProduct(selectedId));
      setOpenCategoryDownModal(true);
    }
  }, [selectedId]);

  useEffect(() => {
    setupSearchProductResults();
  }, [selectedId, search]);

  const onCloseModalAddFavorite = () => {
    setOpenModalAddFavorite(false);
    setValue('');
  };

  const createFavoriteMutation = useCreateFavoriteMutation({
    onSuccess: () => {},
  });

  const onClickFavorite = (product: Product) => {
    setSelectedProduct(product);
    setOpenCategoryDownModal(false);
    setOpenModalAddFavorite(true);
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
    setValue(data.name);
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
          <div className="flex flex-row justify-between items-center">
            <Typography size="text-sm" color="black">
              {`${productsThatMatch.length} résultat${
                productsThatMatch.length > 1 ? 's' : ''
              } pour "${search}"`}
            </Typography>
            <ModalSelectCountry />
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
        <ModalCategoryNomenclatureProduct
          open={openCategoryDownModal}
          onClose={() => setOpenCategoryDownModal(false)}
          onOpen={() => setOpenCategoryDownModal(true)}
          defaultProduct={selectedProduct}
        />

        <ModalAddFavoriteProduct
          open={openModalAddFavorite}
          onClose={onCloseModalAddFavorite}
          onSubmit={onSubmit}
          value={value}
        />
      </MainAgent>
    </AgentRoute>
  );
};
export default declarationAgent(SearchProduct);
