import { DeclarationRepositoryInterface } from '../../../repositories/declaration.repository';

interface IVerifyPaymentStatusServiceOptions {
  declarationId: string;
  declarationRepository: DeclarationRepositoryInterface;
}

interface IVerifyPaymentStatusServiceResponse {
  status: string;
}

export const service = async ({
  declarationId,
  declarationRepository,
}: IVerifyPaymentStatusServiceOptions): Promise<IVerifyPaymentStatusServiceResponse> => {
  // Get the payment ID from the declaration
  const declaration = await declarationRepository.getOne(declarationId);
  if (!declaration) {
    throw new Error('Declaration not found');
  }

  // Initialize the PayfitPaymentChecker
  // const payfitPaymentChecker = new PayfitPaymentChecker({
  //   apiUrl: 'https://api.payfit.com',
  //   apiKey: 'your-payfit-api-key', // Replace with your actual API key
  // });

  // Check the payment status

  return { status: declaration.paymentStatus };
};
