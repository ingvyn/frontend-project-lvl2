import fs from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
export default (filepath1, filepath2) => {
    const path1 = resolve(cwd(), filepath1);
    const path2 = resolve(cwd(), filepath2);
    const obj1 = JSON.parse(fs.readFileSync(filepath1, 'utf8'));
    const obj2 = JSON.parse(fs.readFileSync(filepath2, 'utf8'));
    console.log(JSON.stringify(obj1), JSON.stringify(obj2));
};
