import stylish from './stylish.js';
import plain from './plain.js';
import json from './jsonStyle.js';

const formatters = {
  stylish,
  plain,
  json,
};

export default (format) => {
  if (!(format in formatters)) {
    throw new Error(`Unknown format style: ${format}`);
  }
  return formatters[format];
};
