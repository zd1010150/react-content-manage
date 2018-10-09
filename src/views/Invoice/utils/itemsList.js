/* eslint-disable func-names */
import Enums from 'utils/EnumsManager';

const {
  Quantity,
  UnitPrice,
} = Enums.InvoicePage.ItemsList.Columns;

/**
 * Use to convert value of Quantity/Unit Price to valid value
 */
const getValueByColumn = (col, val) => {
  let newVal = val;
  if (col === Quantity) {
    newVal = Number(newVal);
    if (_.isNaN(newVal) || newVal < 0) {
      newVal = '0';
    } else {
      newVal = parseInt(newVal, 10);
    }
  } else if (col === UnitPrice) {
    newVal = Number(newVal);
    if (_.isNaN(newVal) || newVal < 0) {
      newVal = '0.00';
    } else {
      newVal = newVal.toFixed(2);
    }
  }
  return String(newVal);
};


function Item() {
  this.count();

  this.id = Item.prototype.gid;
  this.description = '';
  this.code = '';
  this.quantity = '0';
  this.unitPrice = '0.00';
  this.editingCol = '';
  this.isEditingAll = true;
};

Item.prototype.gid = 0;
Item.prototype.count = function () {
  Item.prototype.gid += 1;
};
Item.prototype.setData = function (data) {
  this.description = data.description;
  this.code = data.code;
  this.quantity = String(data.quantity);
  this.unitPrice = String(data.unit_price);
  this.isEditingAll = false;
};
Item.prototype.setProperty = function (propertyName, newValue) {
  if (this[propertyName] !== undefined) {
    this[propertyName] = newValue;
  }
};
Item.prototype.toValidValue = function () {
  [Quantity, UnitPrice].forEach(key =>
    this.setProperty(
      key,
      getValueByColumn(key, this[key]),
    ), this);
};
Item.prototype.toApi = function () {
  return {
    description: this.description,
    code: this.code,
    quantity: Number(this.quantity),
    unit_price: Number(this.unitPrice),
  };
};

export default Item;
