import { IProcessor } from 'typeorm-fixtures-cli';
import { faker } from '@faker-js/faker';
import { DeclarationEntity, DeclarationStatus } from '../../src/entities/declaration.entity';
import { AuthorType } from '../../src/api/common/enums/author.enum';
import { MeansOfTransport } from '../../src/api/common/enums/meansOfTransport.enum';

const preProcessDeclarationFixture = (fields: DeclarationEntity): Partial<DeclarationEntity> => {
  const { ...values } = fields;
  return {
    ...values,
    id: faker.string.uuid(),
    publicId: faker.string.nanoid(21),
    versionDate: faker.date.past(),
    status: faker.helpers.arrayElement([
      DeclarationStatus.SUBMITTED,
      DeclarationStatus.VALIDATED,
      DeclarationStatus.REFUSED_LITIGATION,
      DeclarationStatus.REFUSED_ERROR,
      DeclarationStatus.PAID,
    ]),
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
    declarantMeanOfTransport: faker.helpers.arrayElement(Object.values(MeansOfTransport)),
    totalVatAmount: faker.number.float({ precision: 0.01 }),
    totalCustomDutyAmount: faker.number.float({ precision: 0.01 }),
    totalTaxesAmount: faker.number.float({ precision: 0.01 }),
    franchiseAmount: faker.number.float({ precision: 0.01 }),
    totalAmount: faker.number.float({ precision: 0.01 }),
    authorType: faker.helpers.arrayElement(Object.values(AuthorType)),
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

export default class DeclarationProcessor implements IProcessor<DeclarationEntity> {
  preProcess(name: string, fields: DeclarationEntity): Partial<DeclarationEntity> {
    return preProcessDeclarationFixture(fields);
  }
}
