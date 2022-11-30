# soccer-scores
Soccer Score Take Home Coding Challenge

# Setup
Clone this repository:
`git clone https://github.com/austinmatthews/soccer-scores.git`

Required Installs: 

`node`, `typescript`, `ts-node`, `jest`

Node can be downloaded from: <https://nodejs.org/en/download/>

Install the rest with npm commands (global installation recommended)

`npm install -g typescript`,

`npm install -g ts-node`,

`npm install -g jest`,

`npm install` in the soccer-scores directory to install package.json dependencies

# Scripts

Run the script with arguments using the following format:

`npm run start:ts-node -- <filepath>`

Run the script with stdin (pipe or redirect) with the following format or an equivalent command:

`echo <filepath> | npm run start:ts-node`

You may also compile and run separately with the following commands:

To compile: 

`npm run build`

To run: 

`npm run start -- <filepath>`

To run tests with the following command:

`npm run test`

# Design

Assumptions:

- Each team name is spelled the same throughout the file

- Each team plays once per match day

- Each line should have the same format as the sample input

- The piped data/arguments are assumed to be a file path

By this logic I determined that each match day would end before any team plays in two games.

I used readline and fs to read in the file line by line

I factored the script into three main sections
    
- index.ts
    - Validated the input from the console and kicks off the processor 
- FileProcessor.ts
    - Reads through each line of the file one at a time
    - Validates if the line is valid with regex.test()
    - Calls out to utility modules for the logic
- Utilities.ts
    - Leaned into creating modules instead of classes
    - MatchDay module keeps track of the teams that have played that day
    - TeamRankings module keeps track of each team and their total league points as well as printing results
    - GetMatch takes in each line from the file and executes the regex with it 
        - Team names and scores are collected with regex groups

# Issues

I have yet to develop in Typescript specifically, so I took a shot at it. It went pretty smoothly except for needing to use `any` in a few spots, which removed type safety.

If there is an invalid line, I prompt the user that it is invalid, but the script continues to run and simply skips invalid lines. In production code I would exit more gracefully in production code, but chose this method for the sake of the exercise.
