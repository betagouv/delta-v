import React from 'react';

import { Disclosure } from '@headlessui/react';
import dayjs from 'dayjs';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { Typography } from '../Typography';
import { ShoppingProduct } from '@/stores/simulator/appState.store';

interface ProductBasketProps {
  shoppingProduct: ShoppingProduct;
  onUpdateProduct: () => void;
  onDeleteProduct: () => void;
}

export const ProductBasket: React.FC<ProductBasketProps> = ({
  shoppingProduct,
  onUpdateProduct,
  onDeleteProduct,
}: ProductBasketProps) => {
  return (
    <div className="w-full divide-y-2 divide-dashed rounded-xl border">
      <div className="p-3 leading-tight">
        <div className="flex">
          <div className="flex-1 leading-none">
            <Typography
              weight="extrabold"
              color="secondary"
              size="text-lg"
              lineHeight="leading-none"
            >
              {shoppingProduct.product.name}
            </Typography>
          </div>
          <Typography weight="extrabold" color="secondary" size="text-lg" lineHeight="leading-none">
            {shoppingProduct.price} €
          </Typography>
        </div>
        <Typography weight="light" color="light-gray">
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
                      <Typography weight="normal" color="secondary">
                        Conversion en €
                      </Typography>
                    </div>
                    <div className="mt-[2px] ml-3">
                      <Icon size="xl" name="chevron-thin-up" />
                    </div>
                  </div>
                  <div className="p-5 text-left">
                    <Typography>{`Calcul de la convertion € > €`}</Typography>
                    <div className="leading-none">
                      <Typography color="light-gray">
                        Taux 1 au {dayjs().format('DD/MM/YYYY')}
                      </Typography>
                    </div>
                    <div className="flex flex-row leading-none">
                      <Typography color="secondary">{shoppingProduct.price} x 1 =</Typography>
                      <div className="ml-1">
                        <Typography color="primary"> {shoppingProduct.price} €</Typography>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Typography color="primary">Calcul de la TVA</Typography>
                    </div>
                    <div className="flex flex-row">
                      <Typography color="primary">{shoppingProduct.price}</Typography>
                      <div className="ml-1">
                        <Typography color="secondary">
                          {' '}
                          x {shoppingProduct.product.vat ?? 0}% =
                        </Typography>
                      </div>
                      <div className="ml-1">
                        <Typography color="primary">
                          {((shoppingProduct.product.vat ?? 0) * shoppingProduct.price) / 100} €
                        </Typography>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Typography color="primary">Calcul des droits de douanes</Typography>
                    </div>
                    <div className="flex flex-row">
                      <Typography color="primary">{shoppingProduct.price}</Typography>
                      <div className="ml-1">
                        <Typography color="secondary">
                          {' '}
                          x {shoppingProduct.product.customDuty ?? 0}% =
                        </Typography>
                      </div>
                      <div className="ml-1">
                        <Typography color="primary">
                          {((shoppingProduct.product.customDuty ?? 0) * shoppingProduct.price) /
                            100}{' '}
                          €
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end">
                    <div className="flex-1" />
                    <div className="mb-[2px]">
                      <Typography color="secondary">TOTAL</Typography>
                    </div>
                    <div className="ml-5 content-end">
                      <Typography color="primary" size="text-xl">
                        {shoppingProduct.price} €
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
