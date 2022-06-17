import { useRef, useState } from 'react';

import { OnActionModal } from '@/components/autonomous/OnActionModal';
import { Header } from '@/components/business/header';
import { Button } from '@/components/common/Button';
import { Link } from '@/components/common/Link';
import { ProductBasket } from '@/components/common/ProductBasket';
import { SvgIcon } from '@/components/common/SvgIcon';
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
      <div className="flex h-full flex-col">
        <div className="mb-6 flex flex-col gap-6">
          <Header withCart />
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
        </div>
        <div className="mt-3">
          <Link to="/app/simulateur/produits">
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
        <div className="pb-4">
          <Button fullWidth size="xl">
            Valider ma simulation
          </Button>
        </div>
      </div>
      <OnActionModal
        open={openActionModal}
        onSuccess={onDelete}
        onReject={() => setOpenActionModal(false)}
      />
    </Main>
  );
};
export default Pannier;
