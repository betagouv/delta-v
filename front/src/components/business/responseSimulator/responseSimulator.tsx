import React from 'react';

import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import classNames from 'classnames';

interface Product {
  id: string;
  name: string;
  amount: number;
  unitPrice: number;
  totalPrice: number;
  totalCustomDuty: number;
  totalVat: number;
  totalTaxes: number;
  unitCustomDuty: number;
  unitVat: number;
  unitTaxes: number;
  customDuty: number;
  vat: number;
}

export interface ResponseData {
  products?: Product[];
  total: number;
  totalCustomDuty: number;
  totalVat: number;
  totalTaxes: number;
  franchiseAmount: number;
}

interface ResponseSimulatorProps {
  response?: ResponseData;
}

export const ResponseSimulator: React.FC<ResponseSimulatorProps> = ({ response }) => {
  return (
    <>
      {response && (
        <>
          <div className="relative mt-12">
            <div className="inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300" />
            </div>
          </div>
          {response.products && response.products.length >= 0 && (
            <div className="mt-10 text-2xl">Liste des produits</div>
          )}
          {response.products &&
            response.products.map((product, index) => (
              <Disclosure as="div" key={index} className="pt-6">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400">
                      <div className="text-base font-bold">{product.name}</div>
                      <span className="ml-6 flex h-7 items-center">
                        <ChevronDownIcon
                          className={classNames(
                            open ? '-rotate-180' : 'rotate-0',
                            'h-6 w-6 transform',
                          )}
                          aria-hidden="true"
                        />
                      </span>
                    </Disclosure.Button>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <div className="text-sm">Nombre : {product.amount}</div>
                      <div className="text-sm">Prix unitaire : {product.unitPrice}€</div>
                      <div className="mb-2 text-sm">Prix total : {product.totalPrice}€</div>
                      <div className="text-sm">Montant unitaire TVA : {product.unitVat}€</div>
                      <div className="text-sm">
                        Montant unitaire droit de douane : {product.unitCustomDuty}€
                      </div>
                      <div className="mb-2 text-sm font-semibold">
                        Montant unitaire taxes : {product.unitTaxes}€
                      </div>
                      <div className="text-sm">Total TVA : {product.totalVat}€</div>
                      <div className="text-sm">
                        Total droit de douane : {product.totalCustomDuty}€
                      </div>
                      <div className="mb-2 text-sm font-semibold">
                        Total taxes : {product.totalTaxes}€
                      </div>
                      <div className="text-sm font-semibold">TVA apliqué : {product.vat}%</div>
                      <div className="text-sm font-semibold">
                        Droit de douane appliqué : {product.customDuty}%
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          <div className="mt-8">
            <div className="font-bold">Total des achats : {response.total}€</div>
            <div className="text-sm">Total droit de douane : {response.totalCustomDuty}€</div>
            <div className="text-sm">Total TVA : {response.totalVat}€</div>
            <div className="font-bold">Total Taxes : {response.totalTaxes}€</div>
            <div className="font-bold text-primary-900">
              Franchise : {response.franchiseAmount}€
            </div>
          </div>
        </>
      )}
    </>
  );
};
