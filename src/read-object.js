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
      throw new Error(`The file on specified path ${filePath} doesn't have permission for reading`);
    }
  } else throw new Error(`The file on specified path ${filePath} does not exist`);
  const parser = parsers(extname(path));
  const data = fs.readFileSync(path, 'utf8');
  try {
    const object = parser(data);
    if (Object.keys(object).length === 0) {
      throw new Error('There is no data that can be interpreted as configuration');
    }
    return object;
  } catch (err) {
    throw new Error(`${err.message} in the file on the specified path ${filePath}`);
  }
};
