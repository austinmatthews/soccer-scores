#!/usr/bin/env node

import { processFile } from './FileProcessor';
import fs from 'fs';

const filePath = getFilePathFromInput(process.stdin.isTTY, process.argv[2]);

(async () => {
    await fileHandler(filePath);
})();

function getFilePathFromInput(isTTY: boolean, argFilePath: string): string {
    if (argFilePath)
        return argFilePath;
    else if (!isTTY)
        return fs.readFileSync(0, { encoding: 'utf-8' });
    else {
        console.log("Please provide the filepath as an argument (e.g. npm run start:ts-node <filepath>) or via stdin (e.g echo \"sample-input.txt\" | npm run start:ts-node)");
        process.exit(1);
    }
}

async function fileHandler(filePath: string): Promise<void> {
    filePath = filePath.replace(/(\r\n|\n|\r)/gm, '');

    if (fs.existsSync(filePath)){
        await processFile(filePath);
    }
    else
        console.log(`File doesn't exist: ${filePath}`);
    process.exit(1);
}



