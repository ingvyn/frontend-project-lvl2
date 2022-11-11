import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish,
  plain,
  json: JSON.stringify,
};

export default (format) => {
  if (!(format in formatters)) {
    throw new Error(`Unknown format style: ${format}`);
  }
  return formatters[format];
};
