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
        if (valueKeeper.value === undefined) {
          return formatDiff(valueKeeper.structure, formatIndent + stepIndent);
        }
        return valueKeeper.value;
      };

      const generalSpacing = spacing[state] ?? `${baseIndent}    `;
      if (state === 'changed' && diffItem.initial) {
        return [
          `${spacing.deleted}${key}: ${outputValue(diffItem.initial)}`,
          `${spacing.added}${key}: ${outputValue(diffItem)}`,
        ];
      }
      return `${generalSpacing}${key}: ${outputValue(diffItem)}`;
    });

    return `{\n${resString.join('\n')}\n${baseIndent}}`;
  };

  return formatDiff(diff, startIndent);
};

export default stylishDiff;
