/* eslint-disable func-names */
function Item() {
  this.count();

  this.id = Item.prototype.gid;
  this.description = 'abc';
  this.code = 'abccode';
  this.quantity = 0;
  this.unitPrice = 0;
  this.editingCol = '';
  this.isEditingAll = true;
};

Item.prototype.gid = 0;
Item.prototype.count = function () {
  Item.prototype.gid += 1;
};
Item.prototype.setProperty = function (propertyName, newValue) {
  if (this[propertyName] !== undefined) {
    this[propertyName] = newValue;
  }
};

export default Item;
