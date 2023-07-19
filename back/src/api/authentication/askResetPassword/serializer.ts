import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface IAskResetPasswordResponse {
  message: string;
  code: ResponseCodes;
}

export default (): IAskResetPasswordResponse => ({
  message: 'Email de réinitialisation du mot de passe envoyé',
  code: ResponseCodes.USER_ASK_RESET_PASSWORD,
});
