import { NextFunction, Request, Response } from 'express';
import { IUserController, IUserServices } from '../interfaces/User.interfaces';

export default class UserControllers implements IUserController {
  private service: IUserServices;

  constructor(service: IUserServices) {
    this.service = service;
    this.login = this.login.bind(this);
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<Response | void > {
    try {
      const resultService = await this.service.login(req.body);
      return res.status(200).json({ token: resultService });
    } catch (error) {
      next(error);
    }
  }
}
