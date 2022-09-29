import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import {
  ImatchServices,
  Imatch,
  IcreateBody, IpromiseResponseCreate, updateByIdBody } from '../interfaces/Match.interfaces';
import CustomError from '../helpers/CustomError';

export default class MatchesServices implements ImatchServices {
  private model = Match;

  async getAll(): Promise<Imatch[]> {
    const result = await this.model.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return result as unknown as Imatch[];
  }

  async getByQueryTrue(): Promise<Imatch[]> {
    const result = await this.model.findAll({ where: { inProgress: true },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ] });
    return result as unknown as Imatch[];
  }

  async getByQueryFalse(): Promise<Imatch[]> {
    const result = await this.model.findAll({ where: { inProgress: false },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ] });
    return result as unknown as Imatch[];
  }

  async createMatch(match: IcreateBody): Promise<IpromiseResponseCreate> {
    const { homeTeam, awayTeam } = match;
    if (homeTeam === awayTeam) {
      throw new CustomError(401, 'It is not possible to create a match with two equal teams');
    }
    const findHomeTeam = await Team.findByPk(homeTeam);
    const findAwayTeam = await Team.findByPk(awayTeam);
    if (!findHomeTeam || !findAwayTeam) {
      throw new CustomError(404, 'There is no team with such id!');
    }
    const obj = { ...match, inProgress: true };
    const result = await this.model.create(obj);
    return result as unknown as IpromiseResponseCreate;
  }

  async updateInProgress(id: string): Promise<boolean> {
    const result = await this.model.update({ inProgress: false }, { where: { id } });
    return result[0] === 1;
  }

  async updateById(id: string, body: updateByIdBody): Promise<boolean> {
    const result = await this.model.update({ ...body }, { where: { id } });
    return result[0] === 1;
  }
}
