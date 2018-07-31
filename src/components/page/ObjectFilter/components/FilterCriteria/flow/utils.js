import Enums from 'utils/EnumsManager';
import { isDateRelatedType } from 'utils/common';

const { DateTimeConfigs } = Enums;
const { SpecificDate } = DateTimeConfigs.SubTypes;
/**
 * Compute new condition logic text based on updated filters and action(add/remove)
 * @param {object} state
 * @param {array} filters
 * @param {bool} hasRemoved
 */
export const getConditionLogic = (state, filters, hasAdded = false) => {
  const { length } = filters;
  // Added the first filter
  if (hasAdded && length === 1) {
    return '1';
  }
  // Deleted the only filter
  if (!hasAdded && length < 1) {
    return '';
  }
  // Deleted the second last filter
  if (!hasAdded && length < 2) {
    return filters[0].displayNum;
  }
  return state.condition_logic;
};


/**
 * [Helper]
 * @param {Number} fieldId
 * @param {Array} fields
 */
export const getFieldMeta = (fieldId, fields) => fields.find(f => f.id === fieldId);
/**
 * [Helper]
 */
const getTimeRangeDefaultValue = () => ({
  subtype: SpecificDate,
  value: '',
});
/**
 * Return default value based on field type
 * @param {number} fieldId
 * @param {array} fields
 */
export const getDefaultValueByFieldType = (type) => {
  if (isDateRelatedType(type)) return getTimeRangeDefaultValue();
  return '';
};

// TODO: lift up to common utils
/**
 * Format fields meta data to cater for front-end needs.
 * @param {Array} fields
 */
export const formatFields = (fields) => {
  if (_.isEmpty(fields) || !_.isArray(fields)) return [];
  return fields.map(field => ({
    id: field.id,
    type: field.crm_data_type,
    name: field.field_name,
    label: field.field_label,
  }));
};
