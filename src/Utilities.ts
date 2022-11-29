export function createMatchDay() {
  let teamsPlayed = new Array();
  let currentDay = 1;

  function haveTeamsPlayedToday(matchResult: any): Boolean {
    if (teamsPlayed.includes(matchResult.teamOneName, matchResult.teamTwoName))
      return true;
    else {
      teamsPlayed.push(matchResult.teamOneName, matchResult.teamOneName)
      return false;
    }
  }

  function endDay() {
    currentDay++;
    teamsPlayed = new Array();
  }

  return {
    haveTeamsPlayedToday,
    endDay,
    currentDay
  };
}

// the exported function is what other modules will have access to
export type LeagueRankings = {
  teamName: string;
  totalPoints: number;
};

export function createTeamRankings() {
  let leagueRankings = new Array<LeagueRankings>()

  function updateRankings(matchResults: any) {
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

  }

  function updateTeamRank(teamName: string, teamResult: number) {
    var index = leagueRankings.findIndex(lr => lr.teamName == teamName);
    if (index) {
      leagueRankings[index].totalPoints += teamResult
    }
    else {
      leagueRankings.push({
        teamName: teamName,
        totalPoints: teamResult
      })
    }
  }

  function printRankings(currentDay: number) {
    leagueRankings.sort((a, b) => {
      return b.totalPoints - a.totalPoints;
    });
    leagueRankings.slice(0,3);

    console.log(`Matchday ${currentDay}`);
    leagueRankings.forEach(lr => {
      console.log(`${lr.teamName}, ${lr.totalPoints} pts`)
    });
  }

  return {
    updateRankings,
    printRankings
  };
}

export function getMatch() {
  var constants = getConstants();

  function getResult(matchData: string) {
    const groups = constants.validMatchRegex.exec(matchData);

    if (groups?.length === 4) {
      return {
        teamOneName: groups?.at(0),
        teamOneScore: groups?.at(1),
        teamTwoName: groups?.at(2),
        teamTwoScore: groups?.at(3)
      };
    }

    return null;
  }

  return {
    getResult
  };

}

export function getConstants() {
  const validMatchRegex = new RegExp("/([a-zA-Z ]+)(\d+),([a-zA-Z ]+)(\d+)/g");

  return {
    validMatchRegex
  };
}