import { useState } from 'react';

import { Alpha2Code } from 'i18n-iso-countries';
import { useRouter } from 'next/router';

import { ModalCategoryNomenclatureProduct } from '@/components/autonomous/ModalCategoryNomenclatureProduct';
import { ModalSearchNomenclatureProduct } from '@/components/autonomous/ModalSearchNomenclatureProduct';
import { ModalSelectCountry } from '@/components/autonomous/ModalSelectCountry';
import { ModalUnderConstruction } from '@/components/autonomous/ModalUnderConstruction';
import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { Icon } from '@/components/common/Icon';
import { Typography } from '@/components/common/Typography';
import { Meta } from '@/layout/Meta';
import { Product } from '@/model/product';
import { MainAgent } from '@/templates/MainAgent';

export interface FormDeclarationData {
  country?: Alpha2Code;
}

const Nomenclature = () => {
  const router = useRouter();
  const [openSearchDownModal, setOpenSearchDownModal] = useState(false);
  const [openCategoryDownModal, setOpenCategoryDownModal] = useState(false);
  const [openFavoriteDownModal, setOpenFavoriteDownModal] = useState(false);

  const handleCloseDownModal = () => {
    setOpenSearchDownModal(false);
    setOpenCategoryDownModal(false);
    setOpenFavoriteDownModal(false);
  };

  const onClickProduct = (product: Product) => {
    setOpenSearchDownModal(false);
    router.push({
      pathname: '/agent/nomenclature/recherche',
      query: { id: product.id },
    });
  };

  const onSearchAll = (searchValue: string) => {
    setOpenSearchDownModal(false);
    router.push({
      pathname: '/agent/nomenclature/recherche',
      query: { search: searchValue },
    });
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
        withPadding
        titleHeader="Nomenclature"
      >
        <div className="p-5 bg-secondary-bg rounded-[10px]">
          <div className="mt-1" onClick={() => setOpenSearchDownModal(true)}>
            <div className={`flex flex-col`}>
              <div className="text-black flex flex-row items-center gap-2">
                <Icon name="search" size="sm" />
                <Typography color="black" size="text-base" weight="bold">
                  Recherche
                </Typography>
              </div>
              <div className="px-5 py-3 border border-secondary-100 bg-white rounded-full mt-[10px]">
                <Typography color="light-gray" size="text-sm" italic>
                  Type de marchandises, marques...
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-center gap-3 w-full mt-5">
          <button
            type="button"
            onClick={() => setOpenFavoriteDownModal(true)}
            className="gap-3 bg-primary-400 rounded-full px-5 py-2 text-white"
          >
            <div className="flex flex-row items-center gap-3">
              <Typography color="white" size="text-xs">
                Mes favoris
              </Typography>
              <Icon name="chevron-thin-down" size="sm" />
            </div>
          </button>
          <button
            onClick={() => setOpenCategoryDownModal(true)}
            type="button"
            className="border gap-3 bg-white border-gray-300 rounded-full flex-1 flex justify-center items-center"
          >
            <div className="flex flex-row items-center gap-3">
              <Typography color="black" weight="bold" size="text-xs">
                Filtrer par catégories
              </Typography>
              <Icon name="chevron-down" size="sm" />
            </div>
          </button>
        </div>
        <div className="flex flex-row justify-end w-full mt-[30px] border-t pt-5">
          <ModalSelectCountry />
        </div>

        <ModalSearchNomenclatureProduct
          open={openSearchDownModal}
          onClose={handleCloseDownModal}
          onClickProduct={onClickProduct}
          onSearchAll={onSearchAll}
        />
        <ModalCategoryNomenclatureProduct
          open={openCategoryDownModal}
          onClose={handleCloseDownModal}
        />
        <ModalUnderConstruction
          open={openFavoriteDownModal}
          onClose={() => setOpenFavoriteDownModal(false)}
        />
      </MainAgent>
    </AgentRoute>
  );
};

export default Nomenclature;
