import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface PutFeedbackResponse {
  message: string;
  code: ResponseCodes;
}

export const serializePutFeedback = (): PutFeedbackResponse => ({
  message: 'Message mise à jour avec succès',
  code: ResponseCodes.FEEDBACK_UPDATED,
});
