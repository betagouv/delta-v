import React, { useEffect, useState } from 'react';

import { getName } from 'i18n-iso-countries';
import { QRCodeSVG } from 'qrcode.react';

import { Typography } from '@/components/common/Typography';
import { Color } from '@/components/common/Typography/style/typography.style';
import { getUnit, isAlcoholProductType, isTobaccoProductType } from '@/model/amount';
import { DeclarationResponse } from '@/stores/declaration/appState.store';
import { DetailedProduct, ProductStatus } from '@/stores/simulator/appState.store';
import { getMeanOfTransport } from '@/utils/meansOfTransport.util';

interface SummaryDeclarationProps {
  declarationResponse: DeclarationResponse;
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

  const alcoholProducts =
    amountProducts?.filter((product: DetailedProduct) => isAlcoholProductType(product)) ?? [];
  const tobaccoProducts =
    amountProducts?.filter((product: DetailedProduct) => isTobaccoProductType(product)) ?? [];

  const hasValueProducts = (valueProducts?.length ?? 0) > 0;
  const hasCustomProducts = (customProducts?.length ?? 0) > 0;
  const hasAlcoholProducts = (alcoholProducts?.length ?? 0) > 0;
  const hasTobaccoProducts = (tobaccoProducts?.length ?? 0) > 0;

