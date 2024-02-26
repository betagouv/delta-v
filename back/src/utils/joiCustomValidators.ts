import { MeansOfTransport } from '../api/common/enums/meansOfTransport.enum';
import { DeclarationStatus } from '../entities/declaration.entity';
import { NewsTags } from '../entities/news.entity';

export interface IJoiCustomValidatorsResponse {
  isValid: boolean;
  messages: string[];
}

export interface IValidateListResponse {
  isValid: boolean;
  str: string;
}

export const validateStatus = (value: string): IJoiCustomValidatorsResponse => {
  const { isValid, str } = validateList(value, Object.values(DeclarationStatus));
  const messages = str
    .split(',')
    .map(
      (m: string) =>
        `${m} is not a valid status. Valid statuses are: ${Object.values(DeclarationStatus).join(
          ', ',
        )}`,
    );

  return {
    isValid,
    messages,
  };
};
export const validateMeanOfTransports = (value: string): IJoiCustomValidatorsResponse => {
  const { isValid, str } = validateList(value, Object.values(MeansOfTransport));
  const messages = str
    .split(',')
    .map(
      (m: string) =>
        `${m} is not a valid mean of transport. Valid means of transport are: ${Object.values(
          MeansOfTransport,
        ).join(', ')}`,
    );

  return {
    isValid,
    messages,
  };
};
export const validateNewsTags = (value: string): IJoiCustomValidatorsResponse => {
  const { isValid, str } = validateList(value, Object.values(NewsTags));
  const messages = str
    .split(',')
    .map(
      (m: string) =>
        `${m} is not a valid tag. Valid tags are: ${Object.values(NewsTags).join(', ')}`,
    );

  return {
    isValid,
    messages,
  };
};

const validateList = (str: string, arrayAllowed: string[]): IValidateListResponse => {
  const spl: string[] = str.trim().split(',');
  const newSpl = spl.filter((s) => s !== '');
  let isValid = true;
  const invalids: string[] = [];
  for (const s of newSpl) {
    if (!arrayAllowed.includes(s)) {
      isValid = false;
      invalids.push(s);
    }
  }
  return {
    isValid,
    str: isValid ? '' : invalids.join(','),
  };
};
