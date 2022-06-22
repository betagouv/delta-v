import { Status } from './services/getStatus.service';

export interface SerializedGetAverage {
  status: Status;
  average: number;
}

export const serializer = (status: Status, average: number): SerializedGetAverage => {
  return {
    status,
    average,
  };
};
