import fs from 'fs';
import { resolve, extname } from 'path';
import { cwd } from 'process';
import _ from 'lodash';
import parsers from './parsers.js';

export default (filepath1, filepath2) => {
  const path1 = resolve(cwd(), filepath1);
  const path2 = resolve(cwd(), filepath2);
  const parser1 = parsers[extname(path1)];
  const parser2 = parsers[extname(path2)];
  const obj1 = parser1(fs.readFileSync(path1, 'utf8'));
  const obj2 = parser2(fs.readFileSync(path2, 'utf8'));
  const handleKeyString = (key) => {
    if (_.has(obj1, key)) {
      if (!_.has(obj2, key)) {
        return `  - ${key}: ${obj1[key]}\n`;
      }
      if (obj1[key] === obj2[key]) return `    ${key}: ${obj1[key]}\n`;
      return `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}\n`;
    }
    return `  + ${key}: ${obj2[key]}\n`;
  };
  const allObjectKeys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));
  const resString = `{\n${allObjectKeys.reduce((acc, key) => acc + handleKeyString(key), '')}}`;
  return resString;
};
