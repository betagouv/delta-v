import { sign, verify } from 'jsonwebtoken';
import config from '../../loader/config';
import { buildError } from '../buildError';
import { HttpStatuses } from '../httpStatuses';
import { IAuthObject } from './AuthObject';

export const generateAccessToken = (
  generateJwtOptions: IAuthObject,
  expiresIn = config.ACCESS_TOKEN_LIFE,
): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    sign(
      generateJwtOptions,
      config.ACCESS_TOKEN_SECRET,
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

const invalidTokenError = buildError({
  message: 'Invalid JWT token format.',
  publicMessage: 'Invalid JWT token format.',
  code: 'invalid-jwt-format',
  statusCode: HttpStatuses.UNAUTHORIZED,
});

export const checkAndReturnAuthAccessToken = (header: string | undefined): string => {
  if (!header?.startsWith('Bearer')) {
    throw invalidTokenError;
  }

  return header.replace('Bearer ', '');
};

export const verifyAccessToken = async (
  accessToken: string,
  ignoreExpiration = false,
): Promise<IAuthObject> => {
  return new Promise<IAuthObject>((resolve, reject) => {
    verify(
      accessToken,
      config.ACCESS_TOKEN_SECRET,
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

export const buildAuthObject = async (accessToken: string): Promise<IAuthObject> => {
  try {
    const decoded = await verifyAccessToken(accessToken);

    if (!decoded) {
      throw invalidTokenError;
    }

    return {
      userId: decoded.userId,
      email: decoded.email,
    };
  } catch {
    throw invalidTokenError;
  }
};
