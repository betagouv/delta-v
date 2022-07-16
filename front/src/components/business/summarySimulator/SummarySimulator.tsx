import React, { useEffect, useState } from 'react';

import { getName } from 'i18n-iso-countries';
import { QRCodeSVG } from 'qrcode.react';

import { Typography } from '@/components/common/Typography';
import { Color } from '@/components/common/Typography/style/typography.style';
import { getAmountCategoryName, getUnit } from '@/model/amount';
import { SimulatorRequest, SimulatorResponse } from '@/stores/simulator/appState.store';
import { getMeanOfTransport } from '@/utils/country.config';

interface SummarySimulatorProps {
  simulatorRequest: SimulatorRequest;
  simulatorResponse?: SimulatorResponse;
  qrCodeVersion?: boolean;
}

export const SummarySimulator: React.FC<SummarySimulatorProps> = ({
  simulatorRequest,
  simulatorResponse,
  qrCodeVersion = false,
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
      {simulatorResponse?.amountProducts && (
        <>
          {simulatorResponse.amountProducts.map((groupedAmount) => (
            <div key={groupedAmount.group}>
              <Typography color="light-gray" size="text-2xs">
                {getAmountCategoryName(groupedAmount.group)}
              </Typography>
              {groupedAmount.products.map((product) => (
                <div className="mt-1 mb-4 flex flex-row">
                  <div>
                    <Typography color="secondary" weight="bold">
                      {product.name}
                    </Typography>
                    <Typography color="secondary" italic>
                      {product.customName}
                    </Typography>
                  </div>
                  <div className="flex-1" />
                  <div>
                    <Typography color="secondary">
                      {product.amount} {getUnit(product.amountProduct)}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div className="-mx-4 my-4 border-b-2 border-dashed" />
        </>
      )}
      {simulatorResponse?.valueProducts && (
        <>
          <div className="mt-4 flex flex-row">
            <Typography color="light-gray" size="text-2xs">
              Marchandises
            </Typography>
            <div className="flex-1" />
            <Typography color="light-gray" size="text-2xs">
              Droits et taxes
            </Typography>
          </div>
          <div>
            {simulatorResponse.valueProducts.map((product, index) => (
              <div key={index} className="mt-2 mb-4">
                <Typography color="secondary" weight="bold">
                  {product.name}
                </Typography>
                <Typography color="secondary" italic>
                  {product.customName}
                </Typography>
                <div className="mt-1 flex flex-row">
                  <Typography color="secondary">{product.unitPrice} €</Typography>
                  <div className="flex-1" />
                  <Typography color={product.unitTaxes === 0 ? 'success' : 'primary'}>
                    {product.unitTaxes} €
                  </Typography>
                </div>
              </div>
            ))}
          </div>
          <div className="-mx-4 my-4 border-b-2 border-dashed" />
        </>
      )}

      <div className="mt-4 flex flex-row">
        <div className="flex-1" />
        <Typography color="secondary">Total (en €)</Typography>
      </div>
      <div className="flex flex-row">
        <div className="flex-1" />
        <Typography color={color} size="text-xl">
          {totalTaxes} €
        </Typography>
      </div>
    </div>
  );
};
