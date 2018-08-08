/* eslint-disable func-names */
import Enums from 'utils/EnumsManager';

const {
  Subtotal,
  Tax,
  GrandTotal,
} = Enums.InvoicePage.Summary.Rows;

function Summary(description = '') {
  this.description = description;
  this.addition = '0';
  this.operator = 'add_percentage';
  this.isEditing = false;
};
Summary.prototype.setProperty = function (propertyName, newValue) {
  if (this[propertyName] !== undefined) {
    this[propertyName] = newValue;
  }
};
/**
 * Trade off to avoid conflicts in Enums
 */
Summary.prototype.getRowKey = function () {
  return this.description;
};

export default Summary;
