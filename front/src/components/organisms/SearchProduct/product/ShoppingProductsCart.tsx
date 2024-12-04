import { useEffect, useState } from 'react';

import shallow from 'zustand/shallow';

import { AmountAgentProductBasketGroup } from '../../AmountAgentProductBasket/AmountAgentProductBasketGroup';
import { ValueAgentProductBasket } from '../../ValueAgentProductBasket';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { useStore } from '@/stores/store';

interface ShoppingProductsCartProps {
  onRemoveCartProduct: (productId: string) => void;
  onModifyClick: (productId: string) => void;
}

export const ShoppingProductsCart: React.FC<ShoppingProductsCartProps> = ({
  onRemoveCartProduct,
  onModifyClick,
}: ShoppingProductsCartProps) => {
  const { declarationAgentResponse, declarationAgentRequest, meansOfTransportAndCountry } =
    useStore(
      (state) => ({
        declarationAgentResponse: state.declaration.appState.declarationAgentResponse,
        declarationAgentRequest: state.declaration.appState.declarationAgentRequest,
        meansOfTransportAndCountry:
          state.declaration.appState.declarationAgentRequest.meansOfTransportAndCountry,
      }),
      shallow,
    );

  const amountProducts = declarationAgentResponse?.amountProducts;
  const valueProducts = declarationAgentResponse?.valueProducts;
  const customProducts = declarationAgentResponse?.customProducts;

  const [isAvailableToEdit, setIsAvailableToEdit] = useState<boolean>(false);

  useEffect(() => {
    if (valueProducts && valueProducts.length === 0) setIsAvailableToEdit(false);
  }, [valueProducts]);

  const totalProducts =
    (valueProducts?.length ?? 0) + (amountProducts?.length ?? 0) + (customProducts?.length ?? 0);

  if (totalProducts < 1) {
    return null;
  }

  console.log('declarationAgentResponse', declarationAgentResponse);

  return (
    <>
      <div className="flex flex-col gap-10 pb-10">
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-row justify-between items-center mb-1">
            <Typography color="black" size="text-xs">
              Marchandises <b>{totalProducts}</b>
            </Typography>
            {totalProducts > 0 && (
              <Typography
                color={isAvailableToEdit ? 'black' : 'primary'}
                colorGradient="400"
                size="text-xs"
                onClick={() => setIsAvailableToEdit(!isAvailableToEdit)}
              >
                <span className="cursor-pointer">{isAvailableToEdit ? 'Annuler' : 'Modifier'}</span>
              </Typography>
            )}
          </div>
          {((valueProducts?.length ?? 0) > 0 || (customProducts?.length ?? 0) > 0) && (
            <>
              {valueProducts && (valueProducts.length ?? 0) > 0 && (
                <div className="flex flex-wrap gap-5">
                  {valueProducts.map((product, index) => (
                    <div className="w-72" key={`${product.id}-${index}`}>
                      <ValueAgentProductBasket
                        product={product}
                        nomenclatures={[]}
                        editable={isAvailableToEdit}
                        onDelete={onRemoveCartProduct}
                        detailsButton
                        onEditClick={onModifyClick}
                        withCalculation={declarationAgentResponse.canCalculateTaxes}
                      />
                    </div>
                  ))}
                </div>
              )}
              {customProducts && customProducts.length > 0 && (
                <div className="flex flex-wrap gap-5">
                  {customProducts.map((product, index) => (
                    <div className="w-72" key={`${product.id}-${index}`}>
                      <ValueAgentProductBasket
                        product={product}
                        nomenclatures={[]}
                        editable={isAvailableToEdit}
                        onDelete={onRemoveCartProduct}
                        detailsButton
                        onEditClick={onModifyClick}
                        withCalculation={declarationAgentResponse.canCalculateTaxes}
                      />
                    </div>
                  ))}
                </div>
              )}
              {declarationAgentResponse?.canCalculateTaxes && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <Typography weight="bold" size="text-sm">
                    Détail des taxes marchandises
                  </Typography>
                  {[...(valueProducts || []), ...(customProducts || [])].map((product, index) => (
                    <div
                      key={`tax-${product.id}-${index}`}
                      className="flex justify-between text-sm mb-1"
                    >
                      <span>{product.name}</span>
                      <span>{Math.round(product.unitTaxesRounded || 0).toFixed(2)} €</span>
                    </div>
                  ))}
                  <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between font-bold">
                    <span>Total taxes marchandises</span>
                    <span>
                      {Math.round(
                        [...(valueProducts || []), ...(customProducts || [])].reduce(
                          (sum, product) => sum + (product.unitTaxesRounded || 0),
                          0,
                        ),
                      ).toFixed(2)}{' '}
                      €
                    </span>
                  </div>
                </div>
              )}
            </>
          )}
          {amountProducts &&
            amountProducts.map((amountProduct, index) => {
              if (amountProduct.group === 'allTobaccoProducts') {
                return (
                  <div key={`${amountProduct.group}-${index}`}>
                    <AmountAgentProductBasketGroup
                      amountProductGroup={amountProduct}
                      country={meansOfTransportAndCountry.country}
                      border={declarationAgentRequest.border}
                      onDelete={onRemoveCartProduct}
                      editable={isAvailableToEdit}
                      onModifyClick={onModifyClick}
                      tobaccoTax={declarationAgentResponse.tobaccoTaxRounded}
                    />

                    {declarationAgentResponse.tobaccoTaxDetails &&
                      declarationAgentResponse.tobaccoTaxDetails.length > 0 && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <Typography weight="bold" size="text-sm">
                            Détail des taxes tabac
                          </Typography>
                          {declarationAgentResponse.tobaccoTaxDetails.map((detail, indexDetail) => (
                            <div
                              key={`${indexDetail}-${detail.type}`}
                              className="flex justify-between text-sm mb-1"
                            >
                              <span>
                                {detail.type} ({detail.amount} unités)
                              </span>
                              <span>{detail.tax.toFixed(2)} €</span>
                            </div>
                          ))}
                          <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between font-bold">
                            <span>Total taxes tabac</span>
                            <span>
                              {declarationAgentResponse.tobaccoTaxRounded?.toFixed(2) ?? '0.00'} €
                            </span>
                          </div>
                        </div>
                      )}
                  </div>
                );
              }
              return (
                <div key={`${amountProduct.group}-${index}`}>
                  <AmountAgentProductBasketGroup
                    amountProductGroup={amountProduct}
                    country={meansOfTransportAndCountry.country}
                    border={declarationAgentRequest.border}
                    onDelete={onRemoveCartProduct}
                    editable={isAvailableToEdit}
                    onModifyClick={onModifyClick}
                    alcoholTax={declarationAgentResponse.alcoholTaxRounded}
                  />

                  {declarationAgentResponse.alcoholTaxDetails &&
                    declarationAgentResponse.alcoholTaxDetails.length > 0 &&
                    index === amountProducts.length - 1 && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <Typography weight="bold" size="text-sm">
                          Détail des taxes alcool
                        </Typography>
                        {declarationAgentResponse.alcoholTaxDetails.map((detail, indexDetail) => (
                          <div
                            key={`${indexDetail}-${detail.type}`}
                            className="flex justify-between text-sm mb-1"
                          >
                            <span>
                              {detail.type} ({detail.amount} unités)
                            </span>
                            <span>{detail.tax.toFixed(2)} €</span>
                          </div>
                        ))}
                        <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between font-bold">
                          <span>Total taxes alcool</span>
                          <span>
                            {declarationAgentResponse.alcoholTaxRounded?.toFixed(2) ?? '0.00'} €
                          </span>
                        </div>
                      </div>
                    )}
                </div>
              );
            })}
        </div>

        <Button
          type="submit"
          className={{
            'self-center': true,
            'md:w-[226px]': true,
            'md:h-[34px]': true,
            'md:text-xs': true,
          }}
        >
          Valider les marchandises
        </Button>
      </div>
    </>
  );
};
