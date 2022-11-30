import fs from 'fs';
import { resolve, extname } from 'path';
import { cwd } from 'process';
import parsers from './parsers.js';

export default (filePath) => {
  const path = resolve(cwd(), filePath);
  if (fs.existsSync(path)) {
    try {
      fs.accessSync(path, fs.constants.R_OK);
    } catch (err) {
      throw new Error(`The file on the specified path ${filePath} doesn't have permission for reading`);
    }
  } else throw new Error(`The file on the specified path ${filePath} does not exist`);
  const parser = parsers(extname(path));
  return parser(fs.readFileSync(path, 'utf8'));
};
