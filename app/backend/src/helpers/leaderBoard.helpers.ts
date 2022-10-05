import { ILeaderboard } from '../interfaces/leaderBoard.interfaces';
import { Imatch } from '../interfaces/Match.interfaces';
import LeaderBoardExtends from './leaderBoardExtends';

export default class LeaderBoardHelpers {
  static filterId(data: Imatch[], team: string, id: number) {
    if (team === 'home') {
      return data.filter((match) => match.homeTeam === id);
    } return data.filter((match) => match.awayTeam === id);
  }

  static filterAllMatches(data: Imatch[], id: number) {
    return data.filter((match) => match.homeTeam === id || match.awayTeam === id);
  }

  static generalLeaderBoard(matches: Imatch[], teamName: string) {
    return {
      totalPoints: LeaderBoardExtends.finalPointsGeral(matches, teamName),
      totalGames: matches.length,
      totalVictories: LeaderBoardExtends.totalOfVictoriesGeral(matches, teamName),
      totalDraws: LeaderBoardHelpers.totalOfDraws(matches),
      totalLosses: LeaderBoardExtends.totalOfLossesGeral(matches, teamName),
      goalsFavor: LeaderBoardHelpers
        .markedGoals(matches, 'home') + LeaderBoardHelpers.markedGoals(matches, 'away'),
      goalsOwn: LeaderBoardHelpers
        .ownGoals(matches, 'home') + LeaderBoardHelpers.ownGoals(matches, 'away'),
      goalsBalance: LeaderBoardHelpers.goalsBalanceGeral(matches),
      efficiency: LeaderBoardHelpers.efficiencyTotal(matches),
    };
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

  static efficiencyTotal(matches: Imatch[]) {
    const totalPoints = LeaderBoardHelpers
      .finalPoints(matches, 'home') + LeaderBoardHelpers.finalPoints(matches, 'away');
    const totalGames = matches.length;
    return Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
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

  static goalsBalanceGeral(matches: Imatch[]) {
    const favorGoals = LeaderBoardHelpers
      .markedGoals(matches, 'home') + LeaderBoardHelpers.markedGoals(matches, 'away');
    const ownGoals = LeaderBoardHelpers
      .ownGoals(matches, 'home') + LeaderBoardHelpers.ownGoals(matches, 'away');
    return favorGoals - ownGoals;
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
