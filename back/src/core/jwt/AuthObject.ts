export interface IAuthObject {
  userId: string;
  email: string;
}

export interface RequestWithJwt extends Request {
  jwt: IAuthObject;
}
