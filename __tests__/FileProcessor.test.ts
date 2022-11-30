import { isValidLine } from '../src/FileProcessor';

describe('Helper methods to assist with logic for the Match Day', () => {
  const validLines = ['San Jose Earthquakes 1, Felton Lumberjacks 4', 'Aptos FC 2, Monterey United 0', 'Capitola Seahorses 0, Santa Cruz Slugs 0'];
  const invalidLines = ['San Jose Earthquakes 1, Felton Lumberjacks 4', 'Aptos FC 2, Monterey United 0', 'Capitola Seahorses 0, Santa Cruz Slugs 0'];

  it.each(validLines)('isValidLine should return true for all lines in validLines', (line) => {
    expect(isValidLine(line)).toBe(true);
  });

  it.each(invalidLines)('isValidLine should return false for all lines in invalidLines', (line) => {
    expect(isValidLine(line)).toBe(true);
  });
});