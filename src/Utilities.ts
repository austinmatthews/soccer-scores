export function createMatchDay() {
  let teamsPlayed: any[] = [];

  function haveTeamsPlayedToday(matchResult: any): boolean {
    if (teamsPlayed.includes(matchResult.teamOneName) || teamsPlayed.includes(matchResult.teamTwoName))
      return true;
    else {
      teamsPlayed.push(matchResult.teamOneName, matchResult.teamTwoName)
      return false;
    }
  }

  function endDay() {
    return teamsPlayed = [];
  }

  return {
    haveTeamsPlayedToday,
    endDay,
  };
}

export type LeagueRankings = {
  teamName: string;
  totalPoints: number;
};

export function createTeamRankings() {
  const leagueRankings = new Array<LeagueRankings>()

  function updateRankings(matchResults: any): LeagueRankings[] {
    const win = 3;
    const tie = 1;
    const loss = 0;
    let teamOneResult: number;
    let teamTwoResult: number;

    if (matchResults.teamOneScore > matchResults.teamTwoScore) {
      teamOneResult = win;
      teamTwoResult = loss;
    }
    else if (matchResults.teamOneScore < matchResults.teamTwoScore) {
      teamOneResult = loss;
      teamTwoResult = win;
    }
    else {
      teamOneResult = tie;
      teamTwoResult = tie;
    }

    updateTeamRank(matchResults.teamOneName, teamOneResult);
    updateTeamRank(matchResults.teamTwoName, teamTwoResult);
    return leagueRankings;
  }

  function updateTeamRank(teamName: string, teamResult: number) {
    const index = leagueRankings.findIndex(lr => lr.teamName == teamName);
    if (index > -1) {
      leagueRankings[index].totalPoints += teamResult
    }
    else {
      leagueRankings.push({
        teamName: teamName,
        totalPoints: teamResult
      })
    }
    return leagueRankings;
  }

  function printRankings(currentDay: number) {
    leagueRankings.sort((a, b) => {
      return b.totalPoints - a.totalPoints || a.teamName.localeCompare(b.teamName);
    });

    console.log(`\nMatchday ${currentDay}`);
    leagueRankings.slice(0, 3).forEach(lr => {
      console.log(`${lr.teamName}, ${lr.totalPoints} pts`)
    });
  }

  return {
    updateRankings,
    printRankings
  };
}

export function getMatch() {
  const constants = getConstants();

  function getResult(matchData: string) {
    const groups = constants.validMatchRegex.exec(matchData);

    if (groups?.length === 5) {
      return {
        teamOneName: groups.at(1)?.trimEnd(),
        teamOneScore: groups.at(2),
        teamTwoName: groups.at(3)?.trimEnd(),
        teamTwoScore: groups.at(4)
      };
    }
    return null;
  }

  return {
    getResult
  };
}

export function getConstants() {
  const validMatchRegex = new RegExp('([a-zA-Z ]+)(\\d+), ([a-zA-Z ]+)(\\d+)');

  return {
    validMatchRegex
  };
}