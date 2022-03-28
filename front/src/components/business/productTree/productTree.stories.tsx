import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta } from '@storybook/react';

import { Product, ProductTree } from './productTree';

export default {
  title: 'Components/Business/productTree',
  component: ProductTree,
} as Meta;

export const WithVariant = () => {
  const products: Product = {
    id: '691e3721-0f5a-49c2-ae96-b1063db2bf33',
    name: 'Bijouterie',
    info: 'Cela compose les bijoux',
    childrenQuestion: 'Quel type de produits ?',
    customDuty: null,
    vat: null,
    nomenclatures: ['71', '91'],
    subProducts: [
      {
        id: 'ae81eba5-1199-4df3-a8c0-2b717b799555',
        name: 'Bijoux',
        info: 'Bijoux',
        childrenQuestion: 'Est-ce de la bijouterie fantaisie ou en métaux précieux ?',
        customDuty: null,
        vat: null,
        nomenclatures: ['7117', '7113'],
        subProducts: [
          {
            id: '32901991-257d-47f2-b209-a9d4af2026e3',
            name: 'Bijoux fantaisie',
            info: 'Bijoux fantaisie en métaux communs (même argentés, dorés ou platinés) ou autres.',
            childrenQuestion: null,
            customDuty: 4,
            vat: 20,
            nomenclatures: ['71171100', '71171900', '71179000'],
            subProducts: [],
          },
          {
            id: '04c1a6cd-881b-4d2c-b7dc-5e824d390b4d',
            name: 'Bijoux en métaux précieux',
            info: 'En métaux précieux ou revêtus, plaqués, doublés de métaux précieux (argent, or, platine ...)',
            childrenQuestion: null,
            customDuty: 2.5,
            vat: 20,
            nomenclatures: ['71171100', '71171900', '71179000'],
            subProducts: [],
          },
        ],
      },
      {
        id: 'd97c1392-01f1-423b-afd6-982fe79856df',
        name: 'Montres',
        info: 'Montres',
        childrenQuestion: null,
        customDuty: 4.5,
        vat: 20,
        nomenclatures: ['9101', '9102'],
        subProducts: [],
      },
    ],
  };
  return <ProductTree product={products}></ProductTree>;
};
