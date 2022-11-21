import yaml from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.load,
  '.yaml': yaml.load,
};

export default (format) => {
  if (!(format in parsers)) {
    throw new Error(`File with extension: ${format} is not supported for parsing`);
  }
  return parsers[format];
};
