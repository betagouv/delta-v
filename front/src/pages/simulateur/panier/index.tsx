import { useRef, useState } from 'react';

import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';

import { OnActionModal } from '@/components/autonomous/OnActionModal';
import { Button } from '@/components/common/Button';
import { Link } from '@/components/common/Link';
import { ProductBasket } from '@/components/common/ProductBasket';
import { SvgIcon } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';
import { simulator } from '@/core/hoc/simulator.hoc';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';

const Panier = () => {
  const router = useRouter();

  const { shoppingProducts, removeProduct, getBasketProduct } = useStore(
    (state) => ({
      shoppingProducts: state.simulator.appState.simulatorRequest.shoppingProducts,
      removeProduct: state.removeProduct,
      getBasketProduct: state.getBasketProduct,
    }),
    shallow,
  );
  const [openActionModal, setOpenActionModal] = useState(false);
  const idToDelete = useRef('');

  const onDelete = (): void => {
    removeProduct(idToDelete.current);
    setOpenActionModal(false);
  };

  return (
    <Main
      meta={
        <Meta
          title="Simulateur Déclaration Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
      withHeader
      withCart
      withTitle
      titleValue="Mes achats"
      titleIcon="calculator"
    >
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-3">
          {shoppingProducts?.map((shoppingProduct) => (
            <div key={shoppingProduct.id}>
              <ProductBasket
                basketProduct={getBasketProduct(shoppingProduct.id) ?? { shoppingProduct }}
                onDeleteProduct={() => {
                  idToDelete.current = shoppingProduct.id;
                  setOpenActionModal(true);
                }}
                onUpdateProduct={() => {
                  router.push(`/simulateur/panier/modifier/${shoppingProduct.id}`);
                }}
              />
            </div>
          ))}
        </div>
        <div className="mt-3">
          <Link to="/simulateur/produits">
            <div className="flex flex-row items-center justify-center rounded-[10px] bg-primary-100 py-3.5 px-8">
              <div className="mr-3 mt-[2px] h-6 w-6 text-primary-600">
                <SvgIcon name="add" />
              </div>
              <Typography color="primary" size="text-lg">
                Ajouter un nouvel achat
              </Typography>
            </div>
          </Link>
        </div>
        <div className="mb-8 flex-1" />
        <Link to="/simulateur/recapitulatif">
          <Button fullWidth size="xl">
            Valider ma simulation
          </Button>
        </Link>
      </div>
      <OnActionModal
        open={openActionModal}
        onSuccess={onDelete}
        onReject={() => setOpenActionModal(false)}
      />
    </Main>
  );
};
export default simulator(Panier);
