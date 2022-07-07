import fs from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import _ from 'lodash';

export default (filepath1, filepath2) => {
  const path1 = resolve(cwd(), filepath1);
  const path2 = resolve(cwd(), filepath2);
  const obj1 = JSON.parse(fs.readFileSync(path1, 'utf8'));
  const obj2 = JSON.parse(fs.readFileSync(path2, 'utf8'));
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
