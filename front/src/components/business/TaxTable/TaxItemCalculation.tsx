import React from 'react';

import dayjs from 'dayjs';

import { Typography } from '@/components/common/Typography';
import { DetailedProduct } from '@/stores/simulator/appState.store';

interface TaxItemCalculationProps {
  detailedProduct: DetailedProduct;
  withCalculation?: boolean;
}

const DisplayRate = ({ detailedProduct }: { detailedProduct: DetailedProduct }) => {
  const customDuty = detailedProduct.notManagedProduct
    ? 'Non renseigné'
    : `${detailedProduct?.customDuty ?? 0}%`;

  const vat = detailedProduct.notManagedProduct ? 'Non renseigné' : `${detailedProduct?.vat ?? 0}%`;
  return (
    <>
      <div className="p-1 text-center">
        <Typography weight="bold" size="text-xs" tag="div">
          Taux de droits de douane
        </Typography>
        <Typography color="black" size="text-xs" tag="div">
          {customDuty}
        </Typography>
      </div>
      <div className="p-1 text-center">
        <Typography weight="bold" size="text-xs">
          Taux de TVA
        </Typography>
        <div>
          <Typography color="black" size="text-xs">
            {vat}
          </Typography>
        </div>
      </div>
    </>
  );
};

const DisplayCalculation = ({ detailedProduct }: { detailedProduct: DetailedProduct }) => {
  return (
    <>
      <div className="text-center flex flex-col">
        <Typography
          weight="bold"
          size="text-xs"
          desktopSize="text-2xs"
          tag="div"
          color="black"
          lineHeight="leading-none"
        >
          Calcul de droits de douane
        </Typography>
        <Typography
          color="black"
          size="text-xs"
          tag="div"
          desktopSize="text-xs"
          lineHeight="leading-none"
        >
          {detailedProduct.unitPrice} x {detailedProduct.customDuty}% ={' '}
          {detailedProduct.unitCustomDuty} €
        </Typography>
      </div>
      <div className="text-center flex flex-col">
        <Typography
          weight="bold"
          size="text-xs"
          desktopSize="text-2xs"
          color="black"
          lineHeight="leading-none"
        >
          Calcul de TVA
        </Typography>
        <Typography color="black" size="text-xs" lineHeight="leading-none">
          {detailedProduct.unitPrice} x {detailedProduct.vat}% = {detailedProduct.unitVat} €
        </Typography>
      </div>
    </>
  );
};

export const TaxItemCalculation: React.FC<TaxItemCalculationProps> = ({
  detailedProduct,
  withCalculation = true,
}: TaxItemCalculationProps) => {
  return (
    <div className="text-center flex flex-col p-5 gap-4 md:gap-2.5">
      <div className="flex flex-col leading-none">
        <Typography
          weight="bold"
          size="text-xs"
          desktopSize="text-2xs"
          color="black"
          lineHeight="leading-none"
        >{`Calcul de la conversion ${detailedProduct?.originalCurrency} > EUR`}</Typography>
        <Typography size="text-xs" desktopSize="text-2xs">
          Taux {detailedProduct?.rateCurrency ?? '1'} au {dayjs().format('DD/MM/YYYY')}
        </Typography>
        <div>
          <Typography color="black" size="text-xs">
            {detailedProduct?.originalPrice} / {detailedProduct?.rateCurrency ?? '1'} =
          </Typography>
          <Typography color="black" size="text-xs">
            {detailedProduct?.unitPrice} €
          </Typography>
        </div>
      </div>
      {withCalculation ? (
        <DisplayCalculation detailedProduct={detailedProduct} />
      ) : (
        <DisplayRate detailedProduct={detailedProduct} />
      )}
    </div>
  );
};
