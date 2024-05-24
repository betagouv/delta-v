import { faker } from '@faker-js/faker';
import type { Alpha2Code } from 'i18n-iso-countries';
import { AuthorType, AuthorTypeList } from '../../../src/api/common/enums/author.enum';
import { MeansOfTransport } from '../../../src/api/common/enums/meansOfTransport.enum';

export interface DeclarationData {
  declarationId: string;
  meanOfTransport: MeansOfTransport;
  age: number;
  border: boolean;
  country: Alpha2Code;
  authorType: AuthorType;
  declarantAddressStreet: string;
  declarantAddressPostalCode: string;
  declarantAddressCity: string;
  declarantEmail: string;
  declarantPhoneNumber: string;
  declarantFirstName: string;
  declarantLastName: string;
}

export const prepareDeclarationData = (): DeclarationData => {
  return {
    declarationId: faker.string.uuid(),
    meanOfTransport: faker.helpers.arrayElement([
      MeansOfTransport.TRAIN,
      MeansOfTransport.CAR,
      MeansOfTransport.OTHER,
    ]),
    age: faker.number.int({ min: 18, max: 99 }),
    border: false,
    country: 'US',
    authorType: faker.helpers.arrayElement(AuthorTypeList),
    declarantAddressStreet: faker.location.streetAddress(),
    declarantAddressPostalCode: faker.location.zipCode(),
    declarantAddressCity: faker.location.city(),
    declarantEmail: faker.internet.email(),
    declarantPhoneNumber: faker.phone.number(),
    declarantFirstName: faker.person.firstName(),
    declarantLastName: faker.person.lastName(),
  };
};
