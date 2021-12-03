#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
const program = new Command();
program
    .name('gendiff')
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-V, --version', 'output the version number')
    .option('-h, --help', 'output usage information')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {});

program.parse();
const options = program.opts();
if (options.help) {
    console.log(program.help());
}
