import { useRef, useState } from 'react';

import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';

import { useCreateDeclarationMutation } from '@/api/hooks/useAPIDeclaration';
import { ModalMaximumAmount } from '@/components/autonomous/ModalMaximumAmount';
import { OnActionModal } from '@/components/autonomous/OnActionModal';
import { AmountProductBasket } from '@/components/common/AmountProductBasket';
import { Button } from '@/components/common/Button';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/components/common/Link';
import { SvgIcon } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';
import { ValueProductBasket } from '@/components/common/ValueProductBasket';
import { declaration } from '@/core/hoc/declaration.hoc';
import { Meta } from '@/layout/Meta';
import {
  getAmountCategoryName,
  getAmountProductType,
  getMessageOverMaximumAmount,
} from '@/model/amount';
import { AmountProduct } from '@/model/product';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';
import { Routing } from '@/utils/const';

const Panier = () => {
  const router = useRouter();

  const {
    declarationRequest,
    declarationResponse,
    declarationId,
    removeProductCartDeclaration,
    resetAllRequests,
  } = useStore(
    (state) => ({
      declarationRequest: state.declaration.appState.declarationRequest,
      declarationId: state.declaration.appState.declarationRequest.declarationId,
      declarationResponse: state.declaration.appState.declarationResponse,
      removeProductCartDeclaration: state.removeProductCartDeclaration,
      resetAllRequests: state.resetAllRequests,
    }),
    shallow,
  );

  const detailedProducts = declarationResponse?.valueProducts || [];
  const customProducts = declarationResponse?.customProducts || [];
  const amountProducts = declarationResponse?.amountProducts || [];

  const [openActionModal, setOpenActionModal] = useState(false);
  const idToDelete = useRef('');

  const onDelete = (): void => {
    removeProductCartDeclaration(idToDelete.current);
    setOpenActionModal(false);
  };

  const [productType, setProductType] = useState<
    'alcohol' | 'tobacco' | 'valueProduct' | undefined
  >();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const openModalProductType = (amountProduct?: AmountProduct) => {
    setProductType(amountProduct ? getAmountProductType(amountProduct) : 'valueProduct');

    setTimeout(() => {
      setOpenModal(true);
    }, 150);
  };

  const createDeclarationMutation = useCreateDeclarationMutation({
    onSuccess: () => {
      resetAllRequests();
      router.push(`/declaration/${declarationId}`);
    },
  });

  const onValidateDeclaration = () => {
    if (!declarationId) return;
    createDeclarationMutation.mutate({
      declarationId,
      contactDetails: declarationRequest.contactDetails,
      shoppingProducts: declarationRequest.shoppingProducts,
      border: declarationRequest.border,
      meansOfTransportAndCountry: declarationRequest.meansOfTransportAndCountry,
      authorType: 'user',
    });
  };

  return (
    <Main
      meta={
        <Meta
          title="Declaration Déclare Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
      withHeader
      withCart
      withTitle
      titleValue="Mes achats"
      titleIcon="douanier"
      method="declaration"
      linkButton={Routing.declarationProducts}
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
                  router.push(`/declaration/panier/modifier/${detailedProduct.customId}`);
                }}
              />
            </div>
          ))}
          {customProducts.map((detailedProduct) => (
            <div key={detailedProduct.customId}>
              <ValueProductBasket
                customProduct={!declarationResponse?.canCalculateTaxes}
                detailedProduct={detailedProduct}
                onDeleteProduct={() => {
                  idToDelete.current = detailedProduct.customId;
                  setOpenActionModal(true);
                }}
                onUpdateProduct={() => {
                  router.push(`/declaration/panier/modifier/${detailedProduct.customId}`);
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
                  containError={amountProduct.isOverMaximum}
                  product={product}
                  onDeleteProduct={() => {
                    idToDelete.current = product.customId;
                    setOpenActionModal(true);
                  }}
                  onUpdateProduct={() => {
                    router.push(`/declaration/panier/modifier/${product.customId}`);
                  }}
                  key={product.customId}
                />
              ))}
              {amountProduct.isOverMaximum && (
                <div className="flex flex-row gap-1 text-red-700">
                  <div className="h-4 w-4">
                    <Icon name="error" />
                  </div>
                  <p className="flex-1 text-xs">
                    Vous dépassez la limite légale d'unités{' '}
                    {getMessageOverMaximumAmount(amountProduct.group)}. Pour connaître les quantités
                    maximales autorisées{' '}
                    <span
                      className="text-link cursor-pointer"
                      onClick={() => {
                        openModalProductType(amountProduct.products[0]?.amountProduct);
                      }}
                    >
                      cliquez ici
                    </span>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-3">
          <Link to="/declaration/produits">
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
        <Button
          fullWidth
          size="xl"
          onClick={onValidateDeclaration}
          disabled={!declarationResponse?.canCreateDeclaration}
        >
          Valider ma declaration
        </Button>
      </div>
      <OnActionModal
        open={openActionModal}
        onSuccess={onDelete}
        onReject={() => setOpenActionModal(false)}
      />
      {(productType === 'alcohol' || productType === 'tobacco') && (
        <ModalMaximumAmount
          open={openModal}
          onClose={() => setOpenModal(false)}
          productType={productType}
          country={declarationRequest.meansOfTransportAndCountry.country}
          border={declarationRequest.border}
        />
      )}
    </Main>
  );
};
export default declaration(Panier);
