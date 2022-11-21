import fs from 'fs';
import { resolve, extname } from 'path';
import { cwd } from 'process';
import _ from 'lodash';
import parsers from './parsers.js';
import formatters from './formatters/index.js';

const makeDiff = (filepath1, filepath2, format = 'stylish') => {
  const formatDiff = formatters(format);
  const path1 = resolve(cwd(), filepath1);
  const path2 = resolve(cwd(), filepath2);
  const file1Data = fs.readFileSync(path1, 'utf8');
  const file2Data = fs.readFileSync(path2, 'utf8');
  const parser1 = parsers(extname(path1));
  const parser2 = parsers(extname(path2));
  const object1 = parser1(file1Data);
  const object2 = parser2(file2Data);

  const makeObjectsDiff = (obj1, obj2) => {
    const handleKeyDiff = (key) => {
      const getValue = (val) => {
        if (_.isObject(val)) {
          return { structure: makeObjectsDiff(val, _.cloneDeep(val)) };
        }
        return { value: val };
      };

      if (_.has(obj1, key)) {
        if (!_.has(obj2, key)) {
          return {
            key,
            state: 'deleted',
            ...getValue(obj1[key]),
          };
        }
        if (obj1[key] === obj2[key]) {
          return {
            key,
            state: 'unchanged',
            ...getValue(obj1[key]),
          };
        }
        if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
          return {
            key,
            state: 'restructured',
            structure: makeObjectsDiff(obj1[key], obj2[key]),
          };
        }
        return {
          key,
          state: 'changed',
          initial: { ...getValue(obj1[key]) },
          ...getValue(obj2[key]),
        };
      }
      return {
        key,
        state: 'added',
        ...getValue(obj2[key]),
      };
    };

    const allObjectsKeys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));
    return allObjectsKeys.map((key) => handleKeyDiff(key));
  };

  return formatDiff(makeObjectsDiff(object1, object2));
};

export default makeDiff;
