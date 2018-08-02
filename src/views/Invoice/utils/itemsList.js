/* eslint-disable func-names */
import Enums from 'utils/EnumsManager';

const {
  Quantity,
  UnitPrice,
} = Enums.Invoice.ItemsList.Columns;

/**
 * Use to convert value of Quantity/Unit Price to valid value
 */
const getValueByColumn = (col, val) => {
  let newVal = val;
  if (col === Quantity) {
    newVal = Number(newVal);
    if (_.isNaN(newVal) || newVal < 0) {
      newVal = '0';
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

export default Item;
