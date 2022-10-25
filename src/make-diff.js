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
  const object1 = parser1(fs.readFileSync(path1, 'utf8'));
  const object2 = parser2(fs.readFileSync(path2, 'utf8'));
  const startIndent = 0;
  const makeObjectsDiff = (obj1, obj2, formatIndent) => {
    const baseIndent = ' '.repeat(formatIndent);
    const plusIndent = '  + ';
    const minusIndent = '  - ';
    const neutralIndent = '    ';
/*
    const handleSimpleKeyDiff = (key) => {
      if (_.has(obj1, key)) {
        if (!_.has(obj2, key)) {
          return `${baseIndent}${minusIndent}${key}: ${obj1[key]}`;
        }
        if (obj1[key] === obj2[key]) {
          return `${baseIndent}${neutralIndent}${key}: ${obj1[key]}`;
        }
        return `${baseIndent}${minusIndent}${key}: ${obj1[key]}\n${baseIndent}${plusIndent}${key}: ${obj2[key]}`;
      }
      return `${baseIndent}${plusIndent}${key}: ${obj2[key]}`;
    };

    const outputFlatObject = (obj) => {
      const keyLines = Object.entries(obj).map(([key, value]) => `${baseIndent}${neutralIndent}${key}: ${value}`);
      return `{\n${keyLines.join('\n')}\n${baseIndent}}`;
    };

    const ObjectKeyDiff = (key) => {
      if (_.has(obj1, key)) {          const baseIndent = ' '.repeat(indent);
        if (!_.has(obj2, key)) {
          return `${indent}${minusIndent}${key}: ${makeObjectsDiff(obj1[key], _.cloneDeep(obj1[key]))}`;
        }
        return `${indent}${neutralIndent}${key}: ${makeObjectsDiff(obj1[key], obj2[key])}`;
      }
      return `${indent}${plusIndent}${key}: ${makeObjectsDiff(obj2[key], _.cloneDeep(obj2[key]))}`;
    };
*/
    const handleKey = (key) => {
      let indent = formatIndent;
      if (!((obj1[key] instanceof Object) || (obj2[key] instanceof Object))) {
        return () => {
          indent += 4;
          if (_.has(obj1, key)) {
            if (!_.has(obj2, key)) {
              return `${baseIndent}${minusIndent}${key}: ${obj1[key]}`;
            }
            if (obj1[key] === obj2[key]) {
              return `${baseIndent}${neutralIndent}${key}: ${obj1[key]}`;
            }
            return `${baseIndent}${minusIndent}${key}: ${obj1[key]}\n${baseIndent}${plusIndent}${key}: ${obj2[key]}`;
          }
          return `${baseIndent}${plusIndent}${key}: ${obj2[key]}`;
        };
      }
      return () => {
        indent += 4;
        if (_.has(obj1, key)) {
          if (!_.has(obj2, key)) {
            return `${baseIndent}${minusIndent}${key}: ${makeObjectsDiff(obj1[key], _.cloneDeep(obj1[key]), indent)}`;
          }
          return `${baseIndent}${neutralIndent}${key}: ${makeObjectsDiff(obj1[key], obj2[key], indent)}`;
        }
        return `${baseIndent}${plusIndent}${key}: ${makeObjectsDiff(obj2[key], _.cloneDeep(obj2[key], indent))}`;
      };
    };

    const allObjectsKeys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));
    const resString = allObjectsKeys.map((key) => {
      const keyHandler = handleKey(key);
      return keyHandler();
    });
    return `{\n${resString.join('\n')}\n${baseIndent}}`;
  };

  return makeObjectsDiff(object1, object2, startIndent);
};

export default makeDiff;
