import { verify } from 'jsonwebtoken';
import invalidTokenError from '../../api/common/errors/invalidToken.error';
import config from '../../loader/config';
import { IAuthObject } from './AuthObject';

interface VerifyTokenOptions {
  token: string;
  secret: string;
  ignoreExpiration?: boolean;
}

export const checkAndReturnAuthAccessToken = (header: string | undefined): string => {
  if (!header?.startsWith('Bearer')) {
    throw invalidTokenError;
  }

  return header.replace('Bearer ', '');
};

export const verifyToken = async <T extends object>({
  token,
  secret,
  ignoreExpiration = false,
}: VerifyTokenOptions): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    verify(
      token,
      secret,
      {
        ignoreExpiration,
      },
      (err, decoded) => {
        if (err) {
          return reject(err);
        }
        if (decoded) {
          resolve(decoded as T);
        }
        return reject();
      },
    );
  });
};

export const buildTokenObject = async <T extends object>(
  token: string,
  secret: string,
): Promise<T> => {
  try {
    const decoded = await verifyToken<T>({ token, secret });

    if (!decoded) {
      throw invalidTokenError;
    }

    return decoded;
  } catch {
    throw invalidTokenError();
  }
};

export const buildAccessTokenObject = (token: string): Promise<IAuthObject> =>
  buildTokenObject<IAuthObject>(token, config.ACCESS_TOKEN_SECRET);

export const buildRefreshTokenObject = (token: string): Promise<IAuthObject> =>
  buildTokenObject<IAuthObject>(token, config.REFRESH_TOKEN_SECRET);

export const buildValidationTokenObject = (token: string): Promise<IAuthObject> =>
  buildTokenObject<IAuthObject>(token, config.VALIDATION_TOKEN_SECRET);
