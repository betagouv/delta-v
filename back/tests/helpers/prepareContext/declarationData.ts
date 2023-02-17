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
  declarantAddress: string;
  declarantEmail: string;
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
    declarantAddress: faker.address.streetAddress(),
    declarantEmail: faker.internet.email(),
    declarantFirstName: faker.name.firstName(),
    declarantLastName: faker.name.lastName(),
  };
};
