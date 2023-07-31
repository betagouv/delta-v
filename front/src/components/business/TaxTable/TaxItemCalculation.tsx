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
      <div className="p-1 text-center">
        <Typography weight="bold" size="text-xs" tag="div">
          Calcul de droits de douane
        </Typography>
        <Typography color="black" size="text-xs" tag="div">
          {detailedProduct.unitPrice} x {detailedProduct.customDuty}% ={' '}
          {detailedProduct.unitCustomDuty} €
        </Typography>
      </div>
      <div className="p-1 text-center">
        <Typography weight="bold" size="text-xs">
          Calcul de TVA
        </Typography>
        <div>
          <Typography color="black" size="text-xs">
            {detailedProduct.unitPrice} x {detailedProduct.vat}% = {detailedProduct.unitVat} €
          </Typography>
        </div>
      </div>
    </>
  );
};

export const TaxItemCalculation: React.FC<TaxItemCalculationProps> = ({
  detailedProduct,
  withCalculation = true,
}: TaxItemCalculationProps) => {
  return (
    <>
      <div className="p-2 text-center">
        <Typography
          weight="bold"
          size="text-xs"
        >{`Calcul de la conversion ${detailedProduct?.originalCurrency} > EUR`}</Typography>
        <div>
          <Typography color="black" size="text-xs">
            Taux {detailedProduct?.rateCurrency ?? '1'} au {dayjs().format('DD/MM/YYYY')}
          </Typography>
        </div>
        <div className="inline-flex text-center leading-none">
          <Typography color="black" size="text-xs">
            {detailedProduct?.originalPrice} / {detailedProduct?.rateCurrency ?? '1'} =
          </Typography>
          <div className="ml-1">
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
    </>
  );
};
