export interface IToken {
  username: string;
  role: string;
  email: string;
}

export interface Ijwt {
  _secret: string,
  _options: Record<string, string>,
  createToken(payload: IToken): string,
  verifyToken(token: string): IToken,
}

export interface Ibycript {
  encryptPassword(password: string): Promise<string>,
  comparePassword(password: string, encrypted: string): Promise<boolean>,
}
