export default {
  add_key: `{
  + _newKey: newValue
    aDelete: true
    bChValue: no
  + cObjKey: {
        1st: a
        2nd: b
    }
}`,
  change_key: `{
    aDelete: true
  - bChValue: no
  + bChValue: yes
}`,
  delete_key: `{
  - aDelete: true
    bChValue: no
}`,
};
