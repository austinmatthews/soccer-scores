import { createMatchDay, createTeamRankings, getConstants, getMatch } from './Utilities';
import readline from 'readline';
import fs from 'fs';
import events from 'events';

export async function processFile(filePath: string) {

  let dayCount = 1;
  const matchDay = createMatchDay();
  const teamRankings = createTeamRankings();

  try {
    const readFileLine = readline.createInterface({
      input: fs.createReadStream(`${filePath}`),
      crlfDelay: Infinity
    });

    readFileLine.on('line', (line) => {
      if (isValidLine(line)) {
        const match = getMatch();
        const matchResult = match.getResult(line);

        if (matchResult) {
          if (matchDay.haveTeamsPlayedToday(matchResult)) {

            teamRankings.printRankings(dayCount)
            matchDay.endDay();
            dayCount++;
          }
          teamRankings.updateRankings(matchResult);
        }
      }
      else {
        console.log(`\nLine [${line}] is invalid, skipping...\n`)
      }
    }).on('close', () => teamRankings.printRankings(dayCount));


    await events.once(readFileLine, 'close');

  } catch (err) {
    console.error(err);
  }
}

export function isValidLine(line: string): boolean{
  const constants = getConstants();
  return(constants.validMatchRegex.test(line));
}