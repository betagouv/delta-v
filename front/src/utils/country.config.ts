import { MeansOfTransport } from '@/stores/simulator/appState.store';

export const getMeanOfTransport = (meanOfTransport?: MeansOfTransport): string => {
  switch (meanOfTransport) {
    case MeansOfTransport.BOAT:
      return 'Bateau';
    case MeansOfTransport.CAR:
      return 'Voiture';
    case MeansOfTransport.PLANE:
      return 'Avion';
    case MeansOfTransport.TRAIN:
      return 'Train';
    case MeansOfTransport.OTHER:
      return 'Autre';
    default:
      return 'Autre';
  }
};
