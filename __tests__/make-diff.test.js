import fs from 'fs';
import {
  test, expect, describe, beforeAll,
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
  let srcPath;
  beforeAll(() => {
    srcPath = getFixturePath('source'.concat(extension));
  });
  test.each([
    ['add_key'],
    ['change_key'],
    ['delete_key'],
  ])('%s', (action) => {
    const transPath = getFixturePath(action.concat(extension));
    expect(makeDiff(srcPath, transPath)).toEqual(expected[action]);
  });
});
