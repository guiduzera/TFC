export interface ILeaderboard {
  name?: string;
  totalPoints: number;
  totalDraws: number;
  totalVictories: number;
  totalLosses: number;
  goalsFavor: number;
  totalGames: number;
  goalsBalance: number;
  goalsOwn: number;
  efficiency: number;
}

export interface IleaderBoard {
  getHome(): Promise<ILeaderboard[]>;
  getAway(): Promise<ILeaderboard[]>;
  getGeneral(): Promise<ILeaderboard[]>;
}
