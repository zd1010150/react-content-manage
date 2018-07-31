/* eslint-disable func-names */
function Item() {
  this.description = '';
  this.code = '';
  this.quantity = 0;
  this.unitPrice = 0;
  this.isEditing = false;
  this.isEditingAll = false;
};

Item.prototype.setProperty = function (propertyName, newValue) {
  if (this[propertyName] !== undefined) {
    this[propertyName] = newValue;
  }
};

export default Item;