  return (
    <div className="rounded-xl border border-secondary-600 p-2 w-64 m-auto">
      <div className="flex flex-col">
        <div>
          <div className="text-center">
            <Typography size="text-lg" color="secondary" weight="bold">
              Récapitulatif
            </Typography>
            <div className="mx-auto h-32 w-32 flex justify-center">
              <QRCodeSVG value={declarationResponse.id} size={176} />
            </div>
          </div>
        </div>
        <div className="-mx-2 my-2 border-b-2 border-dashed" />
        <div className="flex flex-col gap-1">
          <div className="flex flex-row justify-start">
            <div className="flex flex-col flex-1 justify-start">
              <Typography color="black" weight="bold" size="text-3xs">
                Numéro de déclaration
              </Typography>
              <Typography color="black" size="text-3xs">
                {declarationResponse.publicId}
              </Typography>
            </div>
          </div>
          <div className="flex flex-row justify-start">
            <div className="flex flex-col flex-1 justify-start">
              <Typography color="black" weight="bold" size="text-3xs">
                Nom
              </Typography>
              <Typography color="black" size="text-3xs">
                {declarationResponse.declarantLastName}
              </Typography>
            </div>
            <div className="flex flex-col flex-1">
              <Typography color="black" weight="bold" size="text-3xs">
                Prénom
              </Typography>
              <Typography color="black" size="text-3xs">
                {declarationResponse.declarantFirstName}
              </Typography>
            </div>
          </div>
          <div className="flex flex-row justify-start">
            <div className="flex flex-col flex-1 justify-start">
              <Typography color="black" weight="bold" size="text-3xs">
                Adresse
              </Typography>
              <Typography color="black" size="text-3xs">
                {`${declarationResponse.declarantAddressStreet}, ${declarationResponse.declarantAddressPostalCode} ${declarationResponse.declarantAddressCity}`}
              </Typography>
            </div>
          </div>
          <div className="flex flex-row justify-start">
            <div className="flex flex-col flex-1 justify-start">
              <Typography color="black" weight="bold" size="text-3xs">
                Email
              </Typography>
              <Typography color="black" size="text-3xs">
                {declarationResponse.declarantEmail}
              </Typography>
            </div>
          </div>
          <div className="flex flex-row justify-start">
            <div className="flex flex-col flex-1 justify-start">
              <Typography color="black" weight="bold" size="text-3xs">
                Téléphone
              </Typography>
              <Typography color="black" size="text-3xs">
                {declarationResponse.declarantPhoneNumber}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="-mx-2 my-2 border-b-2 border-dashed" />
      <div className="flex flex-col gap-1">
        <div className="flex flex-col">
          <Typography color="secondary" weight="bold" size="text-3xs">
            Voyageurs
          </Typography>
          <div className="flex flex-row">
            <Typography color="secondary" size="text-3xs">
              Adulte
            </Typography>
            <div className="flex-1" />
            <Typography color="secondary" size="text-3xs">
              {(declarationResponse.declarantAge ?? 0) >= 18 ? 1 : 0}
            </Typography>
          </div>
          <div className="flex flex-row">
            <Typography color="secondary" size="text-3xs">
              Enfants et adolescents
            </Typography>
            <div className="flex-1" />
            <Typography color="secondary" size="text-3xs">
              {(declarationResponse.declarantAge ?? 0) < 18 ? 1 : 0}
            </Typography>
          </div>
          <div className="flex flex-row">
            <Typography color="secondary" size="text-3xs">
              Frontalier
            </Typography>
            <div className="flex-1" />
            <Typography color="secondary" size="text-3xs">
              {declarationResponse.declarantBorder ? 'Oui' : 'Non'}
            </Typography>
          </div>
        </div>
        <div className="flex flex-row">
          <Typography color="secondary" weight="bold" size="text-3xs">
            Moyen de transport
          </Typography>
          <div className="flex-1" />
          <Typography color="secondary" size="text-3xs">
            {getMeanOfTransport(declarationResponse.declarantMeanOfTransport)}
          </Typography>
        </div>
        <div className="flex flex-row">
          <Typography color="secondary" weight="bold" size="text-3xs">
            Pays d’origine
          </Typography>
          <div className="flex-1" />
          <Typography color="secondary" size="text-3xs">
            {declarationResponse.declarantCountry
              ? getName(declarationResponse.declarantCountry, 'fr')
              : 'inconnue'}
          </Typography>
        </div>
      </div>

      <div className="-mx-2 my-2 border-b-2 border-dashed" />
      <div>
        {(declarationResponse.products?.length ?? 0) > 0 && (
          <>
            <div>
              {hasAlcoholProducts && (
                <>
                  <div className="flex flex-col">
                    <Typography color="light-gray" size="text-2xs">
                      Alcool
                    </Typography>
                    <div className="flex flex-col gap-1">
                      {alcoholProducts.map((product, index) => (
                        <div key={index}>
                          <div key={product.customId} className="mb-2 ">
                            <div className="flex flex-row">
                              <div className="flex flex-col">
                                <Typography
                                  color="secondary"
                                  weight="bold"
                                  lineHeight="leading-tight"
                                  size="text-3xs"
                                >
                                  {product.customName}
                                </Typography>
                              </div>
                              <div className="flex-1" />
                              <div className="flex min-w-[75px] flex-row-reverse content-end flex-wrap">
                                <Typography color="secondary">
                                  {product.unitPrice} {getUnit(product.amountProduct)}
                                </Typography>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {hasTobaccoProducts && (
                <>
                  <div className="flex flex-col">
                    <Typography color="light-gray" size="text-2xs">
                      Tabac
                    </Typography>
                    <div className="flex flex-col gap-1">
                      {tobaccoProducts.map((product) => (
                        <div key={product.customId} className="mb-2">
                          <div className="flex flex-row">
                            <div className="flex flex-col">
                              <Typography
                                color="secondary"
                                weight="bold"
                                lineHeight="leading-tight"
                                size="text-3xs"
                              >
                                {product.name}
                              </Typography>
                              <Typography
                                color="secondary"
                                italic
                                lineHeight="leading-tight"
                                size="text-3xs"
                              >
                                {product.customName}
                              </Typography>
                            </div>
                            <div className="flex-1" />
                            <div className="flex min-w-[75px] flex-row-reverse content-end flex-wrap">
                              <Typography color="secondary">
                                {product.unitPrice} {getUnit(product.amountProduct)}
                              </Typography>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {(hasAlcoholProducts || hasTobaccoProducts) && (
                <div className="-mx-2 my-2 border-b-2 border-dashed" />
              )}
              {(hasValueProducts || hasCustomProducts) && (
                <div className="my-2 flex flex-row">
                  <Typography color="light-gray" size="text-3xs">
                    Marchandises
                  </Typography>
                  <div className="flex-1" />
                  <Typography color="light-gray" size="text-3xs">
                    Droits et taxes
                  </Typography>
                </div>
              )}
              <div className="flex flex-col gap-1">
                {valueProducts.map((product) => (
                  <div key={product.customId}>
                    <div className="flex flex-col">
                      <Typography
                        color="secondary"
                        weight="bold"
                        lineHeight="leading-tight"
                        size="text-3xs"
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        color="secondary"
                        italic
                        lineHeight="leading-tight"
                        size="text-3xs"
                      >
                        {product.customName}
                      </Typography>
                    </div>
                    <div className="flex flex-row">
                      <div className="flex w-full flex-col">
                        <div className="flex flex-1 flex-row">
                          <Typography color="secondary" size="text-3xs">
                            {product.unitPrice} €
                          </Typography>
                          <div className="flex-1" />
                          <Typography
                            color={product.unitTaxes === 0 ? 'success' : 'primary'}
                            size="text-3xs"
                          >
                            {product.unitTaxes} €
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {customProducts.map((product, index) => (
                  <div key={index}>
                    {declarationResponse.canCalculateTaxes && (
                      <div className="my-2" key={product.customId}>
                        <div className="flex flex-col">
                          <Typography color="secondary" weight="bold" lineHeight="leading-tight">
                            {product.customName}
                          </Typography>
                        </div>
                        <div className="mt-1 flex flex-row">
                          <div className="flex w-full flex-col">
                            <div className="flex flex-1 flex-row">
                              <Typography color="secondary">{product.unitPrice} €</Typography>
                              <div className="flex-1" />
                              <Typography color={product.unitTaxes === 0 ? 'success' : 'primary'}>
                                {product.unitTaxes} €
                              </Typography>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {(hasValueProducts || hasCustomProducts) && (
              <div className="-mx-2 my-2 border-b-2 border-dashed" />
            )}
          </>
        )}
      </div>

      <div className="mt-2 flex flex-row">
        <div className="flex-1" />
        <Typography color="secondary" size="text-2xs">
          Total (en €)
        </Typography>
      </div>
      {declarationResponse?.canCalculateTaxes && (
        <div className="flex flex-row justify-end">
          <Typography color={color} size="text-xs">
            {totalTaxes} €
          </Typography>
        </div>
      )}
      <div className="mt-2">
        <p className="leading-0 text-2xs text-secondary-300">
          *Les informations proposées par DéclareDouane et les montants de droit et taxes
          potentiellement dus suite à une déclaration restent soumis à l'approbation d'un agent des
          douanes au moment du passage de la frontière. Si vous estimez que votre déclaration
          contient une ou des erreurs, rapprochez vous des agents douaniers à votre arrivée en
          France métropolitaine.
        </p>
      </div>
    </div>
  );
};
