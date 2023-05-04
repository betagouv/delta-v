import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface IUserCreatedResponse {
  message: string;
  code: ResponseCodes;
}

export default (): IUserCreatedResponse => ({
  message: 'User successfully created, you received an email to validate your account',
  code: ResponseCodes.USER_CREATED,
});
