const stepIndent = 4;
const formatAsObject = (diffStruct, formatIndent) => {
  const baseIndent = ' '.repeat(formatIndent);
  const resString = diffStruct.map((diffItem) => {
    const { key, children, value } = diffItem;
    const outputValue = () => {
      if (children.length !== 0 && value === null) {
        return formatAsObject(children, formatIndent + stepIndent);
      }
      return typeof value === 'string' ? `"${value}"` : value;
    };
    return `${baseIndent}{"property":"${key}","value":${outputValue()}}`;
  });

  return `[\n${resString.join(',\n')}\n${baseIndent}]`;
};
export default formatAsObject;
