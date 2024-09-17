import { ResponseCodes } from '../../../common/enums/responseCodes.enum';

export interface IUpdatePasswordResponse {
  message: string;
  code: ResponseCodes;
}

export default (): IUpdatePasswordResponse => ({
  message: 'Mot de passe modifié avec succès',
  code: ResponseCodes.USER_PASSWORD_RESET,
});
