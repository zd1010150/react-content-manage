/* eslint-disable func-names */
function Attachment({ uid, name, url }) {
  this.uid = uid;
  this.name = name;
  this.url = url;
  this.status = 'done';
};
Attachment.prototype.setProperty = function (propertyName, newValue) {
  if (this[propertyName] !== undefined) {
    this[propertyName] = newValue;
  }
};
Attachment.prototype.toApi = function () {
  return {
    file_id: Number(this.uid),
    description: this.name,
  };
};

export default Attachment;
