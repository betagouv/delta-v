import { faker } from '@faker-js/faker';
import {
  DeclarationEntityInterface,
  DeclarationStatus,
} from '../../../../src/entities/declaration.entity';
import { ShoppingProduct } from '../../../../src/entities/productTaxes.entity';
import { currencyEntityFactory } from '../../../helpers/factories/currency.factory';
import { productEntityFactory } from '../../../helpers/factories/product.factory';
import { prepareDeclarationData } from '../../../helpers/prepareContext/declarationData';
import { currencyRepositoryMock } from '../../../mocks/currency.repository.mock';
import { declarationRepositoryMock } from '../../../mocks/declaration.repository.mock';
import { productRepositoryMock } from '../../../mocks/product.repository.mock';
import { eventEmitterMock } from '../../../mocks/eventEmitter.mock';
import { service } from '../../../../src/api/declaration/putDeclaration/service';

describe('test put declaration service', () => {
  it('should save declaration', async () => {
    const declarationData = prepareDeclarationData();
    const product1 = productEntityFactory({ customDuty: 12, vat: 20 });
    const product2 = productEntityFactory({ customDuty: 5, vat: 20 });
    const product3 = productEntityFactory({
      customDuty: 5,
      vat: 20,
    });
    const shoppingProduct1: ShoppingProduct = {
      id: product1.id,
      customId: faker.string.uuid(),
      customName: 'product 1',
      originalValue: 85,
      currency: 'EUR',
    };
    const shoppingProduct2: ShoppingProduct = {
      customId: faker.string.uuid(),
      id: product2.id,
      originalValue: 40,
      currency: 'USD',
    };
    const shoppingProduct3: ShoppingProduct = {
      customId: faker.string.uuid(),
      customName: 'product 3',
      id: product3.id,
      originalValue: 300,
      currency: 'EUR',
    };

    const productRepository = productRepositoryMock({
      getManyByIds: [product1, product2, product3],
    });

    const currencyRepository = currencyRepositoryMock({
      getManyByIds: [
        currencyEntityFactory({ id: 'EUR', value: 1 }),
        currencyEntityFactory({ id: 'USD', value: 1.2 }),
      ],
    });

    const declarationRepository = declarationRepositoryMock({
      createOne: undefined,
    });

    const authorEmail = faker.internet.email();
    const authorId = faker.string.uuid();

    await service({
      ...declarationData,
      authorEmail,
      authorId,
      shoppingProducts: [shoppingProduct1, shoppingProduct2, shoppingProduct3],
      productRepository,
      currencyRepository,
      declarationRepository,
      eventEmitter: eventEmitterMock,
    });

    const expectedDeclaration: DeclarationEntityInterface = {
      authorEmail,
      canCalculateTaxes: true,
      authorType: declarationData.authorType,
      authorId,
      declarantAddressStreet: declarationData.declarantAddressStreet,
      declarantAddressPostalCode: declarationData.declarantAddressPostalCode,
      declarantAddressCity: declarationData.declarantAddressCity,
      declarantEmail: declarationData.declarantEmail,
      declarantPhoneNumber: declarationData.declarantPhoneNumber,
      declarantFirstName: declarationData.declarantFirstName,
      declarantLastName: declarationData.declarantLastName,
      id: declarationData.declarationId,
      publicId: expect.any(String),
      status: DeclarationStatus.SUBMITTED,
      versionDate: expect.any(Date),
      history: [],
      declarantMeanOfTransport: declarationData.meanOfTransport,
      declarantCountry: declarationData.country,
      declarantAge: declarationData.age,
      declarantBorder: declarationData.border,
      franchiseAmount: 300,
      totalAmount: 418.33,
      products: expect.any(Array),
      totalCustomDutyAmount: 2.96,
      totalVatAmount: 24.26,
      totalTaxesAmount: 27.22,
    };
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(declarationRepository.createOne).toBeCalledWith(expectedDeclaration);
  });
});
