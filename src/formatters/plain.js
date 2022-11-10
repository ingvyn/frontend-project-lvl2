const plainDiff = (diff) => {
  const formatDiff = (diffStruct, keyChainString = '') => {
    const resString = diffStruct.flatMap((diffItem) => {
      const { key, state } = diffItem;
      const currentKeyChainString = keyChainString
        ? keyChainString.concat(`.${key}`)
        : key;
      const outputValue = (valueKeeper) => {
        const { children, value } = valueKeeper;
        if (children.length !== 0 && value === null) {
          return '[complex value]';
        }
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
          return outputValue(diffItem) === '[complex value]' ? formatDiff(diffItem.children, currentKeyChainString) : [];
        default:
          return 'property information wasn\'t formed. Unknown property status detected.';
      }
    });
    return resString.join('\n');
  };

  return formatDiff(diff);
};

export default plainDiff;