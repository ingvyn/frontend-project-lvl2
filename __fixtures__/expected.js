const stylish = {
  add_key: `{
  + _newKey: newValue
    aDelete: true
    bChValue: no
  + cObjKey: {
        1st: a
        2nd: b
    }
    dObject: {
        aRemain: 1
        bChanged: 0
        cDeleted: true
      + eAdded: true
    }
    sObject: {
        sKey: sValue
    }
}`,
  change_key: `{
    aDelete: true
  - bChValue: no
  + bChValue: yes
    dObject: {
        aRemain: 1
      - bChanged: 0
      + bChanged: 1
        cDeleted: true
    }
  - sObject: {
        sKey: sValue
    }
  + sObject: deleteObject
}`,
  delete_key: `{
  - aDelete: true
    bChValue: no
    dObject: {
        aRemain: 1
        bChanged: 0
      - cDeleted: true
    }
  - sObject: {
        sKey: sValue
    }
}`,
  example: `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`,
};
const plain = {
  example: `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`,
};
const json = {
  example: '[{"key":"common","state":"restructured","structure":[{"key":"follow","state":"added","value":false},{"key":"setting1","state":"unchanged","value":"Value 1"},{"key":"setting2","state":"deleted","value":200},{"key":"setting3","state":"changed","initial":{"value":true},"value":null},{"key":"setting4","state":"added","value":"blah blah"},{"key":"setting5","state":"added","structure":[{"key":"key5","state":"unchanged","value":"value5"}]},{"key":"setting6","state":"restructured","structure":[{"key":"doge","state":"restructured","structure":[{"key":"wow","state":"changed","initial":{"value":""},"value":"so much"}]},{"key":"key","state":"unchanged","value":"value"},{"key":"ops","state":"added","value":"vops"}]}]},{"key":"group1","state":"restructured","structure":[{"key":"baz","state":"changed","initial":{"value":"bas"},"value":"bars"},{"key":"foo","state":"unchanged","value":"bar"},{"key":"nest","state":"changed","initial":{"structure":[{"key":"key","state":"unchanged","value":"value"}]},"value":"str"}]},{"key":"group2","state":"deleted","structure":[{"key":"abc","state":"unchanged","value":12345},{"key":"deep","state":"restructured","structure":[{"key":"id","state":"unchanged","value":45}]}]},{"key":"group3","state":"added","structure":[{"key":"deep","state":"restructured","structure":[{"key":"id","state":"restructured","structure":[{"key":"number","state":"unchanged","value":45}]}]},{"key":"fee","state":"unchanged","value":100500}]}]',
};
const expected = { stylish, plain, json };
export default expected;
