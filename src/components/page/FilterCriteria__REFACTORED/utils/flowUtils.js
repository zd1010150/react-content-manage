/* eslint-disable func-names */
import Enums from 'utils/EnumsManager';

const { FieldTypes, DateTimeConfigs, Conditions } = Enums;
const {
  DateOnly,
  DateTime,
  Email,
  LongText,
  Lookup,
  NumberInput,
  PickList,
  TextInput,
} = FieldTypes;
const { SubTypes } = DateTimeConfigs;
const { SpecificDate, Range } = SubTypes;
const { Equals } = Conditions;
/**
 * Sort fields by label alphabetically
 * NOTES:
 * * This function is not necessary, it's only for ux purpose because we don't provide search field functionality.
 *   With this functionality, user would be easier to find a field by label.
 * * The param 'fields' should be a meta data format/raw format passed from backend. So we can reuse this function to sort.
 *   Because we'll use a meta data field called 'field_label' inside the function. So this function normally called before we parse fields for front-end.
 * @param {Array} fields
 */
export const sortFieldsByLabel = (fields) => {
  if (_.isEmpty(fields) || !_.isArray(fields)) return [];

  return fields.sort((fa, fb) => (fa.field_label > fb.field_label ? 1 : -1));
};

export const formatFields = (fields) => {
  if (_.isEmpty(fields) || !_.isArray(fields)) return [];

  return fields.map(f => ({
    id: f.id,
    name: f.field_name,
    type: f.crm_data_type,
    label: f.field_label,
    lookupKey: f.lookup_own_field_name ? f.lookup_own_field_name : '',
  }));
};

/**
 * Criterion constructor, should be used with 'new'
 * @param {number} maxDisplayNum: current biggest display num in all criteria
 */
function Criterion(maxNum) {
  // required for all
  this.displayNum = maxNum ? (maxNum + 1) : 1;
  this.fieldId = null;
  this.conditionId = null;
  this.value = null;
  this.field = null;
  // required by type
  this.options = null;
  this.subtype = null;
  this.rangeValue = null;
};
Criterion.prototype.setProperty = function (prop, value) {
  // NOTES: no new property is allowed to add
  if (this[prop] !== undefined) {
    this[prop] = value;
  }
};
Criterion.prototype.setValueByType = function (newValue, newSubtype) {
  switch (this.field.type) {
    case Email:
    case LongText:
    case TextInput:
    case NumberInput:
      this.setProperty('value', newValue);
      break;
    case PickList:
    case Lookup:
      this.setProperty('value', newValue);
      break;
    case DateOnly:
    case DateTime:
      this.setProperty('subtype', newSubtype);
      this.setProperty('value', newValue);
      this.setProperty('rangeValue', newValue);
      if (this.subtype === Range) {
        this.setProperty('conditionId', Equals);
      }
      break;
    default:
      console.warn('No supported type has been found!');
  }
};
export const getNewCriterion = maxNum => new Criterion(maxNum);

/**
 * Return the max display num in current criteria.
 */
export const getMaxDisplayNum = (data) => {
  if (_.isEmpty(data)) return 0;

  const lastElement = data[data.length - 1];
  return (lastElement && lastElement.displayNum)
    ? lastElement.displayNum
    : 0;
};


/**
 * Helper - Update specific filter's field value
 * @param {number} displayNum
 * @param {Object} field
 * @param {Array} criteria
 */
const updateFilterByField = (displayNum, field, criteria) => criteria.map((c) => {
  if (c.displayNum === displayNum) {
    // NOTES:
    // New instance of Criterion is needed in order to easily clean condition and value column.
    const newCriterion = new Criterion();
    newCriterion.setProperty('displayNum', displayNum);
    newCriterion.setProperty('fieldId', field.id);
    newCriterion.setProperty('field', field);
    // Set 'specific date' as default subtype if field type is date related type
    if (newCriterion.field.type === DateOnly
        || newCriterion.field.type === DateTime) {
      newCriterion.setProperty('subtype', SpecificDate);
    }
    return newCriterion;
  }
  return c;
});
/**
 * Helper - Update specific filter's condition value
 * @param {number} displayNum
 * @param {string} newValue
 * @param {Array} criteria
 */
const updateFilterByCondition = (displayNum, newValue, criteria) => criteria.map((c) => {
  if (c.displayNum === displayNum) {
    c.setProperty('conditionId', newValue);
  }
  return c;
});
/**
 * Helper - Update specific filter's value
 * @param {number} displayNum
 * @param {string} newValue
 * @param {string} newSubtype
 * @param {Array} criteria
 */
const updateFilterByValue = (displayNum, newValue, newSubtype, criteria) => criteria.map((c) => {
  if (c.displayNum === displayNum) {
    c.setValueByType(newValue, newSubtype);
  }
  return c;
});
/**
 * 
 * @param {string} column, one of columns from 'field, condition, value'
 * @param {Object} payload
 * @param {Arrray} filters
 * @return {Array} filters after updating specific record if the record is found, otherwise return the current filters.
 */
export const updateFiltersByColumn = (column, payload, state) => {
  const { displayNum, newValue, newSubtype } = payload;
  const { criteria, fields } = state;

  const criterion = criteria.find(c => c.displayNum === displayNum);
  if (!criterion) {
    console.warn('No criterion can be found by display#!');
    return criteria;
  }  

  switch (column) {
    case 'field':
      const field = fields.find(f => f.id === newValue);
      if (!field) {
        console.warn('No field can be found from the list!');
        return criteria;
      }
      return updateFilterByField(displayNum, field, criteria);
    case 'condition':
      return updateFilterByCondition(displayNum, newValue, criteria);
    case 'value':
      return updateFilterByValue(displayNum, newValue, newSubtype, criteria);
    default:
      console.warn('No Supported Column has been found!');
      return criteria;
  }
};
