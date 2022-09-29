import { Request, Response, NextFunction } from 'express';
import { ImatchServices } from '../interfaces/Match.interfaces';

export default class MatchesControllers {
  private service: ImatchServices;

  constructor(s: ImatchServices) {
    this.service = s;
    this.getAll = this.getAll.bind(this);
    this.createMatch = this.createMatch.bind(this);
    this.updateInProgress = this.updateInProgress.bind(this);
    this.updateById = this.updateById.bind(this);
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { inProgress } = req.query;
      if (inProgress === undefined) {
        const result = await this.service.getAll();
        return res.status(200).json(result);
      }
      if (inProgress === 'true') {
        const result = await this.service.getByQueryTrue();
        return res.status(200).json(result);
      }
      const result = await this.service.getByQueryFalse();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async createMatch(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const result = await this.service.createMatch(req.body);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateInProgress(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { id } = req.params;
      const result = await this.service.updateInProgress(id);
      if (!result) return res.status(404).json({ message: 'Match not found' });
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }

  async updateById(req: Request, res: Response, nex: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.service.updateById(id, req.body);
      if (!result) return res.status(404).json({ message: 'Match not found' });
      return res.status(200).json({ message: 'Updated!' });
    } catch (error) {
      nex(error);
    }
  }
}
