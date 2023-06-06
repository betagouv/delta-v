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
        age: faker.number.int({ min: 1, max: 100 }),
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
    id: faker.string.uuid(),
    publicId: faker.string.nanoid(21),
    versionDate: faker.date.past(),
    authorFullName: faker.person.fullName(),
    authorEmail: faker.internet.email(),
    authorId: faker.string.uuid(),
    status: DeclarationStatus.SUBMITTED,
    declarantFirstName: faker.person.firstName(),
    declarantLastName: faker.person.lastName(),
    declarantAddressStreet: faker.location.streetAddress(),
    declarantAddressPostalCode: faker.location.zipCode(),
    declarantAddressCity: faker.location.city(),
    declarantEmail: faker.internet.email(),
    declarantPhoneNumber: faker.phone.number(),
    declarantBorder: faker.datatype.boolean(),
    declarantAge: faker.number.int({ min: 1, max: 100 }),
    declarantCountry: 'ES',
    declarantMeanOfTransport: MeansOfTransport.CAR,
    totalVatAmount: faker.number.float({ precision: 0.01 }),
    totalCustomDutyAmount: faker.number.float({ precision: 0.01 }),
    totalTaxesAmount: faker.number.float({ precision: 0.01 }),
    franchiseAmount: faker.number.float({ precision: 0.01 }),
    totalAmount: faker.number.float({ precision: 0.01 }),
    authorType: AuthorType.user,
    products: [
      {
        id: faker.string.uuid(),
        name: faker.commerce.product(),
        customId: faker.string.uuid(),
        customName: faker.commerce.product(),
        originalValue: faker.number.float({ precision: 0.01 }),
        currency: faker.finance.currencyCode(),
        rateCurrency: faker.number.float({ precision: 0.01 }),
        calculatedCustomDuty: faker.number.float({ precision: 0.01 }),
        calculatedVat: faker.number.float({ precision: 0.01 }),
        calculatedTaxes: faker.number.float({ precision: 0.01 }),
        customDuty: faker.number.float({ precision: 0.01 }),
        value: faker.number.float({ precision: 0.01 }),
        vat: faker.number.float({ precision: 0.01 }),
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
