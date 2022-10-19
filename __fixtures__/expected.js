export default {
  add_key: `{
  + _newKey: newValue
    aDelete: true
    bChValue: no
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
