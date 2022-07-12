import fs from 'fs';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import makeDiff from '../src/make-diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('delete_key', () => {
  const path1 = getFixturePath('source.json');
  const path2 = getFixturePath('delete_key.json');
  const resPath = getFixturePath('expected_delete_key');
  const result = fs.readFileSync(resPath, 'utf8');
  expect(makeDiff(path1, path2)).toEqual(result);
});

test('change_key', () => {
  const path1 = getFixturePath('source.json');
  const path2 = getFixturePath('change_key.json');
  const resPath = getFixturePath('expected_change_key');
  const result = fs.readFileSync(resPath, 'utf8');
  expect(makeDiff(path1, path2)).toEqual(result);
});

test('add_key', () => {
  const path1 = getFixturePath('source.json');
  const path2 = getFixturePath('add_key.json');
  const resPath = getFixturePath('expected_add_key');
  const result = fs.readFileSync(resPath, 'utf8');
  expect(makeDiff(path1, path2)).toEqual(result);
});