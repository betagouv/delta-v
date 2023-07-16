import React, { useEffect, useState } from 'react';

import { getName } from 'i18n-iso-countries';
import { QRCodeSVG } from 'qrcode.react';

import { SummaryAmountProduct } from '@/components/business/SummarySimulator/products/SummaryAmountProduct';
import { SummaryCustomProduct } from '@/components/business/SummarySimulator/products/SummaryCustomProduct';
import { SummaryValueProduct } from '@/components/business/SummarySimulator/products/SummaryValueProduct';
import { Typography } from '@/components/common/Typography';
import { Color } from '@/components/common/Typography/style/typography.style';
import { DeclarationResponse } from '@/stores/declaration/appState.store';
import { DetailedProduct, ProductStatus } from '@/stores/simulator/appState.store';
import { getMeanOfTransport } from '@/utils/meansOfTransport.util';

interface SummaryDeclarationProps {
  declarationResponse: DeclarationResponse;
  qrCodeVersion?: boolean;
  hideDetails?: boolean;
}
interface GetProductByTypeOptions {
  valueProducts: DetailedProduct[];
  amountProducts: DetailedProduct[];
  customProducts: DetailedProduct[];
}

const getProductByType = (products?: DetailedProduct[]): GetProductByTypeOptions => {
  const valueProducts =
    products?.filter((product) => product.status === ProductStatus.VALUE_PRODUCT) ?? [];
  const amountProducts =
    products?.filter((product) => product.status === ProductStatus.AMOUNT_PRODUCT) ?? [];
  const customProducts =
    products?.filter((product) => product.status === ProductStatus.CUSTOM_PRODUCT) ?? [];

  return { valueProducts, amountProducts, customProducts };
};

