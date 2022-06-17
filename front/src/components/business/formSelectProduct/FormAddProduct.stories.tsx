import { Meta } from '@storybook/react';

import { FormSelectProduct } from './FormSelectProduct';
import { Product, ProductDisplayTypes } from '@/model/product';

export default {
  title: 'Components/Business/FormSelectProduct',
  component: FormSelectProduct,
} as Meta;

export interface FormSimulatorData {
  price?: number;
  devise?: string;
}

const currentProduct: Product = {
  id: 'b47dab76-acca-4d78-ba3b-7323b17dcb8b',
  name: 'Vêtement pour adulte',
  icon: 'categoryAdultClothes',
  finalProduct: true,
  productDisplayTypes: ProductDisplayTypes.radio,
  info: 'Vêtement pour adulte.',
  childrenQuestion: 'Est-il en cuir ?',
  customDuty: null,
  vat: null,
  nomenclatures: null,
  subProducts: [
    {
      id: '98b58ced-de0c-40d9-95cc-8247fe63fe17',
      name: 'Oui',
      icon: undefined,
      finalProduct: false,
      productDisplayTypes: ProductDisplayTypes.addable,
      info: 'Vêtements adulte en cuir.',
      childrenQuestion: null,
      customDuty: 4,
      vat: 20,
      nomenclatures: ['42031000'],
      subProducts: [],
    },
    {
      id: '15edcc66-1123-47cb-855e-d0eae1233682',
      name: 'Non',
      icon: undefined,
      finalProduct: false,
      productDisplayTypes: ProductDisplayTypes.radio,
      info: 'Vêtements sans cuir.',
      childrenQuestion: 'Est-ce un soutiens-george, gaines, corsets, jarretelles ou jarretières ?',
      customDuty: null,
      vat: null,
      nomenclatures: ['4203'],
      subProducts: [
        {
          id: 'e6520fa8-8e59-4d57-ab98-3a5ad690ac5a',
          name: 'Oui',
          icon: undefined,
          finalProduct: false,
          productDisplayTypes: ProductDisplayTypes.addable,
          info: 'Soutiens-gorge, gaines, corsets, bretelles, jarretelles, jarretières, etc.',
          childrenQuestion: null,
          customDuty: 6.5,
          vat: 20,
          nomenclatures: ['6212'],
          subProducts: [],
        },
        {
          id: '4dbcac27-c57e-4c8f-befb-9c8092c1c450',
          name: 'Non',
          icon: undefined,
          finalProduct: false,
          productDisplayTypes: ProductDisplayTypes.addable,
          info: 'Vêtements adultes dans la liste suivante : \\n- Manteaux, cabans, capes,anoraks, blousons, etc. \\n- Costumes, complets, ensembles, vestons, pantalons, salopettes, shorts, survêtements, robes, jupes, etc. \\n- Chemises, chemisettes, chemisiers, blouses, T-shirts et maillots de corps, chandails, pull-overs, cardigans, gilets, etc. \\n- Slips, caleçons, chemises de nuit, pyjamas, peignoirs, robes de chambre, combinaisons, etc.',
          childrenQuestion: null,
          customDuty: 12,
          vat: 20,
          nomenclatures: null,
          subProducts: [],
        },
      ],
    },
  ],
};

export const base = (): JSX.Element => (
  <div className="p-3">
    <br />
    <FormSelectProduct
      currentProduct={currentProduct}
      onAddProduct={() => {
        // eslint-disable-next-line no-alert
        alert('click');
      }}
    />
    <br />
  </div>
);
