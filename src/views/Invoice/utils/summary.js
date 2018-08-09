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
Summary.prototype.setData = function (data) {
  this.description = data.description;
  this.addition = String(data.additions);
  this.operator = data.price_operator;
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

Summary.prototype.toApi = function () {
  return {
    description: this.description,
    additions: Number(this.addition),
    price_operator: this.operator,
  };
};

export default Summary;
