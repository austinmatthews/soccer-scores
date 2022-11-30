import { createMatchDay, createTeamRankings, getMatch } from '../Utilities';

describe('Testing helper methods to assist with logic for the Match Day', () => {
  const matchDay = createMatchDay();

  it('haveTeamsPlayedToday should return false because these teams have not played yet', () => {
    expect(matchDay.haveTeamsPlayedToday('San Jose Earthquakes 3, Santa Cruz Slugs 3')).toBe(false);
  });

  it('haveTeamsPlayedToday should return false because these teams have already played', () => {
    expect(matchDay.haveTeamsPlayedToday('San Jose Earthquakes 3, Santa Cruz Slugs 3')).toBe(true);
  });

  it('teamsPlayed should be cleared when endDay is called should return false because these teams have already played', () => {
    expect(matchDay.endDay()).toStrictEqual([]);
  });
});


describe('Testing helper methods to assist with logic for Team Rankings', () => {
  const teamRankings = createTeamRankings();
  let ranks;

  it('Update rankings should return Team One with 1 point (tie) and Team Two with 1 point (tie)', () => {
    const matchResult1 = {
      teamOneName: 'Team One',
      teamOneScore: 0,
      teamTwoName: 'Team Two',
      teamTwoScore: 0
    };
    const mockRanks1 = [
      {
        teamName: 'Team One',
        totalPoints: 1
      },
      {
        teamName: 'Team Two',
        totalPoints: 1
      },
    ];

    ranks = teamRankings.updateRankings(matchResult1);
    expect(ranks).toStrictEqual(mockRanks1);

  });

  it('Update rankings should return Team One with 4 points (tie and win) and Team Two with 1 point (tie and loss)', () => {
    const matchResult2 = {
      teamOneName: 'Team One',
      teamOneScore: 2,
      teamTwoName: 'Team Two',
      teamTwoScore: 1
    };
    const mockRanks2 = [
      {
        teamName: 'Team One',
        totalPoints: 4
      },
      {
        teamName: 'Team Two',
        totalPoints: 1
      },
    ];

    ranks = teamRankings.updateRankings(matchResult2);
    expect(ranks).toStrictEqual(mockRanks2);

  });

});

describe('Testing helper methods to assist with logic for Match', () => {
  const match = getMatch();

  const result1String = 'Capitola Seahorses 1, San Jose Earthquakes 2'
  const results1 = {
    teamOneName: 'Capitola Seahorses',
    teamOneScore: '1',
    teamTwoName: 'San Jose Earthquakes',
    teamTwoScore: '2'
  }

  const result2String = 'Santa Cruz Slugs 0, Felton Lumberjacks 10'
  const results2 = {
    teamOneName: 'Santa Cruz Slugs',
    teamOneScore: '0',
    teamTwoName: 'Felton Lumberjacks',
    teamTwoScore: '10'
  }

  it('getResult should return the string as an object with each team name and score (should match results1)', () => {
    expect(match.getResult(result1String)).toStrictEqual(results1);
  });

  it('getResult should return the string as an object with each team name and score (should match results2)', () => {
    expect(match.getResult(result2String)).toStrictEqual(results2);
  });

});