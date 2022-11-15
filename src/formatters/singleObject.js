const formatAsObject = (diffStruct) => {
  const resString = diffStruct.map((diffItem) => {
    const { key, children, value } = diffItem;
    const outputValue = () => {
      if (children.length !== 0 && value === null) {
        return formatAsObject(children);
      }
      return typeof value === 'string' ? `"${value}"` : value;
    };
    return `{"property":"${key}","value":${outputValue()}}`;
  });

  return `[${resString.join(',')}]`;
};
export default formatAsObject;
