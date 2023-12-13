import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface IChangePasswordResponse {
  message: string;
  code: ResponseCodes;
}

export default (): IChangePasswordResponse => ({
  message: 'Mot de passe modifié avec succès',
  code: ResponseCodes.USER_PASSWORD_UPDATED,
});
