import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface IUpdatePasswordResponse {
  message: string;
  code: ResponseCodes;
}

export default (): IUpdatePasswordResponse => ({
  message: 'Password successfully changed',
  code: ResponseCodes.USER_PASSWORD_RESET,
});
