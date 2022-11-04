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
  const getChildren = (obj) => {

  };
  const makeObjectsDiff = (obj1, obj2) => {
    const handleKeyDiff = (key) => {
      let state;
      let value;
      let children;
      const getKeyValues = (obj) => {
        const isObject = _.isObject(obj[key]);
        children = isObject ? getChildren(obj[key]) : [];
        value = isObject ? obj[key] : null;
        return { children, value };
      };
      if (_.has(obj1, key)) {
        if (!_.has(obj2, key)) {
          state = 'deleted';
          return {
            key, state, ...getKeyValues(obj1),
          };
        }
        if (obj1[key] === obj2[key]) {
          state = 'unchanged';
          return {
            key, state, ...getKeyValues(obj1),
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
          key, state, initial: { ...getKeyValues(obj1) }, ...getKeyValues(obj2),
        };
      }
      state = 'added';
      return {
        key, state, ...getKeyValues(obj2),
      };
    };

    const allObjectsKeys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));
    return allObjectsKeys.map((key) => handleKeyDiff(key));
  };

  return makeObjectsDiff(object1, object2);
};

export default makeDiff;
