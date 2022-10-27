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
    sObject: {
        sKey: sValue
    }
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
};
