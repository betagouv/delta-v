import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface IUserCreatedResponse {
  message: string;
  code: ResponseCodes;
}

export default (): IUserCreatedResponse => ({
  message: 'Compte créé avec succès, un email de validation vous a été envoyé',
  code: ResponseCodes.USER_CREATED,
});
