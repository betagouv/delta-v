export interface IHelloReposonse {
  message: string;
}

export default (testId?: string): IHelloReposonse => ({
  message: `Hello World! ${testId ?? ''}`,
});
