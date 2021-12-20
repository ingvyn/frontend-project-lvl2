import fs from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import _ from 'lodash';

const isPropertyRemain = ([prop, value], object, result) => {
    if (_.has(object, prop)) {

    }
}
export default (filepath1, filepath2) => {
    const path1 = resolve(cwd(), filepath1);
    const path2 = resolve(cwd(), filepath2);
    const obj1 = JSON.parse(fs.readFileSync(filepath1, 'utf8'));
    const obj2 = JSON.parse(fs.readFileSync(filepath2, 'utf8'));
    const obj1Entries = Object.entries(obj1);
    const obj2Entries = Object.entries(obj2);
    const mapObject1 = obj1Entries.map(([key, value]) => {
        if (_.has(obj2, key)) {
            if (obj2[key] === value) {
                return [' ', key, value];
            }
            else {
                return ['-', key, value]
            }
        }
        return ['-', key, value];
    });
    const mapObject2 = obj2Entries.map(([key, value]) => {
        if (!_.has(obj1, key)) {
            return ['+', key, value];
        }
        else if (obj1[key] !== value) {
            return ['+', key, value];
        }
        return [];
    })
    .filter((el) => el.length);
    const mapConcatObject = mapObject1.concat(mapObject2);
    const mapResult = _.sortBy(mapConcatObject, function ([sign, key]) { return key + (sign === '-' ? '' : sign); });
    return mapResult;
};
