export interface IAuthObject {
  userId: string;
  email: string;
}

export interface AccessTokenAuthObject extends IAuthObject {
  name: string;
  lastName: string;
  isAgent: boolean;
}

export interface RequestWithJwt extends Request {
  jwt: IAuthObject;
}
