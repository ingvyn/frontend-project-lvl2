export default {
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
