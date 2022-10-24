import fs from 'fs';
import { resolve, extname } from 'path';
import { cwd } from 'process';
import _ from 'lodash';
import parsers from './parsers.js';

const makeDiff = (filepath1, filepath2) => {
  const path1 = resolve(cwd(), filepath1);
  const path2 = resolve(cwd(), filepath2);
  const parser1 = parsers[extname(path1)];
  const parser2 = parsers[extname(path2)];
  const obj1 = parser1(fs.readFileSync(path1, 'utf8'));
  const obj2 = parser2(fs.readFileSync(path2, 'utf8'));

  const handleKeyDiff = (key) => {
    if (_.has(obj1, key)) {
      if (!_.has(obj2, key)) {
        return `  - ${key}: ${obj1[key]}`;
      }
      if (obj1[key] === obj2[key]) {
        return `    ${key}: ${obj1[key]}`;
      }
      return `  - ${key}: ${obj1[key]}
  + ${key}: ${obj2[key]}`;
    }
    return `  + ${key}: ${obj2[key]}`;
  };

  const allObjectsKeys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));
  const resString = allObjectsKeys.map((key) => handleKeyDiff(key));
  return `{\n${resString.join('\n')}\n}`;
};

export default makeDiff;
