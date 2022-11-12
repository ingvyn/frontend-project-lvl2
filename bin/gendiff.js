#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import makeDiff from '../src/make-diff.js';

const program = new Command();

program
  .name('gendiff')
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'choose output format: stylish, plain or json', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const { format } = program.opts();
    console.log(makeDiff(filepath1, filepath2, format));
  });

program.parse();
