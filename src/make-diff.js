import fs from 'fs';
import { resolve, extname } from 'path';
import { cwd } from 'process';
import _ from 'lodash';
import parsers from './parsers.js';
import formatters from './formatters.js';

const makeDiff = (filepath1, filepath2, format = 'stylish') => {
  const formatter = formatters[format];
  const path1 = resolve(cwd(), filepath1);
  const path2 = resolve(cwd(), filepath2);
  const parser1 = parsers[extname(path1)];
  const parser2 = parsers[extname(path2)];
  const object1 = parser1(fs.readFileSync(path1, 'utf8'));
  const object2 = parser2(fs.readFileSync(path2, 'utf8'));

  const makeObjectsDiff = (obj1, obj2) => {
    const handleKeyDiff = (key) => {
      let state;
      let value;
      let children;
      const getValues = (val) => {
        const isObject = _.isObject(val);
        children = isObject ? makeObjectsDiff(val, _.cloneDeep(val)) : [];
        value = isObject ? null : val;
        return { children, value };
      };

      if (_.has(obj1, key)) {
        if (!_.has(obj2, key)) {
          state = 'deleted';
          return {
            key, state, ...getValues(obj1[key]),
          };
        }
        if (obj1[key] === obj2[key]) {
          state = 'unchanged';
          return {
            key, state, ...getValues(obj1[key]),
          };
        }
        if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
          state = 'unchanged';
          children = makeObjectsDiff(obj1[key], obj2[key]);
          value = null;
          return {
            key, state, children, value,
          };
        }
        state = 'changed';
        return {
          key, state, initial: { ...getValues(obj1[key]) }, ...getValues(obj2[key]),
        };
      }
      state = 'added';
      return {
        key, state, ...getValues(obj2[key]),
      };
    };

    const allObjectsKeys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));
    return allObjectsKeys.map((key) => handleKeyDiff(key));
  };

  return formatter(makeObjectsDiff(object1, object2));
};

export default makeDiff;
