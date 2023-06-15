/* eslint-disable @typescript-eslint/unbound-method */
import { faker } from '@faker-js/faker';
import { ErrorCodes } from '../../../../src/api/common/enums/errorCodes.enum';
import { service } from '../../../../src/api/declaration/patchStatus/service';
import { DeclarationStatus } from '../../../../src/entities/declaration.entity';
import { declarationEntityFactory } from '../../../helpers/factories/declaration.factory';
import { declarationRepositoryMock } from '../../../mocks/declaration.repository.mock';

describe('test patchStatus service', () => {
  it.each([
    [DeclarationStatus.DRAFT, DeclarationStatus.SUBMITTED],
    [DeclarationStatus.DRAFT, DeclarationStatus.VALIDATED],
    [DeclarationStatus.DRAFT, DeclarationStatus.PAID],
    [DeclarationStatus.DRAFT, DeclarationStatus.REFUSED_ERROR],
    [DeclarationStatus.DRAFT, DeclarationStatus.REFUSED_LITIGATION],
    [DeclarationStatus.SUBMITTED, DeclarationStatus.VALIDATED],
    [DeclarationStatus.SUBMITTED, DeclarationStatus.PAID],
    [DeclarationStatus.SUBMITTED, DeclarationStatus.REFUSED_ERROR],
    [DeclarationStatus.SUBMITTED, DeclarationStatus.REFUSED_LITIGATION],
    [DeclarationStatus.VALIDATED, DeclarationStatus.PAID],
  ])('should patch status from "%p" to "%p"', async (initialStatus, newStatus) => {
    const currentDeclaration = declarationEntityFactory({ status: initialStatus });
    const declarationRepository = declarationRepositoryMock({
      getOne: currentDeclaration,
    });
    await service({
      declarationId: currentDeclaration.id,
      status: newStatus,
      declarationRepository,
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
    [DeclarationStatus.REFUSED_LITIGATION, DeclarationStatus.DRAFT],
    [DeclarationStatus.REFUSED_LITIGATION, DeclarationStatus.SUBMITTED],
    [DeclarationStatus.REFUSED_LITIGATION, DeclarationStatus.VALIDATED],
    [DeclarationStatus.REFUSED_LITIGATION, DeclarationStatus.PAID],
    [DeclarationStatus.REFUSED_LITIGATION, DeclarationStatus.REFUSED_ERROR],
    [DeclarationStatus.REFUSED_LITIGATION, DeclarationStatus.REFUSED_LITIGATION],
    [DeclarationStatus.PAID, DeclarationStatus.DRAFT],
    [DeclarationStatus.PAID, DeclarationStatus.SUBMITTED],
    [DeclarationStatus.PAID, DeclarationStatus.VALIDATED],
    [DeclarationStatus.PAID, DeclarationStatus.PAID],
    [DeclarationStatus.PAID, DeclarationStatus.REFUSED_ERROR],
    [DeclarationStatus.PAID, DeclarationStatus.REFUSED_LITIGATION],
    [DeclarationStatus.VALIDATED, DeclarationStatus.DRAFT],
    [DeclarationStatus.VALIDATED, DeclarationStatus.SUBMITTED],
    [DeclarationStatus.VALIDATED, DeclarationStatus.VALIDATED],
    [DeclarationStatus.SUBMITTED, DeclarationStatus.DRAFT],
    [DeclarationStatus.SUBMITTED, DeclarationStatus.SUBMITTED],
    [DeclarationStatus.DRAFT, DeclarationStatus.DRAFT],
  ])(
    'should not patch status from "%p" to "%p" - bad changement status',
    async (initialStatus, newStatus) => {
      const currentDeclaration = declarationEntityFactory({ status: initialStatus });
      const declarationRepository = declarationRepositoryMock({
        getOne: currentDeclaration,
      });

      await expect(
        service({
          declarationId: currentDeclaration.id,
          status: newStatus,
          declarationRepository,
        }),
      ).rejects.toMatchObject({
        code: ErrorCodes.DECLARATION_STATUS_CHANGE_FORBIDDEN,
      });

      expect(declarationRepository.updateOne).not.toBeCalled();
    },
  );
  it('should not patch status - declaration not found', async () => {
    const declarationRepository = declarationRepositoryMock({
      getOne: undefined,
    });
    await expect(
      service({
        declarationId: faker.string.uuid(),
        status: DeclarationStatus.SUBMITTED,
        declarationRepository,
      }),
    ).rejects.toMatchObject({
      code: ErrorCodes.DECLARATION_NOT_FOUND,
    });
    expect(declarationRepository.updateOne).not.toBeCalled();
  });
});
