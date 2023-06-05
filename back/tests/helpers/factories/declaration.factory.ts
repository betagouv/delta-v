import { faker } from '@faker-js/faker';
import { AuthorType } from '../../../src/api/common/enums/author.enum';
import { MeansOfTransport } from '../../../src/api/common/enums/meansOfTransport.enum';
import { Declaration } from '../../../src/api/common/services/declaration';
import { DetailedShoppingProduct } from '../../../src/api/common/services/detailedShoppingProduct';
import { ShoppingProduct } from '../../../src/api/common/services/shoppingProducts';
import { TravelerData } from '../../../src/api/common/services/traveler';
import { buildFactory } from '../../../src/core/testHelpers';
import {
  DeclarationEntityInterface,
  DeclarationStatus,
} from '../../../src/entities/declaration.entity';
import { DetailedShoppingProductFactory } from './detailedShoppingProduct.factory';
import { ShoppingProductFactory } from './shoppingProduct.factory';

interface DeclarationFactoryOptions {
  travelerData?: Partial<TravelerData>;
  shoppingProducts?: ShoppingProduct[];
  detailedShoppingProducts?: DetailedShoppingProduct[];
}

export const DeclarationFactory = ({
  travelerData,
  shoppingProducts,
  detailedShoppingProducts,
}: DeclarationFactoryOptions): Declaration =>
  new Declaration({
    inputDeclaration: {
      travelerData: {
        age: faker.datatype.number({ min: 1, max: 100, precision: 1 }),
        border: faker.datatype.boolean(),
        country: 'FR',
        meanOfTransport: MeansOfTransport.PLANE,
        ...travelerData,
      },
      shoppingProducts: shoppingProducts ?? [ShoppingProductFactory()],
    },
    detailedShoppingProducts: detailedShoppingProducts ?? [DetailedShoppingProductFactory({})],
  });

const buildSchema = (): DeclarationEntityInterface => {
  return {
    id: faker.datatype.uuid(),
    publicId: faker.random.alphaNumeric(21),
    versionDate: faker.datatype.datetime(),
    authorFullName: faker.name.fullName(),
    authorEmail: faker.internet.email(),
    authorId: faker.datatype.uuid(),
    status: DeclarationStatus.SUBMITTED,
    declarantFirstName: faker.name.firstName(),
    declarantLastName: faker.name.lastName(),
    declarantAddressStreet: faker.address.streetAddress(),
    declarantAddressPostalCode: faker.address.zipCode(),
    declarantAddressCity: faker.address.city(),
    declarantEmail: faker.internet.email(),
    declarantPhoneNumber: faker.phone.number(),
    declarantBorder: faker.datatype.boolean(),
    declarantAge: faker.datatype.number({ min: 1, max: 100, precision: 1 }),
    declarantCountry: 'ES',
    declarantMeanOfTransport: MeansOfTransport.CAR,
    totalVatAmount: faker.datatype.number({ precision: 0.01 }),
    totalCustomDutyAmount: faker.datatype.number({ precision: 0.01 }),
    totalTaxesAmount: faker.datatype.number({ precision: 0.01 }),
    franchiseAmount: faker.datatype.number({ precision: 0.01 }),
    totalAmount: faker.datatype.number({ precision: 0.01 }),
    authorType: AuthorType.user,
    products: [
      {
        id: faker.datatype.uuid(),
        name: faker.commerce.product(),
        customId: faker.datatype.uuid(),
        customName: faker.commerce.product(),
        originalValue: faker.datatype.number({ precision: 0.01 }),
        currency: faker.finance.currencyCode(),
        rateCurrency: faker.datatype.number({ precision: 0.01 }),
        calculatedCustomDuty: faker.datatype.number({ precision: 0.01 }),
        calculatedVat: faker.datatype.number({ precision: 0.01 }),
        calculatedTaxes: faker.datatype.number({ precision: 0.01 }),
        customDuty: faker.datatype.number({ precision: 0.01 }),
        value: faker.datatype.number({ precision: 0.01 }),
        vat: faker.datatype.number({ precision: 0.01 }),
      },
    ],
  };
};

export const declarationEntityFactory = (
  args?: Partial<DeclarationEntityInterface>,
): DeclarationEntityInterface =>
  buildFactory<DeclarationEntityInterface>({
    ...buildSchema(),
  })(args);
