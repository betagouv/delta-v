import React, { useEffect, useState } from 'react';

import { getName } from 'i18n-iso-countries';
import { QRCodeSVG } from 'qrcode.react';

import { SummaryCustomProduct } from './products/SummaryCustomProduct';
import { SummaryGroupedAmountProduct } from './products/SummaryGroupedAmountProduct';
import { SummaryValueProduct } from './products/SummaryValueProduct';
import { Typography } from '@/components/atoms/Typography';
import { Color } from '@/components/atoms/Typography/style/typography.style';
import { ModalMaximumAmount } from '@/components/organisms/ModalMaximumAmount';
import { getAmountProductType } from '@/model/amount';
import { AmountProduct } from '@/model/product';
import { SimulatorRequest, SimulatorResponse } from '@/stores/simulator/appState.store';
import { getMeanOfTransport } from '@/utils/meansOfTransport.util';

const formatAlcoholType = (type: string) => {
  switch (type) {
    case 'wine':
      return 'Vin';
    case 'beer':
      return 'Bière';
    case 'strongAlcohol':
      return 'Alcools forts';
    case 'softAlcohol':
      return 'Alcools doux';
    default:
      return type;
  }
};

interface SummarySimulatorProps {
  simulatorRequest: SimulatorRequest;
  simulatorResponse?: SimulatorResponse;
  qrCodeVersion?: boolean;
  hideDetails?: boolean;
}

