import { NextFunction, Request, Response } from 'express';
import { IteamServices } from '../interfaces/Team.interface';

export default class TeamControllers {
  private service: IteamServices;

  constructor(service: IteamServices) {
    this.service = service;
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const resultService = await this.service.getAll();
      return res.status(200).json(resultService);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const resultService = await this.service.getById(Number(req.params.id));
      return res.status(200).json(resultService);
    } catch (error) {
      next(error);
    }
  }
}
