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
    try {
      console.log(makeDiff(filepath1, filepath2, format));
    } catch (err) {
      switch (err.code) {
        case 'ENOENT':
          console.log(`The file on the specified path ${err.path} does not exist`);
          break;
        case 'EACCES':
          console.log(`The file on the specified path ${err.path} doesn't have permission for reading`);
          break;
        case 'EISDIR':
          console.log('One of the arguments given is not a file, but a directory');
          break;
        case 'UNKNOWN_STYLEFORMAT':
          console.log(`An unsupported formatter ${err.myErrFormat} is specified. Specify stylish, plain or json`);
          break;
        case 'UNSUPP_PARSEFORMAT':
          console.log(`The file with the extension ${err.myErrExtension} is not supported`);
          break;
        default:
          throw err;
      }
    }
  });

program.parse();
