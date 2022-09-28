import { NextFunction, Request, Response } from 'express';

export type ReqBodyUser = {
  email: string;
  password: string;
};

export interface IUserServices {
  login: (body: ReqBodyUser) => Promise<string>;
}

export interface IUserController {
  login: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
}
