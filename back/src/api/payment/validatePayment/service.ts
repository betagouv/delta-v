import { DeclarationRepositoryInterface } from '../../../repositories/declaration.repository';

interface IValidatePaymentServiceOptions {
  declarationId: string;
  declarationRepository: DeclarationRepositoryInterface;
}

export const service = async ({
  declarationId,
  declarationRepository,
}: IValidatePaymentServiceOptions): Promise<void> => {
  // Get the payment ID from the declaration
  const declaration = await declarationRepository.getOne(declarationId);
  if (!declaration) {
    throw new Error('Declaration not found');
  }

  await declarationRepository.validatePayment(declarationId);

  // Initialize the PayfitPaymentChecker

  // Check the payment status
};
