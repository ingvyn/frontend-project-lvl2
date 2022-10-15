import yaml from 'js-yaml';

export default {
  '.json': JSON.parse,
  '.yml': yaml.load,
  '.yaml': yaml.load,
};
