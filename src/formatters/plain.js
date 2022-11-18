const plainDiff = (diff) => {
  const formatDiff = (diffStruct, keyChainString = '') => {
    const resString = diffStruct.flatMap((diffItem) => {
      const { key, state } = diffItem;
      const currentKeyChainString = keyChainString
        ? keyChainString.concat(`.${key}`)
        : key;
      const outputValue = (valueKeeper) => {
        if (valueKeeper.value === undefined) {
          return '[complex value]';
        }
        const { value } = valueKeeper;
        return typeof value === 'string' ? `'${value}'` : value;
      };
      switch (state) {
        case 'added':
          return `Property '${currentKeyChainString}' was added with value: ${outputValue(diffItem)}`;
        case 'deleted':
          return `Property '${currentKeyChainString}' was removed`;
        case 'changed':
          return `Property '${currentKeyChainString}' was updated. From ${outputValue(diffItem.initial)} to ${outputValue(diffItem)}`;
        case 'unchanged':
          return [];
        case 'restructured':
          return formatDiff(diffItem.structure, currentKeyChainString);
        default:
          throw new Error(`Key state ${state} wasn't expected`);
      }
    });
    return resString.join('\n');
  };

  return formatDiff(diff);
};

export default plainDiff;
