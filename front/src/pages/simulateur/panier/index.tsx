import { useRef, useState } from 'react';

import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';

import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { Typography } from '@/components/atoms/Typography';
import { SvgIcon } from '@/components/molecules/SvgIcon';
import { AmountProductBasket } from '@/components/organisms/AmountProductBasket';
import { OnActionModal } from '@/components/organisms/OnActionModal';
import { ValueProductBasket } from '@/components/organisms/ValueProductBasket';
import { simulator } from '@/core/hoc/simulator.hoc';
import { Meta } from '@/layout/Meta';
import { getAmountCategoryName } from '@/model/amount';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';
import { Routing } from '@/utils/const';

const Panier = () => {
  const router = useRouter();

  const { simulatorResponse, removeProduct } = useStore(
    (state) => ({
      simulatorResponse: state.simulator.appState.simulatorResponse,
      removeProduct: state.removeProduct,
    }),
    shallow,
  );
  const detailedProducts = simulatorResponse?.valueProducts || [];
  const customProducts = simulatorResponse?.customProducts || [];
  const amountProducts = simulatorResponse?.amountProducts || [];
  const tobaccoTax = simulatorResponse?.tobaccoTax || 0;
  const tobaccoTaxDetails = simulatorResponse?.tobaccoTaxDetails || [];
  const alcoholTax = simulatorResponse?.alcoholTax || 0;
  const alcoholTaxDetails = simulatorResponse?.alcoholTaxDetails || [];
  const isAlcoholProduct = amountProducts.some(
    (amountProduct) =>
      amountProduct.group === 'groupedAlcohol' ||
      amountProduct.group === 'beer' ||
      amountProduct.group === 'wine',
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
          title="Simulateur Déclare Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
      withHeader
      withCart
      withTitle
      titleValue="Mes achats"
      titleIcon="calculator"
      linkButton={Routing.simulatorProduct}
    >
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-3">
          {detailedProducts.map((detailedProduct) => (
            <div key={detailedProduct.customId}>
              <ValueProductBasket
                detailedProduct={detailedProduct}
                onDeleteProduct={() => {
                  idToDelete.current = detailedProduct.customId;
                  setOpenActionModal(true);
                }}
                onUpdateProduct={() => {
                  router.push(`/simulateur/panier/modifier/${detailedProduct.customId}`);
                }}
              />
            </div>
          ))}
          {customProducts.map((detailedProduct) => (
            <div key={detailedProduct.customId}>
              <ValueProductBasket
                customProduct={!simulatorResponse?.canCalculateTaxes}
                detailedProduct={detailedProduct}
                onDeleteProduct={() => {
                  idToDelete.current = detailedProduct.customId;
                  setOpenActionModal(true);
                }}
                onUpdateProduct={() => {
                  router.push(`/simulateur/panier/modifier/${detailedProduct.customId}`);
                }}
              />
            </div>
          ))}

          {amountProducts.map((amountProduct) => (
            <div key={amountProduct.group} className="flex flex-col gap-3">
              <div className="mt-2">
                <Typography color="light-gray">
                  {getAmountCategoryName(amountProduct.group)}
                </Typography>
              </div>
              {amountProduct.products.map((product) => (
                <AmountProductBasket
                  product={product}
                  onDeleteProduct={() => {
                    idToDelete.current = product.customId;
                    setOpenActionModal(true);
                  }}
                  onUpdateProduct={() => {
                    router.push(`/simulateur/panier/modifier/${product.customId}`);
                  }}
                />
              ))}
              {/* Bloc récapitulatif des taxes tabac */}
              {tobaccoTaxDetails.length > 0 && amountProduct.group === 'allTobaccoProducts' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <Typography weight="bold" size="text-sm">
                    Détail des taxes tabac
                  </Typography>
                  {tobaccoTaxDetails.map((detail, index) => (
                    <div key={index} className="flex justify-between text-sm mb-1">
                      <span>
                        {detail.type} ({detail.amount} unités)
                      </span>
                      <span>{detail.tax.toFixed(2)} €</span>
                    </div>
                  ))}
                  <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between font-bold">
                    <span>Total taxes tabac</span>
                    <span>{tobaccoTax.toFixed(2)} €</span>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Bloc récapitulatif des taxes alcool */}
          {alcoholTaxDetails.length > 0 && isAlcoholProduct && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <Typography weight="bold" size="text-sm">
                Détail des taxes alcool
              </Typography>
              {alcoholTaxDetails.map((detail, index) => (
                <div key={index} className="flex justify-between text-sm mb-1">
                  <span>
                    {detail.type} ({detail.amount} unités)
                  </span>
                  <span>{detail.tax.toFixed(2)} €</span>
                </div>
              ))}
              <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between font-bold">
                <span>Total taxes alcool</span>
                <span>{alcoholTax.toFixed(2)} €</span>
              </div>
            </div>
          )}
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
