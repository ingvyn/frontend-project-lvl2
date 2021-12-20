#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import makeDiff from '../src/make-diff.js';
const program = new Command();

program
    .name('gendiff')
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
        const res = makeDiff(filepath1, filepath2);
        console.log('{');
        res.forEach(([sign, key, value]) => {
            console.log(`  ${sign} ${key}: ${value}`);
        })
        console.log('}');
    });

program.parse();
