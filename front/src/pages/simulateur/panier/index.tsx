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
  const tobaccoTax = simulatorResponse?.tobaccoTaxRounded || 0;
  console.log('🚀 ~ Panier ~ simulatorResponse:', simulatorResponse);
  const tobaccoTaxDetails = simulatorResponse?.tobaccoTaxDetails || [];
  const alcoholTax = simulatorResponse?.alcoholTaxRounded || 0;
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

  // Fonction pour trouver les détails de taxe pour un produit spécifique
  const findTaxDetails = (product: any, group: string) => {
    console.log('🚀 ~ findTaxDetails ~ product:', product?.customId);
    console.log('🚀 ~ findTaxDetails ~ group:', tobaccoTaxDetails);
    console.log(
      '🚀 ~ findTaxDetails ~ alcoholTaxDetails:',
      alcoholTaxDetails.map((detail) => detail.customId),
    );
    if (group === 'allTobaccoProducts') {
      const taxDetail = tobaccoTaxDetails.find(
        (detail) =>
          detail.customId === product.shoppingProduct?.customId ||
          detail.customId === product.customId,
      );
      if (taxDetail) {
        return {
          excise:
            (taxDetail.details as { excise1: number; excise2: number }).excise1 +
            (taxDetail.details as { excise1: number; excise2: number }).excise2,
          customsDuty: taxDetail.details.customsDuty,
          vat: taxDetail.details.vat,
          priceInEuros: taxDetail.priceInEuros,
          total: taxDetail.tax,
        };
      }
    } else {
      const taxDetail = alcoholTaxDetails.find((detail) => detail.customId === product.customId);
      if (taxDetail) {
        return {
          excise: (taxDetail.details as { excise: number }).excise,
          css: taxDetail.details.css,
          customsDuty: taxDetail.details.customsDuty,
          vat: taxDetail.details.vat,
          total: taxDetail.tax,
          priceInEuros: taxDetail.priceInEuros,
        };
      }
    }
    return undefined;
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
              {amountProduct.products.map((product) => {
                const taxDetails = findTaxDetails(product, amountProduct.group);

                return (
                  <AmountProductBasket
                    key={product.customId}
                    product={product}
                    taxDetails={taxDetails}
                    onDeleteProduct={() => {
                      idToDelete.current = product.customId;
                      setOpenActionModal(true);
                    }}
                    onUpdateProduct={() => {
                      router.push(`/simulateur/panier/modifier/${product.customId}`);
                    }}
                  />
                );
              })}
            </div>
          ))}

          {/* Bloc récapitulatif des taxes des value products */}
          {simulatorResponse?.valueProducts && simulatorResponse.valueProducts.length > 0 && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <Typography weight="bold" size="text-sm">
                Détail des taxes des autres produits
              </Typography>
              {Object.entries(
                simulatorResponse.valueProducts.reduce((acc, product) => {
                  const type = product.name || 'Autre';
                  if (!acc[type]) {
                    acc[type] = {
                      count: 0,
                      totalPrice: 0,
                      totalCustomDuty: 0,
                      totalVat: 0,
                      total: 0,
                    };
                  }
                  acc[type].count += 1;
                  acc[type].totalPrice += product.unitPrice || 0;
                  acc[type].totalCustomDuty += product.unitCustomDuty || 0;
                  acc[type].totalVat += product.unitVat || 0;
                  acc[type].total += product.unitTaxesRounded || 0;
                  return acc;
                }, {} as Record<string, any>),
              ).map(([type, group]) => (
                <div key={type} className="flex justify-between text-sm mb-1">
                  <span>
                    {type} ({group.count} {group.count > 1 ? 'produits' : 'produit'})
                  </span>
                  <div className="flex flex-col items-end">
                    <span>Prix total : {group.totalPrice.toFixed(2)} €</span>
                    <span>Droits de douane totaux : {group.totalCustomDuty.toFixed(2)} €</span>
                    <span>TVA totale : {group.totalVat.toFixed(2)} €</span>
                    <span className="font-bold">Total : {group.total.toFixed(2)} €</span>
                  </div>
                </div>
              ))}
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <Typography weight="bold" size="text-base">
                    Total taxes autres produits
                  </Typography>
                  <Typography weight="bold" size="text-base">
                    {simulatorResponse.totalTaxesValueRounded.toFixed(2)} €
                  </Typography>
                </div>
              </div>
            </div>
          )}

          {/* Bloc récapitulatif des taxes tabac */}
          {tobaccoTaxDetails.length > 0 &&
            amountProducts.some(
              (amountProduct) => amountProduct.group === 'allTobaccoProducts',
            ) && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <Typography weight="bold" size="text-sm">
                  Détail des taxes tabac
                </Typography>
                {Object.entries(
                  tobaccoTaxDetails.reduce((acc, detail) => {
                    const { type } = detail;
                    if (!acc[type]) {
                      acc[type] = {
                        details: [],
                        amount: 0,
                        totalPrice: 0,
                        totalExcise: 0,
                        totalCustomsDuty: 0,
                        totalVat: 0,
                        total: 0,
                      };
                    }
                    console.log('🚀 ~ tobaccoTaxDetails.reduce ~ detail:', detail);
                    acc[type].details.push(detail);
                    acc[type].amount += detail.amount;
                    acc[type].totalPrice += (detail.priceInEuros || 0) * detail.amount;
                    acc[type].totalExcise += detail.details.excise1 + detail.details.excise2;
                    acc[type].totalCustomsDuty += detail.details.customsDuty;
                    acc[type].totalVat += detail.details.vat;
                    acc[type].total += detail.tax;
                    return acc;
                  }, {} as Record<string, any>),
                ).map(([type, group]) => (
                  <div key={type} className="flex justify-between text-sm mb-1">
                    <span>
                      {type} ({group.amount} unités)
                    </span>
                    <div className="flex flex-col items-end">
                      <span>Prix total au dessus du seuil : {group.totalPrice.toFixed(2)} €</span>
                      <span>Accises totales : {group.totalExcise.toFixed(2)} €</span>
                      <span>Droits de douane totaux : {group.totalCustomsDuty.toFixed(2)} €</span>
                      <span>TVA totale : {group.totalVat.toFixed(2)} €</span>
                      <span className="font-bold">Total : {group.total.toFixed(2)} €</span>
                    </div>
                  </div>
                ))}
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <div className="flex justify-between">
                    <Typography weight="bold" size="text-base">
                      Total taxes tabac
                    </Typography>
                    <Typography weight="bold" size="text-base">
                      {tobaccoTax.toFixed(2)} €
                    </Typography>
                  </div>
                </div>
              </div>
            )}

          {/* Bloc récapitulatif des taxes alcool */}
          {alcoholTaxDetails.length > 0 && isAlcoholProduct && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <Typography weight="bold" size="text-sm">
                Détail des taxes alcool
              </Typography>
              {Object.entries(
                alcoholTaxDetails.reduce((acc, detail) => {
                  const { type } = detail;
                  if (!acc[type]) {
                    acc[type] = {
                      details: [],
                      amount: 0,
                      totalPrice: 0,
                      totalExcise: 0,
                      totalCss: 0,
                      totalCustomsDuty: 0,
                      totalVat: 0,
                      total: 0,
                    };
                  }
                  acc[type].details.push(detail);
                  acc[type].amount += detail.amount;
                  acc[type].totalPrice += (detail.priceInEuros || 0) * detail.amount;
                  acc[type].totalExcise += detail.details.excise;
                  acc[type].totalCss += detail.details.css;
                  acc[type].totalCustomsDuty += detail.details.customsDuty;
                  acc[type].totalVat += detail.details.vat;
                  acc[type].total += detail.tax;
                  return acc;
                }, {} as Record<string, any>),
              ).map(([type, group]) => (
                <div key={type} className="flex justify-between text-sm mb-1">
                  <span>
                    {type} ({group.amount} litres)
                  </span>
                  <div className="flex flex-col items-end">
                    <span>Prix total au dessus du seuil : {group.totalPrice.toFixed(2)} €</span>
                    <span>
                      Accises totales : {(group.totalExcise + group.totalCss).toFixed(2)} €
                    </span>
                    <span>Droits de douane totaux : {group.totalCustomsDuty.toFixed(2)} €</span>
                    <span>TVA totale : {group.totalVat.toFixed(2)} €</span>
                    <span className="font-bold">Total : {group.total.toFixed(2)} €</span>
                  </div>
                </div>
              ))}
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <Typography weight="bold" size="text-base">
                    Total taxes alcool
                  </Typography>
                  <Typography weight="bold" size="text-base">
                    {alcoholTax.toFixed(2)} €
                  </Typography>
                </div>
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
