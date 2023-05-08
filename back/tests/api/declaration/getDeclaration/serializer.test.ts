import { faker } from '@faker-js/faker';
import serializer from '../../../../src/api/declaration/getDeclaration/serializer';
import { declarationEntityFactory } from '../../../helpers/factories/declaration.factory';

describe('getOneDeclaration serializer', () => {
  it('should serialize data', () => {
    const oneDeclaration = declarationEntityFactory({
      id: faker.datatype.uuid(),
    });

    const result = serializer(oneDeclaration);

    expect(result.declaration).toMatchObject({
      id: oneDeclaration.id,
      products: oneDeclaration.products,
      history: oneDeclaration.history,
      versionDate: oneDeclaration.versionDate,
      authorType: oneDeclaration.authorType,
      authorFullName: oneDeclaration.authorFullName,
      authorEmail: oneDeclaration.authorEmail,
      authorId: oneDeclaration.authorId,
      status: oneDeclaration.status,
      declarantFirstName: oneDeclaration.declarantFirstName,
      declarantLastName: oneDeclaration.declarantLastName,
      declarantAddress: oneDeclaration.declarantAddress,
      declarantEmail: oneDeclaration.declarantEmail,
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