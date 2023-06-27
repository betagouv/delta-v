import { DeclarationStatus } from './declarationStatus.util';
import { getMeanOfTransportsLabel } from './meanOfTransports.util';
import { MeansOfTransport } from '@/stores/simulator/appState.store';

export interface FilterOptions {
  value: string;
  id: string;
}

const declarationStatus = [
  { id: DeclarationStatus.PAID, value: 'Quittance' },
  { id: DeclarationStatus.SUBMITTED, value: 'En attente de validation' },
  { id: DeclarationStatus.VALIDATED, value: 'En attente de paiement' },
  { id: DeclarationStatus.ERROR, value: 'Non conforme pour erreur' },
  { id: DeclarationStatus.LITIGATION, value: 'Non conforme pour contentieux' },
];

export const FILTER_STATUS: FilterOptions[] = declarationStatus;

export const FILTER_MEANS_OF_TRANSPORT: FilterOptions[] = Object.values(MeansOfTransport).map(
  (value) => ({
    value: getMeanOfTransportsLabel(value.toLocaleLowerCase() as MeansOfTransport),
    id: value.toLocaleLowerCase() as DeclarationStatus,
  }),
);
