import { IProcessor } from 'typeorm-fixtures-cli';
import { faker } from '@faker-js/faker';
import {
  DeclarationEntity,
  DeclarationStatus,
  ProductDeclaration,
  ProductStatus,
} from '../../src/entities/declaration.entity';
import { AuthorType } from '../../src/api/common/enums/author.enum';
import { MeansOfTransport } from '../../src/api/common/enums/meansOfTransport.enum';
import { getRoundedNumber } from '../../src/utils/roundedNumber';

const preProcessDeclarationFixture = (fields: DeclarationEntity): Partial<DeclarationEntity> => {
  const { ...values } = fields;
  const products = [] as ProductDeclaration[];
  for (let i = 0; i < faker.number.int({ min: 1, max: 10 }); i++) {
    const value = faker.number.float({ multipleOf: 0.01, min: 0.01, max: 1000.0 });
    const originalValue = value * faker.number.float({ multipleOf: 0.01, max: 1000.0 });
    const vat = faker.number.float({ multipleOf: 0.01, min: 0.01, max: 1.0 });
    const customDuty = faker.number.float({ multipleOf: 0.01, min: 0.01, max: 1.0 });
    const currency = faker.finance.currencyCode();
    const rateCurrency = currency === 'EUR' ? 1 : faker.number.float({ multipleOf: 0.01 });
    const calculatedCustomDuty = value * customDuty * rateCurrency;
    const calculatedVat = value * vat * rateCurrency;
    const calculatedTaxes = calculatedCustomDuty + calculatedVat;
    const calculatedTaxesRounded = getRoundedNumber(calculatedTaxes);
    products.push({
      id: faker.string.uuid(),
      name: faker.commerce.product(),
      customId: faker.string.uuid(),
      customName: faker.commerce.product(),
      originalValue,
      currency,
      rateCurrency,
      calculatedCustomDuty,
      calculatedVat,
      calculatedTaxes,
      calculatedTaxesRounded,
      customDuty,
      value,
      vat,
      status: faker.helpers.arrayElement([
        ProductStatus.AMOUNT_PRODUCT,
        ProductStatus.CUSTOM_PRODUCT,
        ProductStatus.VALUE_PRODUCT,
      ]),
      notManagedProduct: faker.datatype.boolean(),
    });
  }

  const totalAmount = products.reduce((acc, product) => acc + product.value, 0);
  const franchiseAmount = products.reduce((acc, product) => acc + product.originalValue, 0);
  const totalVatAmount = products.reduce((acc, product) => acc + product.vat, 0);
  const totalCustomDutyAmount = products.reduce((acc, product) => acc + product.customDuty, 0);
  const totalTaxesAmount = products.reduce((acc, product) => acc + product.calculatedTaxes, 0);
  const totalTaxesRoundedAmount = getRoundedNumber(totalTaxesAmount);
  return {
    ...values,
    id: faker.string.uuid(),
    publicId: faker.string.nanoid(10),
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
    totalVatAmount,
    totalCustomDutyAmount,
    totalTaxesAmount,
    totalTaxesRoundedAmount,
    franchiseAmount,
    totalAmount,
    authorType: faker.helpers.arrayElement(Object.values(AuthorType)),
    products,
  };
};

export default class DeclarationProcessor implements IProcessor<DeclarationEntity> {
  preProcess(name: string, fields: DeclarationEntity): Partial<DeclarationEntity> {
    return preProcessDeclarationFixture(fields);
  }
}
