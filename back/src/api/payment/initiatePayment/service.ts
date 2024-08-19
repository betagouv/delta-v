import { DeclarationRepositoryInterface } from '../../../repositories/declaration.repository';
import { generatePaymentLink } from '../../../utils/frontUrls.util';

interface IPaymentServiceOptions {
  declarationId: string;
  declarationRepository: DeclarationRepositoryInterface;
}

interface IPaymentServiceResponse {
  paymentLink: string;
}

export const service = async ({
  declarationId,
  declarationRepository,
}: IPaymentServiceOptions): Promise<IPaymentServiceResponse> => {
  // Verify if the payment can be made
  const canMakePayment = await declarationRepository.canMakePayment(declarationId);
  console.log('🚀 ~ canMakePayment:', canMakePayment);
  if (!canMakePayment) {
    throw new Error('Payment cannot be made for this declaration');
  }

  // Generate payment link
  const paymentLink = generatePaymentLink(declarationId);
  console.log('🚀 ~ paymentLink:', paymentLink);

  return { paymentLink };
};
