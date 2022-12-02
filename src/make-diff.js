import _ from 'lodash';
import getFormat from './formatters/index.js';
import getObject from './read-object.js';

const makeDiff = (filepath1, filepath2, format = 'stylish') => {
  const formatDiff = getFormat(format);
  const object1 = getObject(filepath1);
  const object2 = getObject(filepath2);

  const getObjectTree = (obj) => Object.entries(obj).map(([key, value]) => {
    if (_.isObject(value)) {
      return {
        key,
        structure: getObjectTree(value),
      };
    }
    return { key, value };
  });

  const makeDiffTree = (obj1, obj2) => {
    const handleKeyDiff = (key) => {
      const getValue = (val) => {
        if (_.isObject(val)) {
          return { structure: getObjectTree(val) };
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
        if (_.isEqual(obj1[key], obj2[key])) {
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
            structure: makeDiffTree(obj1[key], obj2[key]),
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

  return formatDiff(makeDiffTree(object1, object2));
};

export default makeDiff;
