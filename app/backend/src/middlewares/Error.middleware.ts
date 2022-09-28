import { NextFunction, Request, Response } from 'express';
import CustomError from '../helpers/CustomError';

const errorMiddleware = (err: CustomError, req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  res.status(status).json({ status, message });
};

export default errorMiddleware;
