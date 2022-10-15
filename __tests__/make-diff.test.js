import fs from 'fs';
import { test, expect, describe, beforeAll } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import makeDiff from '../src/make-diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
let extension;
const testAction = (actionName) => {
  const path1 = getFixturePath('source'.concat(extension));
  const path2 = getFixturePath(actionName.concat(extension));
  const resPath = getFixturePath('expected_'.concat(actionName));
  const result = fs.readFileSync(resPath, 'utf8');
  expect(makeDiff(path1, path2)).toEqual(result);
};
const testSuiteRun = () => {
  test('delete_key', testAction.bind(null, 'delete_key'));
  test('change_key', testAction.bind(null, 'change_key'));
  test('add_key', testAction.bind(null, 'add_key'));
};
describe('JSON', () => {
  beforeAll(() => {
    extension = '.json';
  });
  testSuiteRun();
});
describe('YAML', () => {
  beforeAll(() => {
    extension = '.yml';
  });
  testSuiteRun();
});
