import formatAsObject from './singleObject.js';

const jsonStyle = (diff) => {
  const startIndent = 4;
  const stepIndent = 4;
  const formatDiff = (diffStruct, formatIndent) => {
    const baseIndent = ' '.repeat(formatIndent);
    const resString = diffStruct.map((diffItem) => {
      const { key, state } = diffItem;
      const isComplexValue = (diffItem.children.length !== 0 && diffItem.value === null);
      const outputValue = (valueKeeper) => {
        const { children, value } = valueKeeper;
        if (children.length !== 0 && value === null) {
          if (state === 'unchanged') {
            return formatDiff(children, formatIndent + stepIndent);
          }
          return formatAsObject(children, formatIndent + stepIndent);
        }
        return typeof value === 'string' ? `"${value}"` : value;
      };
      const valueName = (isComplexValue && state === 'unchanged') ? '"innerDiff"' : '"value"';
      const variantPart = state === 'changed'
        ? `"initialValue":${outputValue(diffItem.initial)},"value":${outputValue(diffItem)}`
        : `${valueName}:${outputValue(diffItem)}`;
      return `${baseIndent}{"property":"${key}","state":"${state}",${variantPart}}`;
    });

    return `[\n${resString.join(',\n')}\n${baseIndent}]`;
  };

  return formatDiff(diff, startIndent);
};

export default jsonStyle;
