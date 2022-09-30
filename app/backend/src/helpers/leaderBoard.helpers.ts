import { ILeaderboard } from '../interfaces/leaderBoard.interfaces';
import { Imatch } from '../interfaces/Match.interfaces';

export default class LeaderBoardHelpers {
  static filterId(data: Imatch[], team: string, id: number) {
    if (team === 'home') {
      return data.filter((match) => match.homeTeam === id);
    } return data.filter((match) => match.awayTeam === id);
  }

  static leaderBoard(matches: Imatch[], role: string) {
    return {
      totalPoints: LeaderBoardHelpers.finalPoints(matches, role),
      totalGames: matches.length,
      totalVictories: LeaderBoardHelpers.totalOfVictories(matches, role),
      totalDraws: LeaderBoardHelpers.totalOfDraws(matches),
      totalLosses: LeaderBoardHelpers.totalOfLosses(matches, role),
      goalsFavor: LeaderBoardHelpers.markedGoals(matches, role),
      goalsOwn: LeaderBoardHelpers.ownGoals(matches, role),
      goalsBalance: LeaderBoardHelpers.goalsBalance(matches, role),
      efficiency: LeaderBoardHelpers.efficiency(matches, role),
    };
  }

  static efficiency(matches: Imatch[], role: string) {
    if (role === 'home') {
      const totalPoints = LeaderBoardHelpers.finalPoints(matches, 'home');
      const totalGames = matches.length;
      return Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
    }
    const totalPoints = LeaderBoardHelpers.finalPoints(matches, 'away');
    const totalGames = matches.length;
    return Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
  }

  static goalsBalance(matches: Imatch[], role: string) {
    if (role === 'home') {
      return LeaderBoardHelpers.markedGoals(matches, 'home')
      - LeaderBoardHelpers.ownGoals(matches, 'home');
    } return LeaderBoardHelpers.markedGoals(matches, 'away')
    - LeaderBoardHelpers.ownGoals(matches, 'away');
  }

  static ownGoals(matches: Imatch[], role: string) {
    if (role === 'home') {
      return matches.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
    } return matches.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
  }

  static markedGoals(matches: Imatch[], role: string) {
    if (role === 'home') {
      return matches.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
    } return matches.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
  }

  static totalOfLosses(matches: Imatch[], role: string) {
    if (role === 'home') {
      const total = matches.filter((match) => match.homeTeamGoals < match.awayTeamGoals);
      return total.length;
    }
    const awayTotal = matches.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
    return awayTotal.length;
  }

  static totalOfDraws(matches: Imatch[]) {
    const Total = matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
    return Total.length;
  }

  static totalOfVictories(matches: Imatch[], role: string) {
    if (role === 'home') {
      const total = matches.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
      return total.length;
    }
    const awayTotal = matches.filter((match) => match.homeTeamGoals < match.awayTeamGoals);
    return awayTotal.length;
  }

  static finalPoints(matches: Imatch[], role: string) {
    if (role === 'home') {
      return matches.reduce((acc, curr) => {
        if (curr.homeTeamGoals > curr.awayTeamGoals) {
          return acc + 3;
        } if (curr.homeTeamGoals === curr.awayTeamGoals) {
          return acc + 1;
        } return acc;
      }, 0);
    }
    return matches.reduce((acc, curr) => {
      if (curr.homeTeamGoals < curr.awayTeamGoals) {
        return acc + 3;
      } if (curr.homeTeamGoals === curr.awayTeamGoals) {
        return acc + 1;
      } return acc;
    }, 0);
  }

  static sortLeaderBoard(leaderboard: ILeaderboard[]) {
    leaderboard.sort((a, b) =>
      b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);
    return leaderboard;
  }
}
