const formatAsObject = (diffStruct) => {
  const resString = diffStruct.map((diffItem) => {
    const { key } = diffItem;
    const outputValue = (valueKeeper) => {
      if (valueKeeper.value === undefined) {
        return formatAsObject(valueKeeper.children);
      }
      const { value } = valueKeeper;
      return typeof value === 'string' ? `"${value}"` : value;
    };
    return `{"property":"${key}","value":${outputValue(diffItem)}}`;
  });

  return `[${resString.join(',')}]`;
};
export default formatAsObject;
