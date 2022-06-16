import { useRef, useState } from 'react';

import { OnActionModal } from '@/components/autonomous/OnActionModal';
import { Header } from '@/components/business/header';
import { Button } from '@/components/common/Button';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/components/common/Link';
import { ProductBasket } from '@/components/common/ProductBasket';
import { TitleHeader } from '@/components/common/TitleHeader';
import { Typography } from '@/components/common/Typography';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';

const Pannier = () => {
  const shoppingProducts = useStore((state) => state.simulator.appState.shoppingProducts);
  const removeProduct = useStore((state) => state.removeProduct);
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
    >
      <OnActionModal
        open={openActionModal}
        onSuccess={onDelete}
        onReject={() => setOpenActionModal(false)}
      />
      <div className="flex h-full flex-col">
        <div className="mb-6 flex flex-col gap-6">
          <Header
            withCart
            nbCartItems={shoppingProducts?.length}
            cartLink="/app/simulateur/pannier"
          />
          <TitleHeader title="Mes achats" icon="calculator" />
        </div>
        <div className="flex flex-col gap-3">
          {shoppingProducts?.map((shoppingProduct) => (
            <div key={shoppingProduct.id}>
              <ProductBasket
                shoppingProduct={shoppingProduct}
                onDeleteProduct={() => {
                  idToDelete.current = shoppingProduct.id;
                  setOpenActionModal(true);
                }}
                onUpdateProduct={() => {}}
              />
            </div>
          ))}
          <Link to="/app/simulateur/produits">
            <div className="flex flex-row justify-center rounded-[10px] bg-primary-100 py-4 px-8">
              <div className="pt-[2px] pr-3 text-primary-600">
                <Icon name="plus" size="lg" color="primary" />
              </div>
              <Typography color="primary" size="text-lg">
                Ajouter un nouvel achat
              </Typography>
            </div>
          </Link>
        </div>
        <div className="mb-8 flex-1" />
        <Button fullWidth size="xl">
          Valider ma simulation
        </Button>
      </div>
    </Main>
  );
};
export default Pannier;
