import { faker } from '@faker-js/faker';
import { Alpha2Code } from 'i18n-iso-countries';
import { AuthorType, AuthorTypeList } from '../../../src/api/common/enums/author.enum';
import { MeansOfTransport } from '../../../src/api/common/enums/meansOfTransport.enum';

export interface DeclarationData {
  declarationId: string;
  meanOfTransport: MeansOfTransport;
  age: number;
  border: boolean;
  country: Alpha2Code;
  authorEmail: string;
  authorFullName: string;
  authorId: string;
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
    declarationId: faker.datatype.uuid(),
    meanOfTransport: faker.helpers.arrayElement([
      MeansOfTransport.TRAIN,
      MeansOfTransport.CAR,
      MeansOfTransport.OTHER,
    ]),
    age: faker.datatype.number({ min: 18, max: 99, precision: 1 }),
    border: false,
    country: 'US',
    authorEmail: faker.internet.email(),
    authorFullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    authorId: faker.datatype.uuid(),
    authorType: faker.helpers.arrayElement(AuthorTypeList),
    declarantAddressStreet: faker.address.streetAddress(),
    declarantAddressPostalCode: faker.address.zipCode(),
    declarantAddressCity: faker.address.city(),
    declarantEmail: faker.internet.email(),
    declarantPhoneNumber: faker.phone.number(),
    declarantFirstName: faker.name.firstName(),
    declarantLastName: faker.name.lastName(),
  };
};
