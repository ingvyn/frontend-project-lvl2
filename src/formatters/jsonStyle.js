import formatAsObject from './singleObject.js';

const jsonStyle = (diff) => {
  const startIndent = 0;
  const stepIndent = 4;
  const formatDiff = (diffStruct, formatIndent) => {
    const baseIndent = ' '.repeat(formatIndent);
    const resString = diffStruct.map((diffItem) => {
      const { key, state } = diffItem;
      const outputValue = (valueKeeper) => {
        const { children, value } = valueKeeper;
        if (children.length !== 0 && value === null) {
          return state === 'unchanged' ? formatDiff(children, formatIndent + stepIndent) : formatAsObject(children, formatIndent + stepIndent);
        }
        return typeof value === 'string' ? `'${value}'` : value;
      };
      const variantPart = state === 'changed'
        ? `"iinitialValue:" ${outputValue(diffItem.initial)}, "value": ${outputValue(diffItem)}`
        : `"value": ${outputValue(diffItem)}`;
      return `${baseIndent}{"property:" "${key}", "state:" "${state}", ${variantPart}}`;
    });

    return `[\n${resString.join('\n')}\n${baseIndent}]`;
  };

  return formatDiff(diff, startIndent);
};

export default jsonStyle;