export const SummaryDeclaration: React.FC<SummaryDeclarationProps> = ({
  declarationResponse,
  qrCodeVersion = false,
  hideDetails = false,
}: SummaryDeclarationProps) => {
  const totalTaxes = declarationResponse.totalTaxesAmount ?? 0;
  const [color, setColor] = useState<Color>('primary');
  useEffect(() => {
    if (declarationResponse.totalTaxesAmount === 0) {
      setColor('success');
    }
    if (declarationResponse.totalTaxesAmount !== 0) {
      setColor('primary');
    }
  }, [declarationResponse]);

  const { valueProducts, amountProducts, customProducts } = getProductByType(
    declarationResponse?.products,
  );

  const hasValueProducts = (valueProducts?.length ?? 0) > 0;
  const hasCustomProducts = (customProducts?.length ?? 0) > 0;
  const hasAmountProduct = (amountProducts?.length ?? 0) > 0;

  return (
    <div className="rounded-xl border border-secondary-600 p-4">
      <div>
        {qrCodeVersion && declarationResponse ? (
          <div className="text-center">
            <Typography size="text-2xl" color="secondary" weight="bold">
              Récapitulatif
            </Typography>
            <div className="mt-8 h-44 flex justify-center">
              <QRCodeSVG value={declarationResponse.id} size={176} />
            </div>
            <Typography size="text-lg" weight="bold" color="black">
              {declarationResponse.publicId}
            </Typography>
          </div>
        ) : (
          <Typography size="text-2xl" color="secondary" weight="bold">
            Mon récapitulatif
          </Typography>
        )}
      </div>
      <div className="-mx-4 my-4 border-b-2 border-dashed" />
      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-row justify-start">
          <div className="flex flex-col flex-1 justify-start">
            <Typography color="black" weight="bold" size="xs">
              Nom
            </Typography>
            <Typography color="black" size="xs">
              {declarationResponse.declarantLastName}
            </Typography>
          </div>
          <div className="flex flex-col flex-1">
            <Typography color="black" weight="bold" size="xs">
              Prénom
            </Typography>
            <Typography color="black" size="xs">
              {declarationResponse.declarantFirstName}
            </Typography>
          </div>
        </div>
        <div className="flex flex-row justify-start">
          <div className="flex flex-col flex-1 justify-start">
            <Typography color="black" weight="bold" size="xs">
              Adresse
            </Typography>
            <Typography color="black" size="xs">
              {declarationResponse.declarantAddressStreet}
            </Typography>
          </div>
        </div>
        <div className="flex flex-row justify-start">
          <div className="flex flex-col flex-1 justify-start">
            <Typography color="black" weight="bold" size="xs">
              Code Postal
            </Typography>
            <Typography color="black" size="xs">
              {declarationResponse.declarantAddressPostalCode}
            </Typography>
          </div>
          <div className="flex flex-col flex-1">
            <Typography color="black" weight="bold" size="xs">
              Ville
            </Typography>
            <Typography color="black" size="xs">
              {declarationResponse.declarantAddressCity}
            </Typography>
          </div>
        </div>
        <div className="flex flex-row justify-start">
          <div className="flex flex-col flex-1 justify-start">
            <Typography color="black" weight="bold" size="xs">
              Email
            </Typography>
            <Typography color="black" size="xs">
              {declarationResponse.declarantEmail}
            </Typography>
          </div>
        </div>
        <div className="flex flex-row justify-start">
          <div className="flex flex-col flex-1 justify-start">
            <Typography color="black" weight="bold" size="xs">
              Téléphone
            </Typography>
            <Typography color="black" size="xs">
              {declarationResponse.declarantPhoneNumber}
            </Typography>
          </div>
        </div>
      </div>
      <div className="-mx-4 my-4 border-b-2 border-dashed" />
      <div className="flex flex-col gap-1.5">
        <Typography color="secondary" weight="bold">
          Voyageurs
        </Typography>
        <div className="flex flex-row">
          <Typography color="secondary">Adulte</Typography>
          <div className="flex-1" />
          <Typography color="secondary">
            {(declarationResponse.declarantAge ?? 0) >= 18 ? 1 : 0}
          </Typography>
        </div>
        <div className="flex flex-row">
          <Typography color="secondary">Enfants et adolescents</Typography>
          <div className="flex-1" />
          <Typography color="secondary">
            {(declarationResponse.declarantAge ?? 0) < 18 ? 1 : 0}
          </Typography>
        </div>
        <div className="flex flex-row">
          <Typography color="secondary">Frontalier</Typography>
          <div className="flex-1" />
          <Typography color="secondary">
            {declarationResponse.declarantBorder ? 'Oui' : 'Non'}
          </Typography>
        </div>
      </div>
      <div className="my-4 flex flex-row">
        <Typography color="secondary" weight="bold">
          Moyen de transport
        </Typography>
        <div className="flex-1" />
        <Typography color="secondary">
          {getMeanOfTransport(declarationResponse.declarantMeanOfTransport)}
        </Typography>
      </div>
      <div className="my-4 flex flex-row">
        <Typography color="secondary" weight="bold">
          Pays d’origine
        </Typography>
        <div className="flex-1" />
        <Typography color="secondary">
          {declarationResponse.declarantCountry
            ? getName(declarationResponse.declarantCountry, 'fr')
            : 'inconnue'}
        </Typography>
      </div>
      <div className="-mx-4 my-4 border-b-2 border-dashed" />
      {(declarationResponse.products?.length ?? 0) > 0 && (
        <>
          <div>
            {hasAmountProduct && (
              <>
                {amountProducts.map((product, index) => (
                  <div key={index}>
                    <SummaryAmountProduct product={product} hideDetails={hideDetails} />
                  </div>
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
            <div>
              {valueProducts.map((product, index) => (
                <div key={index}>
                  <SummaryValueProduct product={product} hideDetails={hideDetails} />
                </div>
              ))}
              {customProducts.map((product, index) => (
                <div key={index}>
                  {declarationResponse.canCalculateTaxes ? (
                    <SummaryValueProduct product={product} hideDetails={hideDetails} />
                  ) : (
                    <SummaryCustomProduct product={product} hideDetails={hideDetails} />
                  )}
                </div>
              ))}
            </div>
          </div>
          {(hasValueProducts || hasCustomProducts) && (
            <div className="-mx-4 my-4 border-b-2 border-dashed" />
          )}
        </>
      )}

      <div className="mt-4 flex flex-row">
        <div className="flex-1" />
        <Typography color="secondary">Total (en €)</Typography>
      </div>
      {declarationResponse?.canCalculateTaxes ? (
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
    </div>
  );
};
