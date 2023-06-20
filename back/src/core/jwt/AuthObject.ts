export interface IAuthObject {
  userId: string;
  email: string;
}

export interface AccessTokenAuthObject extends IAuthObject {
  isAgent: boolean;
}

export interface RequestWithJwt extends Request {
  jwt: IAuthObject;
}
