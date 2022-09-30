export type Imatch = {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress?: boolean;
  teamHome?: {
    teamName: string
  },
  teamAway?: {
    teamName: string
  }
};

export type IcreateBody = {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number
};

export type IpromiseResponseCreate = {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: true,
};

export type updateByIdBody = {
  homeTeamGoals: number,
  awayTeamGoals: number,
};

export interface ImatchServices {
  getAll(): Promise<Imatch[]>;
  getByQueryTrue(): Promise<Imatch[]>;
  getByQueryFalse(): Promise<Imatch[]>;
  createMatch(match: IcreateBody): Promise<IpromiseResponseCreate>;
  updateInProgress(id: string): Promise<boolean>;
  updateById(id: string, body: updateByIdBody): Promise<boolean>;
}
