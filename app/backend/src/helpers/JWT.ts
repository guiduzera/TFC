import { sign, verify } from 'jsonwebtoken';
import { Ijwt, IToken } from './auth.interfaces';
import CustomError from './CustomError';

export default class JWT implements Ijwt {
  _secret = process.env.JWT_SECRET || 'secret';
  _options: Record<string, string> = { expiresIn: '7d', algorithm: 'HS256' };

  public createToken(payload: IToken): string {
    const token = sign({ data: payload }, this._secret, this._options);
    return token;
  }

  public verifyToken(token: string): IToken {
    try {
      const { data } = verify(token, this._secret) as { data: IToken };
      return data;
    } catch (error) {
      throw new CustomError(401, 'Token inválido');
    }
  }
}
