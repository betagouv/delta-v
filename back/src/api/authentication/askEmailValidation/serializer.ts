import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface IAskValidateEmailResponse {
  message: string;
  code: ResponseCodes;
}

export default (): IAskValidateEmailResponse => ({
  message: 'Email sent for validate email',
  code: ResponseCodes.USER_ASK_EMAIL_VALIDATION,
});
