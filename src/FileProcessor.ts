import { createMatchDay, createTeamRankings, getConstants, getMatch } from './Utilities';
import readline from 'readline';
import fs from 'fs';
import events from 'events';

export async function processFile(filePath: string) {
    
    let matchDay = createMatchDay();
    let teamRankings = createTeamRankings();
    const constants = getConstants();

    try {
        const readFileLine = readline.createInterface({
            input: fs.createReadStream(`${filePath}`),
            crlfDelay: Infinity
        });

        readFileLine.on('line', (line) => {
            if (constants.validMatchRegex.test(line)) {
                console.log(line);
                let match = getMatch();
                let matchResult = match.getResult(line);
                
                if(matchResult){
                    if(!matchDay.haveTeamsPlayedToday(matchResult)){
                        teamRankings.printRankings(matchDay.currentDay)
                        matchDay.endDay();
                    }
                    else{
                        teamRankings.updateRankings(matchResult);
                    }
                }
            }
            else{
                console.log(`Line [${line}] is invalid, skipping...`)
            }
        });

        await events.once(readFileLine, 'close');

    } catch (err) {
        console.error(err);
    }
};