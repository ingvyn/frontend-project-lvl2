import yaml from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.load,
  '.yaml': yaml.load,
};

export default (format) => {
  if (!(format in parsers)) {
    const error = new Error(`File with extension: ${format} is not supported for parsing`);
    error.code = 'UNSUPP_PARSEFORMAT';
    error.myErrExtension = format;
    throw error;
  }
  return parsers[format];
};
