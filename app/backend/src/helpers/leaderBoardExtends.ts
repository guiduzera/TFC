import { Imatch } from '../interfaces/Match.interfaces';

export default class LeaderBoardExtends {
  static totalPoints = 0;
  static totalVictories = 0;
  static totalLosses = 0;
  static golsEmCasa = 0;
  static golsFora = 0;
  static totalMarkedGoals = 0;

  static finalPointsGeral(matches: Imatch[], teamName: string) {
    matches.forEach((match) => {
      if (match.teamHome?.teamName === teamName) {
        if (match.homeTeamGoals > match.awayTeamGoals) {
          this.totalPoints += 3;
        } else if (match.homeTeamGoals === match.awayTeamGoals) {
          this.totalPoints += 1;
        } else this.totalPoints -= 3;
      }
      if (match.teamAway?.teamName === teamName) {
        if (match.homeTeamGoals < match.awayTeamGoals) {
          this.totalPoints += 3;
        } else if (match.homeTeamGoals === match.awayTeamGoals) {
          this.totalPoints += 1;
        } else this.totalPoints -= 3;
      }
    });
    return this.totalPoints;
  }

  static totalOfVictoriesGeral(matches: Imatch[], teamName: string) {
    matches.forEach((match) => {
      if (match.teamHome?.teamName === teamName && match.homeTeamGoals > match.awayTeamGoals) {
        this.totalVictories += 1;
      }
      if (match.teamAway?.teamName === teamName && match.homeTeamGoals < match.awayTeamGoals) {
        this.totalVictories += 1;
      }
    });
    return this.totalVictories;
  }

  static totalOfLossesGeral(matches: Imatch[], teamName: string) {
    matches.forEach((match) => {
      if (match.teamHome?.teamName === teamName && match.homeTeamGoals < match.awayTeamGoals) {
        this.totalLosses += 1;
      }
      if (match.teamAway?.teamName === teamName && match.homeTeamGoals > match.awayTeamGoals) {
        this.totalLosses += 1;
      }
    });
    return this.totalLosses;
  }

  static markedGoalsGeral(matches: Imatch[], teamName: string) {
    matches.forEach((match) => {
      if (match.teamHome?.teamName === teamName) {
        const gol = match.homeTeamGoals;
        this.golsEmCasa += gol;
      }
      if (match.teamAway?.teamName === teamName) {
        const awayGoal = matches.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
      }
    });
  }
}
