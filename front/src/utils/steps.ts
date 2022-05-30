import { SimulateParams, SimulateSteps } from '@/stores/simulator.store';

export const getNextStep = (step: SimulateSteps, simulateParams: SimulateParams): SimulateSteps => {
  switch (step) {
    case SimulateSteps.AGE:
      return SimulateSteps.MEAN_OF_TRANSPORT;
    case SimulateSteps.MEAN_OF_TRANSPORT:
      return SimulateSteps.COUNTRY;
    case SimulateSteps.COUNTRY:
      if (simulateParams.meanOfTransport === 'car' && simulateParams.country === 'CH') {
        return SimulateSteps.BORDER;
      }
      return SimulateSteps.SHOPPING_PRODUCTS;
    case SimulateSteps.BORDER:
      return SimulateSteps.SHOPPING_PRODUCTS;
    default:
      return SimulateSteps.AGE;
  }
};