export const SummarySimulator: React.FC<SummarySimulatorProps> = ({
  simulatorRequest,
  simulatorResponse,
  qrCodeVersion = false,
  hideDetails = false,
}: SummarySimulatorProps) => {
  const totalTaxes = simulatorResponse?.totalTaxesRounded ?? 0;
  const [color, setColor] = useState<Color>('primary');
  useEffect(() => {
    if (simulatorResponse?.totalTaxesRounded === 0) {
      setColor('success');
    }
    if (simulatorResponse?.totalTaxesRounded !== 0) {
      setColor('primary');
    }
  }, [simulatorResponse]);

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

  const hasValueProducts = (simulatorResponse?.valueProducts?.length ?? 0) > 0;
  const hasCustomProducts = (simulatorResponse?.customProducts?.length ?? 0) > 0;
  const hasAmountProduct = (simulatorResponse?.amountProducts?.length ?? 0) > 0;

  return (
    <div className="rounded-xl border border-secondary-600 p-4">
      <div>
        {qrCodeVersion ? (
          <div className="text-center">
            <Typography size="text-2xl" color="secondary" weight="bold">
              Récapitulatif
            </Typography>
            <div className="my-8 h-44">
              <QRCodeSVG value="https://www.douane.gouv.fr/" size={176} />
            </div>
          </div>
        ) : (
          <Typography size="text-2xl" color="secondary" weight="bold">
            Mon récapitulatif
          </Typography>
        )}
      </div>
      <div className="-mx-4 my-4 border-b-2 border-dashed" />
      <div className="flex flex-col gap-1.5">
        <Typography color="secondary" weight="bold">
          Voyageurs
        </Typography>
        <div className="flex flex-row">
          <Typography color="secondary">Adulte</Typography>
          <div className="flex-1" />
          <Typography color="secondary">{(simulatorRequest.age ?? 0) >= 18 ? 1 : 0}</Typography>
        </div>
        <div className="flex flex-row">
          <Typography color="secondary">Enfants et adolescents</Typography>
          <div className="flex-1" />
          <Typography color="secondary">{(simulatorRequest.age ?? 0) < 18 ? 1 : 0}</Typography>
        </div>
        <div className="flex flex-row">
          <Typography color="secondary">Frontalier</Typography>
          <div className="flex-1" />
          <Typography color="secondary">{simulatorRequest.border ? 'Oui' : 'Non'}</Typography>
        </div>
      </div>
      <div className="my-4 flex flex-row">
        <Typography color="secondary" weight="bold">
          Moyen de transport
        </Typography>
        <div className="flex-1" />
        <Typography color="secondary">
          {getMeanOfTransport(simulatorRequest.meanOfTransport)}
        </Typography>
      </div>
      <div className="my-4 flex flex-row">
        <Typography color="secondary" weight="bold">
          Pays d'origine
        </Typography>
        <div className="flex-1" />
        <Typography color="secondary">
          {simulatorRequest.country ? getName(simulatorRequest.country, 'fr') : 'inconnue'}
        </Typography>
      </div>
      <div className="-mx-4 my-4 border-b-2 border-dashed" />
      {hasAmountProduct && (
        <>
          {simulatorResponse?.amountProducts?.map((groupedAmount) => (
            <SummaryGroupedAmountProduct
              key={groupedAmount.group}
              groupedAmount={groupedAmount}
              openModalProductType={openModalProductType}
            />
          ))}
          {(simulatorResponse?.tobaccoTaxDetails ?? []).length > 0 &&
            simulatorResponse?.amountProducts?.some(
              (amountProduct) => amountProduct.group === 'allTobaccoProducts',
            ) && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <Typography weight="bold" size="text-sm">
                  Détail des taxes tabac
                </Typography>
                {Object.entries(
                  simulatorResponse.tobaccoTaxDetails.reduce((acc, detail) => {
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
                    acc[type].details.push(detail);
                    acc[type].amount += detail.amount;
                    acc[type].totalPrice += detail.priceInEuros || 0 / detail.amount;
                    acc[type].totalExcise += detail.details.excise1 + detail.details.excise2;
                    acc[type].totalCustomsDuty += detail.details.customsDuty;
                    acc[type].totalVat += detail.details.vat;
                    acc[type].total += detail.tax;
                    return acc;
                  }, {} as Record<string, any>),
                ).map(([type, group]) => (
                  <div key={type} className="flex justify-between text-sm mb-1">
                    <span>{type}</span>
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
                      {simulatorResponse.tobaccoTaxRounded.toFixed(2)} €
                    </Typography>
                  </div>
                </div>
              </div>
            )}
          {(simulatorResponse?.alcoholTaxDetails ?? []).length > 0 &&
            simulatorResponse?.amountProducts?.some(
              (amountProduct) =>
                amountProduct.group === 'groupedAlcohol' ||
                amountProduct.group === 'beer' ||
                amountProduct.group === 'wine',
            ) && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <Typography weight="bold" size="text-sm">
                  Détail des taxes alcool
                </Typography>
                {Object.entries(
                  simulatorResponse.alcoholTaxDetails.reduce((acc, detail) => {
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
                    acc[type].totalPrice += (detail.priceInEuros || 0) / detail.amount;
                    acc[type].totalExcise += detail.details.excise;
                    acc[type].totalCss += detail.details.css;
                    acc[type].totalCustomsDuty += detail.details.customsDuty;
                    acc[type].totalVat += detail.details.vat;
                    acc[type].total += detail.tax;
                    return acc;
                  }, {} as Record<string, any>),
                ).map(([type, group]) => (
                  <div key={type} className="flex justify-between text-sm mb-1">
                    <span>{formatAlcoholType(type)}</span>
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
                      {simulatorResponse.alcoholTaxRounded.toFixed(2)} €
                    </Typography>
                  </div>
                </div>
              </div>
            )}
          <div className="-mx-4 my-4 border-b-2 border-dashed" />
        </>
      )}
      {(hasValueProducts || hasCustomProducts) && (
        <div className="mt-4 flex flex-row">
          <Typography color="light-gray" size="text-2xs">
            Marchandises
          </Typography>
          <div className="flex-1" />
          <Typography color="light-gray" size="text-2xs">
            Droits et taxes
          </Typography>
        </div>
      )}
      <div>
        {simulatorResponse?.valueProducts?.map((product, index) => (
          <div key={index}>
            <SummaryValueProduct product={product} hideDetails={hideDetails} />
          </div>
        ))}
        {simulatorResponse?.customProducts?.map((product, index) => (
          <div key={index}>
            {simulatorResponse.canCalculateTaxes ? (
              <SummaryValueProduct product={product} hideDetails={hideDetails} />
            ) : (
              <SummaryCustomProduct product={product} hideDetails={hideDetails} />
            )}
          </div>
        ))}
      </div>
      {(hasValueProducts || hasCustomProducts) && (
        <div className="-mx-4 my-4 border-b-2 border-dashed" />
      )}

      <div className="mt-4 flex flex-row">
        <div className="flex-1" />
        <Typography color="secondary">Total (en €)</Typography>
      </div>
      {simulatorResponse?.canCalculateTaxes ? (
        <div className="flex flex-row justify-end">
          <Typography color={color} size="text-xl">
            {totalTaxes} €
          </Typography>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <Typography color="primary" size="text-lg">
            Rapprochez vous d'un agent <br />
            pour déterminer vos droits € *
          </Typography>
        </div>
      )}
      {(productType === 'alcohol' || productType === 'tobacco') && (
        <ModalMaximumAmount
          open={openModal}
          onClose={() => setOpenModal(false)}
          productType={productType}
          country={simulatorRequest.country}
          border={simulatorRequest.border}
        />
      )}
    </div>
  );
};
