import { sign } from 'jsonwebtoken';
import config from '../../loader/config';
import { AccessTokenAuthObject, IAuthObject } from './AuthObject';

interface GenerateTokenOptions<T extends object> {
  generateJwtOptions: T;
  secret: string;
  expiresIn: number | string;
}

export const generateToken = <T extends object>({
  generateJwtOptions,
  secret,
  expiresIn,
}: GenerateTokenOptions<T>): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    sign(
      generateJwtOptions,
      secret,
      {
        expiresIn,
      },
      (err, token) => {
        if (err) {
          return reject(err);
        }
        if (token) {
          resolve(token);
        }
        return reject();
      },
    );
  });
};

export const generateAccessToken = (
  generateJwtOptions: AccessTokenAuthObject,
  expiresIn?: number | string,
): Promise<string> =>
  generateToken<AccessTokenAuthObject>({
    expiresIn: expiresIn ?? config.ACCESS_TOKEN_LIFE,
    secret: config.ACCESS_TOKEN_SECRET,
    generateJwtOptions,
  });

export const generateRefreshToken = (
  generateJwtOptions: IAuthObject,
  expiresIn?: number | string,
): Promise<string> =>
  generateToken<IAuthObject>({
    expiresIn: expiresIn ?? config.REFRESH_TOKEN_LIFE,
    secret: config.REFRESH_TOKEN_SECRET,
    generateJwtOptions,
  });

export const generateValidationToken = (
  generateJwtOptions: IAuthObject,
  expiresIn?: number | string,
): Promise<string> =>
  generateToken<IAuthObject>({
    expiresIn: expiresIn ?? config.VALIDATION_TOKEN_LIFE,
    secret: config.VALIDATION_TOKEN_SECRET,
    generateJwtOptions,
  });

export const generateResetPasswordToken = (
  generateJwtOptions: IAuthObject,
  expiresIn?: number | string,
): Promise<string> =>
  generateToken<IAuthObject>({
    expiresIn: expiresIn ?? config.RESET_PASSWORD_TOKEN_LIFE,
    secret: config.RESET_PASSWORD_TOKEN_SECRET,
    generateJwtOptions,
  });
