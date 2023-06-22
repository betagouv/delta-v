import { DeclarationStatus, getDeclarationStatusLabel } from './declarationStatus.util';
import { getMeanOfTransportsLabel } from './meanOfTransports.util';
import { MeansOfTransport } from '@/stores/simulator/appState.store';

export interface FilterOptions {
  value: string;
  id: string;
}

export const FILTER_STATUS: FilterOptions[] = Object.values(DeclarationStatus).map((value) => ({
  value: getDeclarationStatusLabel(value.toLocaleLowerCase() as DeclarationStatus),
  id: value.toLocaleLowerCase() as DeclarationStatus,
}));

export const FILTER_MEANS_OF_TRANSPORT: FilterOptions[] = Object.values(MeansOfTransport).map(
  (value) => ({
    value: getMeanOfTransportsLabel(value.toLocaleLowerCase() as MeansOfTransport),
    id: value.toLocaleLowerCase() as DeclarationStatus,
  }),
);
