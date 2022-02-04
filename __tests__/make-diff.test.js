import { fileURLToPath } from 'url';
import path from 'path';
import makeDiff from '../src/make-diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gendifference', () => {
	const path1 = getFixturePath('file1.json');
	const path2 = getFixturePath('file2.json');
	expect(makeDiff(path1, path2)).toEqual(`{\n  - follow: undefined\n    host: hexlet.io
  - proxy: undefined\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}`);
});