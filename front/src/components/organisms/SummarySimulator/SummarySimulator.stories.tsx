import { Meta } from '@storybook/react';

import { SummarySimulator } from './SummarySimulator';
import {
  MeansOfTransport,
  ProductStatus,
  SimulatorRequest,
  SimulatorResponse,
} from '@/stores/simulator/appState.store';

export default {
  title: 'Components/Organisms/SummarySimulator',
  component: SummarySimulator,
} as Meta;

const simulatorRequest: SimulatorRequest = {
  age: 25,
  border: false,
  country: 'NA',
  meanOfTransport: MeansOfTransport.PLANE,
  shoppingProducts: [],
};

const simulatorResponse: SimulatorResponse = {
  franchiseAmount: 430,
  total: 600,
  totalTaxes: 30,
  canCalculateTaxes: true,
  totalTaxesRounded: 30,
  canCreateDeclaration: true,
  totalCustomDuty: 10,
  totalVat: 20,
  valueProducts: [
    {
      id: 'test',
      name: 'Vètements Adulte',
      customName: 'Jean Levis',
      customId: '12',
      customDuty: 0.05,
      vat: 0.1,
      unitPrice: 400,
      originalCurrency: 'EUR',
      originalPrice: 400,
      rateCurrency: 1,
      unitCustomDuty: 0,
      unitVat: 0,
      unitTaxes: 0,
      unitTaxesRounded: 0,
      status: ProductStatus.VALUE_PRODUCT,
      notManagedProduct: false,
    },
    {
      id: 'test2',
      name: 'Smartphone',
      customName: 'Iphone 11',
      customId: '13',
      customDuty: 0.05,
      vat: 0.1,
      unitPrice: 200,
      originalCurrency: 'EUR',
      originalPrice: 200,
      rateCurrency: 1,
      unitCustomDuty: 10,
      unitVat: 20,
      unitTaxes: 30,
      unitTaxesRounded: 30,
      status: ProductStatus.VALUE_PRODUCT,
      notManagedProduct: false,
    },
  ],
};

export const base = (): JSX.Element => (
  <div className="p-3">
    <br />
    <SummarySimulator simulatorRequest={simulatorRequest} simulatorResponse={simulatorResponse} />
    <br />
  </div>
);
