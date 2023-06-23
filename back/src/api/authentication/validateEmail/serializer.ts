import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface IValidateEmailResponse {
  message: string;
  code: ResponseCodes;
}

export default (): IValidateEmailResponse => ({
  message: 'Votre email a été validé',
  code: ResponseCodes.USER_EMAIL_VALIDATED,
});
