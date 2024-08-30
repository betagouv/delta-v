import { verify } from 'jsonwebtoken';
// eslint-disable-next-line import/no-extraneous-dependencies
import invalidTokenError from '../../api/common/errors/invalidToken.error';
import { config } from '../../loader/config';
import { AccessTokenAuthObject, IAuthObject } from './AuthObject';

interface VerifyTokenOptions {
  token: string;
  secret: string;
  ignoreExpiration?: boolean;
}

interface IAgentConnectTokenObject {
  token: string;
  secret: string;
  nonce: string;
  ignoreExpiration?: boolean;
}

interface IAgentConnectTokenObjectResponse {
  sub: string;
  auth_time: number;
  acr: string;
  nonce: string;
  at_hash: string;
  aud: string;
  exp: number;
  iat: number;
  iss: string;
}

export const checkAndReturnAuthAccessToken = (header: string | undefined): string => {
  if (!header?.startsWith('Bearer')) {
    throw invalidTokenError();
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
          console.log('🚀 ~ decoded:', decoded);
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
  ignoreExpiration = false,
): Promise<T> => {
  try {
    const decoded = await verifyToken<T>({ token, secret, ignoreExpiration });

    if (!decoded) {
      throw invalidTokenError;
    }

    return decoded;
  } catch {
    throw invalidTokenError();
  }
};

export const buildAgentConnectTokenObject = async ({
  token,
  secret,
  nonce,
  ignoreExpiration = false,
}: IAgentConnectTokenObject): Promise<IAgentConnectTokenObjectResponse> => {
  try {
    const decoded = await verifyToken<IAgentConnectTokenObjectResponse>({
      token,
      secret,
      ignoreExpiration,
    });
    console.log('🚀 ~ decoded:', decoded);

    if (decoded.nonce !== nonce) {
      throw invalidTokenError();
    }

    return decoded;
  } catch {
    throw invalidTokenError();
  }
};

export const buildAccessTokenObject = (
  token: string,
  ignoreExpiration = false,
): Promise<AccessTokenAuthObject> =>
  buildTokenObject<AccessTokenAuthObject>(token, config.ACCESS_TOKEN_SECRET, ignoreExpiration);

export const buildRefreshTokenObject = (token: string): Promise<IAuthObject> =>
  buildTokenObject<IAuthObject>(token, config.REFRESH_TOKEN_SECRET);

export const buildValidationTokenObject = (token: string): Promise<IAuthObject> =>
  buildTokenObject<IAuthObject>(token, config.VALIDATION_TOKEN_SECRET);

export const buildResetPasswordTokenObject = (token: string): Promise<IAuthObject> =>
  buildTokenObject<IAuthObject>(token, config.RESET_PASSWORD_TOKEN_SECRET);
