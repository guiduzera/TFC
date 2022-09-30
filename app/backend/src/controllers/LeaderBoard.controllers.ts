import { Response, Request, NextFunction } from 'express';
import { IleaderBoard } from '../interfaces/leaderBoard.interfaces';

export default class LeaderBoardControllers {
  private service: IleaderBoard;

  constructor(s: IleaderBoard) {
    this.service = s;
    this.getHome = this.getHome.bind(this);
  }

  async getHome(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const result = await this.service.getHome();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAway(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const result = await this.service.getAway();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
