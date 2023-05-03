import { sign, verify } from 'jsonwebtoken';
import config from '../../loader/config';
import { IAuthObject } from './AuthObject';

export const generateRefreshToken = (
  generateJwtOptions: IAuthObject,
  expiresIn = config.REFRESH_TOKEN_LIFE,
): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    sign(
      generateJwtOptions,
      config.REFRESH_TOKEN_SECRET,
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

export const verifyRefreshToken = async (
  refreshToken: string,
  ignoreExpiration = false,
): Promise<IAuthObject> => {
  return new Promise<IAuthObject>((resolve, reject) => {
    verify(
      refreshToken,
      config.REFRESH_TOKEN_SECRET,
      {
        ignoreExpiration,
      },
      (err, decoded) => {
        if (err) {
          return reject(err);
        }
        if (decoded) {
          resolve(decoded as IAuthObject);
        }
        return reject();
      },
    );
  });
};
