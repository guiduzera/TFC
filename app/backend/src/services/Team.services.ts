import Team from '../database/models/TeamModel';
import { Iteam, IteamServices } from '../interfaces/Team.interface';

export default class TeamServices implements IteamServices {
  private model = Team;

  async getAll(): Promise<Iteam[]> {
    const result = await this.model.findAll();
    return result;
  }

  async getById(id: number): Promise<Iteam> {
    const result = await this.model.findByPk(id);
    return result as Iteam;
  }
}
