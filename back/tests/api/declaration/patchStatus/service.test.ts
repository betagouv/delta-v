/* eslint-disable @typescript-eslint/unbound-method */
import { faker } from '@faker-js/faker';
import { ErrorCodes } from '../../../../src/api/common/enums/errorCodes.enum';
import { service } from '../../../../src/api/declaration/patchStatus/service';
import {
  DeclarationStatus,
  ProductDeclaration,
  ProductStatus,
} from '../../../../src/entities/declaration.entity';
import { declarationRepositoryMock } from '../../../mocks/declaration.repository.mock';
import { productRepositoryMock } from '../../../mocks/product.repository.mock';
import { prepareContext } from './prepareContext';

describe('test patchStatus service', () => {
  it.each([
    [DeclarationStatus.DRAFT, DeclarationStatus.SUBMITTED],
    [DeclarationStatus.DRAFT, DeclarationStatus.VALIDATED],
    [DeclarationStatus.DRAFT, DeclarationStatus.PAID],
    [DeclarationStatus.DRAFT, DeclarationStatus.REFUSED_ERROR],
    [DeclarationStatus.DRAFT, DeclarationStatus.REFUSED_LITIGATION],
    [DeclarationStatus.DRAFT, DeclarationStatus.SWITCH_PAPER],
    [DeclarationStatus.SUBMITTED, DeclarationStatus.VALIDATED],
    [DeclarationStatus.SUBMITTED, DeclarationStatus.PAID],
    [DeclarationStatus.SUBMITTED, DeclarationStatus.REFUSED_ERROR],
    [DeclarationStatus.SUBMITTED, DeclarationStatus.REFUSED_LITIGATION],
    [DeclarationStatus.SUBMITTED, DeclarationStatus.SWITCH_PAPER],
    [DeclarationStatus.VALIDATED, DeclarationStatus.PAID],
  ])('should patch status from "%p" to "%p"', async (initialStatus, newStatus) => {
    const { declarationRepository, productRepository, currentDeclaration } = prepareContext({
      initialStatus,
    });

    await service({
      declarationId: currentDeclaration.id,
      status: newStatus,
      declarationRepository,
      productRepository,
    });
    expect(declarationRepository.updateOne).toBeCalledWith(currentDeclaration.id, {
      status: newStatus,
    });
  });
  it.each([
    [DeclarationStatus.REFUSED_ERROR, DeclarationStatus.DRAFT],
    [DeclarationStatus.REFUSED_ERROR, DeclarationStatus.SUBMITTED],
    [DeclarationStatus.REFUSED_ERROR, DeclarationStatus.VALIDATED],
    [DeclarationStatus.REFUSED_ERROR, DeclarationStatus.PAID],
    [DeclarationStatus.REFUSED_ERROR, DeclarationStatus.REFUSED_ERROR],
    [DeclarationStatus.REFUSED_ERROR, DeclarationStatus.REFUSED_LITIGATION],
    [DeclarationStatus.REFUSED_ERROR, DeclarationStatus.SWITCH_PAPER],
    [DeclarationStatus.REFUSED_LITIGATION, DeclarationStatus.DRAFT],
    [DeclarationStatus.REFUSED_LITIGATION, DeclarationStatus.SUBMITTED],
    [DeclarationStatus.REFUSED_LITIGATION, DeclarationStatus.VALIDATED],
    [DeclarationStatus.REFUSED_LITIGATION, DeclarationStatus.PAID],
    [DeclarationStatus.REFUSED_LITIGATION, DeclarationStatus.REFUSED_ERROR],
    [DeclarationStatus.REFUSED_LITIGATION, DeclarationStatus.REFUSED_LITIGATION],
    [DeclarationStatus.REFUSED_LITIGATION, DeclarationStatus.SWITCH_PAPER],
    [DeclarationStatus.PAID, DeclarationStatus.DRAFT],
    [DeclarationStatus.PAID, DeclarationStatus.SUBMITTED],
    [DeclarationStatus.PAID, DeclarationStatus.VALIDATED],
    [DeclarationStatus.PAID, DeclarationStatus.PAID],
    [DeclarationStatus.PAID, DeclarationStatus.REFUSED_ERROR],
    [DeclarationStatus.PAID, DeclarationStatus.REFUSED_LITIGATION],
    [DeclarationStatus.PAID, DeclarationStatus.SWITCH_PAPER],
    [DeclarationStatus.SWITCH_PAPER, DeclarationStatus.DRAFT],
    [DeclarationStatus.SWITCH_PAPER, DeclarationStatus.SUBMITTED],
    [DeclarationStatus.SWITCH_PAPER, DeclarationStatus.VALIDATED],
    [DeclarationStatus.SWITCH_PAPER, DeclarationStatus.PAID],
    [DeclarationStatus.SWITCH_PAPER, DeclarationStatus.REFUSED_ERROR],
    [DeclarationStatus.SWITCH_PAPER, DeclarationStatus.REFUSED_LITIGATION],
    [DeclarationStatus.SWITCH_PAPER, DeclarationStatus.SWITCH_PAPER],
    [DeclarationStatus.VALIDATED, DeclarationStatus.DRAFT],
    [DeclarationStatus.VALIDATED, DeclarationStatus.SUBMITTED],
    [DeclarationStatus.VALIDATED, DeclarationStatus.VALIDATED],
    [DeclarationStatus.SUBMITTED, DeclarationStatus.DRAFT],
    [DeclarationStatus.SUBMITTED, DeclarationStatus.SUBMITTED],
    [DeclarationStatus.DRAFT, DeclarationStatus.DRAFT],
  ])(
    'should not patch status from "%p" to "%p" - bad changement status',
    async (initialStatus, newStatus) => {
      const { declarationRepository, productRepository, currentDeclaration } = prepareContext({
        initialStatus,
      });

      await expect(
        service({
          declarationId: currentDeclaration.id,
          status: newStatus,
          declarationRepository,
          productRepository,
        }),
      ).rejects.toMatchObject({
        code: ErrorCodes.DECLARATION_STATUS_CHANGE_FORBIDDEN,
      });

      expect(declarationRepository.updateOne).not.toBeCalled();
    },
  );
  it.each([
    [DeclarationStatus.DRAFT, DeclarationStatus.SUBMITTED],
    [DeclarationStatus.DRAFT, DeclarationStatus.REFUSED_ERROR],
    [DeclarationStatus.DRAFT, DeclarationStatus.REFUSED_LITIGATION],
    [DeclarationStatus.SUBMITTED, DeclarationStatus.REFUSED_ERROR],
    [DeclarationStatus.SUBMITTED, DeclarationStatus.REFUSED_LITIGATION],
    [DeclarationStatus.SUBMITTED, DeclarationStatus.SWITCH_PAPER],
  ])('should patch status - contain custom product', async (initialStatus, newStatus) => {
    const notManagedProduct = faker.datatype.boolean();
    const declarationProduct: ProductDeclaration = {
      id: notManagedProduct ? faker.string.uuid() : undefined,
      status: notManagedProduct ? ProductStatus.CUSTOM_PRODUCT : ProductStatus.VALUE_PRODUCT,
      name: faker.commerce.productName(),
      value: faker.number.float(),
      calculatedCustomDuty: 0,
      calculatedVat: 0,
      calculatedTaxes: 0,
      customDuty: 0,
      currency: 'EUR',
      vat: 0,
      customId: faker.string.uuid(),
      originalValue: faker.number.float(),
      rateCurrency: 1,
      notManagedProduct,
    };
    const { declarationRepository, productRepository, currentDeclaration } = prepareContext({
      initialStatus,
      addProduct: declarationProduct,
      productUndefine: notManagedProduct,
      notManagedProduct,
    });

    await service({
      declarationId: currentDeclaration.id,
      status: newStatus,
      declarationRepository,
      productRepository,
    });

    expect(declarationRepository.updateOne).toBeCalledWith(currentDeclaration.id, {
      status: newStatus,
    });
  });
  it.each([
    [DeclarationStatus.DRAFT, DeclarationStatus.VALIDATED],
    [DeclarationStatus.DRAFT, DeclarationStatus.PAID],
    [DeclarationStatus.SUBMITTED, DeclarationStatus.VALIDATED],
    [DeclarationStatus.SUBMITTED, DeclarationStatus.PAID],
    [DeclarationStatus.VALIDATED, DeclarationStatus.PAID],
  ])('should not patch status - contain custom product', async (initialStatus, newStatus) => {
    const notManagedProduct = faker.datatype.boolean();
    const declarationProduct = {
      id: undefined,
      status: notManagedProduct ? ProductStatus.CUSTOM_PRODUCT : ProductStatus.VALUE_PRODUCT,
      name: faker.commerce.productName(),
      value: faker.number.float(),
      calculatedCustomDuty: 0,
      calculatedVat: 0,
      calculatedTaxes: 0,
      customDuty: 0,
      currency: 'EUR',
      vat: 0,
      customId: faker.string.uuid(),
      originalValue: faker.number.float(),
      rateCurrency: 1,
      notManagedProduct,
    };
    const { declarationRepository, productRepository, currentDeclaration } = prepareContext({
      initialStatus,
      defaultDeclaration: {
        franchiseAmount: 500,
        totalAmount: 600,
      },
      addProduct: declarationProduct,
      productUndefine: notManagedProduct,
      notManagedProduct,
    });

    await expect(
      service({
        declarationId: currentDeclaration.id,
        status: newStatus,
        declarationRepository,
        productRepository,
      }),
    ).rejects.toMatchObject({
      code: ErrorCodes.DECLARATION_CUSTOM_PRODUCT_STATUS_CHANGE_FORBIDDEN,
    });
    expect(declarationRepository.updateOne).not.toBeCalled();
  });
  it.each([
    [DeclarationStatus.DRAFT, DeclarationStatus.VALIDATED],
    [DeclarationStatus.DRAFT, DeclarationStatus.PAID],
    [DeclarationStatus.SUBMITTED, DeclarationStatus.VALIDATED],
    [DeclarationStatus.SUBMITTED, DeclarationStatus.PAID],
    [DeclarationStatus.VALIDATED, DeclarationStatus.PAID],
  ])(
    'should patch status - contain custom product but under franchise',
    async (initialStatus, newStatus) => {
      const notManagedProduct = faker.datatype.boolean();
      const declarationProduct = {
        id: undefined,
        status: notManagedProduct ? ProductStatus.CUSTOM_PRODUCT : ProductStatus.VALUE_PRODUCT,
        name: faker.commerce.productName(),
        value: faker.number.float(),
        calculatedCustomDuty: 0,
        calculatedVat: 0,
        calculatedTaxes: 0,
        customDuty: 0,
        vat: 0,
        currency: 'EUR',
        customId: faker.string.uuid(),
        originalValue: faker.number.float(),
        rateCurrency: 1,
        notManagedProduct,
      };
      const { declarationRepository, productRepository, currentDeclaration } = prepareContext({
        initialStatus,
        defaultDeclaration: {
          franchiseAmount: 500,
          totalAmount: 400,
        },
        addProduct: declarationProduct,
        productUndefine: notManagedProduct,
        notManagedProduct,
      });

      await service({
        declarationId: currentDeclaration.id,
        status: newStatus,
        declarationRepository,
        productRepository,
      });

      expect(declarationRepository.updateOne).toBeCalledWith(currentDeclaration.id, {
        status: newStatus,
      });
    },
  );
  it('should not patch status - declaration not found', async () => {
    const declarationRepository = declarationRepositoryMock({
      getOne: undefined,
    });
    const productRepository = productRepositoryMock({});

    await expect(
      service({
        declarationId: faker.string.uuid(),
        status: DeclarationStatus.SUBMITTED,
        declarationRepository,
        productRepository,
      }),
    ).rejects.toMatchObject({
      code: ErrorCodes.DECLARATION_NOT_FOUND,
    });
    expect(declarationRepository.updateOne).not.toBeCalled();
  });
});
