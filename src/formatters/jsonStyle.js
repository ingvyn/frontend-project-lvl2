import formatAsObject from './singleObject.js';

const formatDiff = (diffStruct) => {
  const resString = diffStruct.map((diffItem) => {
    const { key, state } = diffItem;
    const outputValue = (valueKeeper) => {
      if (valueKeeper.value === undefined) {
        const { children } = valueKeeper;
        return state === 'restructured'
          ? formatDiff(children)
          : formatAsObject(children);
      }
      const { value } = valueKeeper;
      return typeof value === 'string' ? `"${value}"` : value;
    };
    const valueName = (state === 'restructured') ? '"innerDiff"' : '"value"';
    const variantPart = state === 'changed'
      ? `"initialValue":${outputValue(diffItem.initial)},"value":${outputValue(diffItem)}`
      : `${valueName}:${outputValue(diffItem)}`;
    return `{"property":"${key}","state":"${state}",${variantPart}}`;
  });
  return `[${resString.join(',')}]`;
};

export default formatDiff;
