const stylishDiff = (diff) => {
  const startIndent = 0;
  const stepIndent = 4;
  const formatDiff = (diffStruct, formatIndent) => {
    const baseIndent = ' '.repeat(formatIndent);
    const spacing = {
      added: `${baseIndent}  + `,
      deleted: `${baseIndent}  - `,
      unchanged: `${baseIndent}    `,
    };
    const resString = diffStruct.flatMap((diffItem) => {
      const { key, state } = diffItem;
      const outputValue = (valueKeeper) => {
        const { children, value } = valueKeeper;
        if (children.length !== 0 && value === null) {
          return formatDiff(children, formatIndent + stepIndent);
        }
        return value;
      };

      if (state === 'changed' && diffItem.initial) {
        return [
          `${spacing.deleted}${key}: ${outputValue(diffItem.initial)}`,
          `${spacing.added}${key}: ${outputValue(diffItem)}`,
        ];
      }
      return `${spacing[state]}${key}: ${outputValue(diffItem)}`;
    });

    return `{\n${resString.join('\n')}\n${baseIndent}}`;
  };

  return formatDiff(diff, startIndent);
};

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

const formatters = {
  stylish: stylishDiff,
  plain: plainDiff,
};

export default formatters;
