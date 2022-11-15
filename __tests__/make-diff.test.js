import {
  test, expect, describe,
} from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import makeDiff from '../src/make-diff.js';
import expected from '../__fixtures__/expected.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe.each([
  ['.json'],
  ['.yaml'],
])('testing format %s', (extension) => {
  test.each([
    ['add_key'],
    ['change_key'],
    ['delete_key'],
  ])('%s stylish format', (action) => {
    const srcPath = getFixturePath('source'.concat(extension));
    const transPath = getFixturePath(action.concat(extension));
    expect(makeDiff(srcPath, transPath, 'stylish')).toEqual(expected.stylish[action]);
  });
  test.each([
    ['stylish'],
    ['plain'],
    ['json'],
  ])('hexlet example in %s format', (format) => {
    const path1 = getFixturePath('example1'.concat(extension));
    const path2 = getFixturePath('example2'.concat(extension));
    expect(makeDiff(path1, path2, format)).toEqual(expected[format].example);
  });
});
