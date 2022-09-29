import { NextFunction, Request, Response } from 'express';
import CustomError from '../helpers/CustomError';
import { Ijwt } from '../helpers/auth.interfaces';

export default class Validations {
  private verificador: Ijwt;
  constructor(j: Ijwt) {
    this.verificador = j;
    this.TokenVerify = this.TokenVerify.bind(this);
    this.TokenVerifyMatches = this.TokenVerifyMatches.bind(this);
  }

  static loginValidation(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  }

  public TokenVerify(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const check = this.verificador.verifyToken(token);
      return res.status(200).json({ role: check.role });
    } catch (error) {
      next(error);
    }
  }

  public TokenVerifyMatches(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const check = this.verificador.verifyToken(token);
      if (check) return next();
    } catch (error) {
      throw new CustomError(401, 'Token must be a valid token');
    }
  }
}
