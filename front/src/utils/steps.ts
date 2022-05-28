import { SimulateSteps } from '@/stores/simulate.store';

export const getNextStep = (step: SimulateSteps): SimulateSteps => {
  switch (step) {
    case SimulateSteps.AGE:
      return SimulateSteps.MEAN_OF_TRANSPORT;
    case SimulateSteps.MEAN_OF_TRANSPORT:
      return SimulateSteps.COUNTRY;
    case SimulateSteps.COUNTRY:
      return SimulateSteps.BORDER;
    case SimulateSteps.BORDER:
      return SimulateSteps.SHOPING_PRODUCTS;
    default:
      return SimulateSteps.AGE;
  }
};
