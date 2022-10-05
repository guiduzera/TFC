import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import LeaderBoardHelpers from '../helpers/leaderBoard.helpers';
import { IleaderBoard, ILeaderboard } from '../interfaces/leaderBoard.interfaces';

export default class LeaderBoardServices implements IleaderBoard {
  private teamModel = Team;
  private matchModel = Match;

  async getHome(): Promise<ILeaderboard[]> {
    const findMatches = await this.matchModel.findAll({ where: { inProgress: false } });
    const getAllTeams = await this.teamModel.findAll();
    const result = getAllTeams.map((team) => {
      const filterHomeTeam = LeaderBoardHelpers.filterId(findMatches, 'home', team.id);
      const homeLeaderBoard = LeaderBoardHelpers.leaderBoard(filterHomeTeam, 'home');
      return { name: team.teamName, ...homeLeaderBoard };
    });
    return LeaderBoardHelpers.sortLeaderBoard(result as unknown as ILeaderboard[]);
  }

  async getAway(): Promise<ILeaderboard[]> {
    const findMatches = await this.matchModel.findAll({ where: { inProgress: false } });
    const getAllTeams = await this.teamModel.findAll();
    const result = getAllTeams.map((team) => {
      const filterAwayTeam = LeaderBoardHelpers.filterId(findMatches, 'away', team.id);
      const awayLeaderBoard = LeaderBoardHelpers.leaderBoard(filterAwayTeam, 'away');
      return { name: team.teamName, ...awayLeaderBoard };
    });
    return LeaderBoardHelpers.sortLeaderBoard(result as unknown as ILeaderboard[]);
  }

  async getGeneral(): Promise<ILeaderboard[]> {
    const findMatches = await this.matchModel.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    const getAllTeams = await this.teamModel.findAll();
    const result = getAllTeams.map((team) => {
      const findAllMatches = LeaderBoardHelpers.filterAllMatches(findMatches, team.id);
      const generalLeaderBoard = LeaderBoardHelpers
        .generalLeaderBoard(findAllMatches, team.teamName);
      return { name: team.teamName, ...generalLeaderBoard };
    });
    return LeaderBoardHelpers.sortLeaderBoard(result as unknown as ILeaderboard[]);
  }
}
