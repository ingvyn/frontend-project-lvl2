const stylishDiff = (diff) => {
  const startIndent = 0;
  const stepIndent = 4;
  const formatDiff = (diffStruct, formatIndent) => {
    const baseIndent = ' '.repeat(formatIndent);
    const spacing = {
      added: `${baseIndent}  + `,
      deleted: `${baseIndent}  - `,
      unchanged: `${baseIndent}    `,
      restructured: `${baseIndent}    `,
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

export default stylishDiff;
