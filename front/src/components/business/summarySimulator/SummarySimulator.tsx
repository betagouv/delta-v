import React, { useEffect, useState } from 'react';

import { getName } from 'i18n-iso-countries';
import { QRCodeSVG } from 'qrcode.react';

import { SummaryCustomProduct } from './products/SummaryCustomProduct';
import { SummaryGroupedAmountProduct } from './products/SummaryGroupedAmountProduct';
import { SummaryValueProduct } from './products/SummaryValueProduct';
import { ModalMaximumAmount } from '@/components/autonomous/ModalMaximumAmount';
import { Typography } from '@/components/common/Typography';
import { Color } from '@/components/common/Typography/style/typography.style';
import { getAmountProductType } from '@/model/amount';
import { AmountProduct } from '@/model/product';
import { SimulatorRequest, SimulatorResponse } from '@/stores/simulator/appState.store';
import { getMeanOfTransport } from '@/utils/meansOfTransport.util';

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
  const totalTaxes = simulatorResponse?.totalTaxes ?? 0;
  const [color, setColor] = useState<Color>('primary');
  useEffect(() => {
    if (simulatorResponse?.totalTaxes === 0) {
      setColor('success');
    }
    if (simulatorResponse?.totalTaxes !== 0) {
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
          Pays d’origine
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
      {hasValueProducts && (
        <>
          <div>
            {simulatorResponse?.valueProducts?.map((product, index) => (
              <div key={index}>
                <SummaryValueProduct product={product} hideDetails={hideDetails} />
              </div>
            ))}
          </div>
        </>
      )}
      {hasCustomProducts && (
        <div>
          {simulatorResponse?.customProducts?.map((product, index) => (
            <div key={index}>
              <SummaryCustomProduct product={product} hideDetails={hideDetails} />
            </div>
          ))}
        </div>
      )}
      <div className="-mx-4 my-4 border-b-2 border-dashed" />

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
            Rapprochez vous d’un agent <br />
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
