import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface IAskValidateEmailResponse {
  message: string;
  code: ResponseCodes;
}

export default (): IAskValidateEmailResponse => ({
  message: 'Email de validation envoyé',
  code: ResponseCodes.USER_ASK_EMAIL_VALIDATION,
});
