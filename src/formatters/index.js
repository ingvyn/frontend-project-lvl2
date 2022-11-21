import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish,
  plain,
  json: JSON.stringify,
};

export default (format) => {
  if (!(format in formatters)) {
    const error = new Error(`Unknown style format: ${format}`);
    error.code = 'UNKNOWN_STYLEFORMAT';
    error.myErrFormat = format;
    throw error;
  }
  return formatters[format];
};
