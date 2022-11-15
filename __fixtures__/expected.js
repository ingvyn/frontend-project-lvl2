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
  example: `[
    {"property":"common","state":"unchanged","innerDiff":[
        {"property":"follow","state":"added","value":false},
        {"property":"setting1","state":"unchanged","value":"Value 1"},
        {"property":"setting2","state":"deleted","value":200},
        {"property":"setting3","state":"changed","initialValue":true,"value":null},
        {"property":"setting4","state":"added","value":"blah blah"},
        {"property":"setting5","state":"added","value":[
            {"property":"key5","value":"value5"}
        ]},
        {"property":"setting6","state":"unchanged","innerDiff":[
            {"property":"doge","state":"unchanged","innerDiff":[
                {"property":"wow","state":"changed","initialValue":"","value":"so much"}
            ]},
            {"property":"key","state":"unchanged","value":"value"},
            {"property":"ops","state":"added","value":"vops"}
        ]}
    ]},
    {"property":"group1","state":"unchanged","innerDiff":[
        {"property":"baz","state":"changed","initialValue":"bas","value":"bars"},
        {"property":"foo","state":"unchanged","value":"bar"},
        {"property":"nest","state":"changed","initialValue":[
            {"property":"key","value":"value"}
        ],"value":"str"}
    ]},
    {"property":"group2","state":"deleted","value":[
        {"property":"abc","value":12345},
        {"property":"deep","value":[
            {"property":"id","value":45}
        ]}
    ]},
    {"property":"group3","state":"added","value":[
        {"property":"deep","value":[
            {"property":"id","value":[
                {"property":"number","value":45}
            ]}
        ]},
        {"property":"fee","value":100500}
    ]}
]`,
};
const expected = { stylish, plain, json };
export default expected;
