import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface IAskResetPasswordResponse {
  message: string;
  code: ResponseCodes;
}

export default (): IAskResetPasswordResponse => ({
  message: 'Email sent for reset password',
  code: ResponseCodes.USER_ASK_RESET_PASSWORD,
});
