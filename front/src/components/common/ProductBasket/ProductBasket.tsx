import React from 'react';

import { Disclosure } from '@headlessui/react';
import dayjs from 'dayjs';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { Typography } from '../Typography';
import { BasketProduct } from '@/stores/simulator/appState.store';

interface ProductBasketProps {
  basketProduct: BasketProduct;
  onUpdateProduct: () => void;
  onDeleteProduct: () => void;
}

export const ProductBasket: React.FC<ProductBasketProps> = ({
  basketProduct,
  onUpdateProduct,
  onDeleteProduct,
}: ProductBasketProps) => {
  const { shoppingProduct, detailedProduct } = basketProduct;

  return (
    <div className="w-full divide-y-2 divide-dashed rounded-xl border">
      <div className="p-3 leading-tight">
        <div className="flex">
          <div className="flex-1 leading-none">
            {shoppingProduct.product?.name ? (
              <Typography weight="bold" color="secondary" size="text-lg" lineHeight="leading-tight">
                {shoppingProduct.product?.name}
              </Typography>
            ) : (
              <div className="flex flex-row items-center">
                <div className="mr-1 flex h-2 w-2 text-link">
                  <Icon name="point" size="xs" />
                </div>
                <Typography
                  weight="bold"
                  color="secondary"
                  size="text-lg"
                  lineHeight="leading-tight"
                >
                  Nouvelle marchandise
                </Typography>
              </div>
            )}
          </div>
          <Typography weight="extrabold" color="secondary" size="text-lg" lineHeight="leading-none">
            {shoppingProduct.price} €
          </Typography>
        </div>
        <Typography weight="light" color="light-gray" size="text-base">
          {shoppingProduct.name}
        </Typography>
      </div>
      <div>
        <Disclosure as="div">
          {({ open }) => (
            <div className="divide-y-2 divide-dashed">
              <Disclosure.Panel>
                <Disclosure.Button className="w-full px-4 py-5">
                  <div className="flex">
                    <div className="flex-1 text-left">
                      <Typography weight="normal" color="secondary" size="text-base">
                        Conversion en €
                      </Typography>
                    </div>
                    <div className="mt-[2px] ml-3">
                      <Icon size="xl" name="chevron-thin-up" />
                    </div>
                  </div>
                  <div className="p-6 text-left">
                    <Typography size="text-base">{`Calcul de la convertion € > €`}</Typography>
                    <div className="leading-none">
                      <Typography color="light-gray" size="text-base">
                        Taux 1 au {dayjs().format('DD/MM/YYYY')}
                      </Typography>
                    </div>
                    <div className="flex flex-row leading-none">
                      <Typography color="secondary" size="text-base">
                        {shoppingProduct.price} x 1 =
                      </Typography>
                      <div className="ml-1">
                        <Typography color="primary" size="text-base">
                          {shoppingProduct.price} €
                        </Typography>
                      </div>
                    </div>
                    {detailedProduct && (
                      <>
                        <div className="mt-2">
                          <Typography color="primary" size="text-base">
                            Calcul de la TVA
                          </Typography>
                        </div>
                        <div className="flex flex-row">
                          <Typography color="primary" size="text-base">
                            {detailedProduct.unitPrice}
                          </Typography>
                          <div className="ml-1">
                            <Typography color="secondary" size="text-base">
                              x {detailedProduct.vat}% =
                            </Typography>
                          </div>
                          <div className="ml-1">
                            <Typography color="primary" size="text-base">
                              {detailedProduct?.unitVat} €
                            </Typography>
                          </div>
                        </div>
                        <div className="mt-2">
                          <Typography color="primary" size="text-base">
                            Calcul des droits de douanes
                          </Typography>
                        </div>
                        <div className="flex flex-row">
                          <Typography color="primary" size="text-base">
                            {detailedProduct?.unitPrice ?? shoppingProduct.price}
                          </Typography>
                          <div className="ml-1">
                            <Typography color="secondary" size="text-base">
                              x {detailedProduct?.customDuty}% =
                            </Typography>
                          </div>
                          <div className="ml-1">
                            <Typography color="primary" size="text-base">
                              {detailedProduct?.unitCustomDuty} €
                            </Typography>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex items-end">
                    <div className="flex-1" />
                    <div className="mb-[2px]">
                      <Typography color="secondary" size="text-base">
                        TOTAL
                      </Typography>
                    </div>
                    <div className="ml-5 content-end">
                      <Typography color="primary" size="text-xl">
                        {detailedProduct ? `${shoppingProduct.price}€` : 'non renseigné'}
                      </Typography>
                    </div>
                  </div>
                </Disclosure.Button>
              </Disclosure.Panel>
              <Disclosure.Button className="w-full" disabled={open}>
                <div className="flex p-3">
                  {!open ? (
                    <>
                      <div className="flex-1 text-left">
                        <Typography weight="normal" color="secondary">
                          Conversion en €
                        </Typography>
                      </div>
                      <Typography weight="normal" color="primary" size="text-lg">
                        {shoppingProduct.price} €
                      </Typography>
                      <div className="mt-[2px] ml-3">
                        <Icon size="xl" name="chevron-thin-down" />
                      </div>
                    </>
                  ) : (
                    <div className="flex w-full gap-5">
                      <Button fullWidth variant="outlined" onClick={onUpdateProduct}>
                        Modifier
                      </Button>
                      <Button fullWidth icon="bin" iconPosition="right" onClick={onDeleteProduct}>
                        Supprimer
                      </Button>
                    </div>
                  )}
                </div>
              </Disclosure.Button>
            </div>
          )}
        </Disclosure>
      </div>
    </div>
  );
};
