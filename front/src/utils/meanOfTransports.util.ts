import { MeansOfTransport } from '@/stores/declaration/appState.store';

export enum DeclarationStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  VALIDATED = 'validated',
  PAID = 'paid',
  ERROR = 'refused-error',
  LITIGATION = 'refused-litigation',
}

export const getMeanOfTransportsLabel = (meanOfTransports: MeansOfTransport): string => {
  switch (meanOfTransports) {
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
      return '';
  }
};

export const getDeclarationStatusColor = (status: DeclarationStatus): string => {
  switch (status) {
    case DeclarationStatus.SUBMITTED:
      return 'bg-[#B45FFA]';
    case DeclarationStatus.VALIDATED:
      return 'bg-[#B45FFA]';
    case DeclarationStatus.PAID:
      return 'bg-[#5FB1FA]';
    case DeclarationStatus.ERROR:
      return 'bg-[#7A54DE]';
    case DeclarationStatus.LITIGATION:
      return 'bg-[#7A54DE]';
    default:
      return '';
  }
};

export const getDeclarationStatusIcon = (status: DeclarationStatus): string => {
  switch (status) {
    case DeclarationStatus.SUBMITTED:
      return 'clock';
    case DeclarationStatus.VALIDATED:
      return 'clock';
    case DeclarationStatus.PAID:
      return 'checkmark';
    case DeclarationStatus.ERROR:
      return 'loop2';
    case DeclarationStatus.LITIGATION:
      return 'cancel-circle';
    default:
      return '';
  }
};
