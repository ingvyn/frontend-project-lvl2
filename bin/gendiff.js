#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
const program = new Command();
program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .option('-V, --version', 'output the version number')
    .option('-h, --help', 'output usage information');

program.parse();
const options = program.opts();
if (options.help) {
    console.log(program.help());
}
