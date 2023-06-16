import { faker } from '@faker-js/faker';
import { declarationSerializer } from '../../../../src/api/declaration/common/serializer/declarationSerializer';
import { declarationEntityFactory } from '../../../helpers/factories/declaration.factory';
describe('Declaration serializer', () => {
  it('should serialize data', () => {
    const oneDeclaration = declarationEntityFactory({
      id: faker.string.uuid(),
    });

    const result = declarationSerializer(oneDeclaration);

    expect(result).toMatchObject({
      id: oneDeclaration.id,
      publicId: oneDeclaration.publicId,
      products: [
        {
          originalCurrency: oneDeclaration.products[0].currency,
          rateCurrency: oneDeclaration.products[0].rateCurrency,
          customId: oneDeclaration.products[0].customId,
          customName: oneDeclaration.products[0].customName,
          id: oneDeclaration.products[0].id,
          originalPrice: oneDeclaration.products[0].originalValue,
          unitPrice: oneDeclaration.products[0].value,
          vat: oneDeclaration.products[0].vat,
          customDuty: oneDeclaration.products[0].customDuty,
          unitCustomDuty: oneDeclaration.products[0].calculatedCustomDuty,
          unitVat: oneDeclaration.products[0].calculatedVat,
          unitTaxes: oneDeclaration.products[0].calculatedTaxes,
        },
      ],
      history: oneDeclaration.history,
      versionDate: oneDeclaration.versionDate,
      authorType: oneDeclaration.authorType,
      authorFullName: oneDeclaration.authorFullName,
      authorEmail: oneDeclaration.authorEmail,
      authorId: oneDeclaration.authorId,
      status: oneDeclaration.status,
      declarantFirstName: oneDeclaration.declarantFirstName,
      declarantLastName: oneDeclaration.declarantLastName,
      declarantAddressStreet: oneDeclaration.declarantAddressStreet,
      declarantAddressPostalCode: oneDeclaration.declarantAddressPostalCode,
      declarantAddressCity: oneDeclaration.declarantAddressCity,
      declarantEmail: oneDeclaration.declarantEmail,
      declarantPhoneNumber: oneDeclaration.declarantPhoneNumber,
      declarantBorder: oneDeclaration.declarantBorder,
      declarantAge: oneDeclaration.declarantAge,
      declarantCountry: oneDeclaration.declarantCountry,
      declarantMeanOfTransport: oneDeclaration.declarantMeanOfTransport,
      totalVatAmount: oneDeclaration.totalVatAmount,
      totalCustomDutyAmount: oneDeclaration.totalCustomDutyAmount,
      totalTaxesAmount: oneDeclaration.totalTaxesAmount,
      franchiseAmount: oneDeclaration.franchiseAmount,
      totalAmount: oneDeclaration.totalAmount,
    });
  });
});
