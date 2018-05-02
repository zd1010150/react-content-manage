/* eslint-disable no-param-reassign */
import getValueByType from './getValueByType';

const FieldKeys = {
  Active: 'active',
  Value: 'value',
  Options: 'options',
};

/**
 * Flatten field's configs and format its value by type
 * @param {array} fields in a section
 * @param {array} mappedValues may not be empty if creat a opportunity from an account
 */
const formatFields = (fields, mappedValues) =>
  fields.map((field) => {
    let {
      id,
      page_readonly,
      page_required,
      meta,
      value,
      position,
    } = field;

    const {
      field_name,
      field_label,
      crm_data_type,
      helper_text,
      picklists,
      lookup_own_field_name,
      precision,
      scale,
    } = meta;

    const hasMappingValue = Object.prototype.hasOwnProperty.call(mappedValues, field_name);
    if (hasMappingValue) {
      value = mappedValues[field_name];
    }

    const initialValue = getValueByType(crm_data_type, value, lookup_own_field_name);

    return {
      active: false,
      helpText: helper_text,
      // Id field is required by lookup field for further data fetching
      id,
      initialValue,
      key: id,
      label: field_label,
      // lookup_own_field_name is required because it varies by different entity
      lookupDisplayKey: lookup_own_field_name,
      name: field_name,
      options: picklists,
      position,
      precision,
      readOnly: page_readonly,
      required: page_required,
      scale,
      type: crm_data_type,
      value: initialValue,
    };
  });

/**
 *  Format sections data of response
 */
export const mapSections = (sections, mappedValues) => {
  const sortedSections = _.sortBy(sections, ['sequence']);
  sortedSections.forEach((section) => {
    section.fields = formatFields(section.fields, mappedValues);
  });
  return sortedSections;
};

/**
 * Set field's key with new value
 * @param {string} fieldId
 * @param {string} code
 * @param {array} sections
 * @param {string} fieldKey
 * @param {any} newValue
 */
export const setFieldValueByKey = (fieldId, code, sections, fieldKey = FieldKeys.Value, newValue) => {
  sections.forEach((section) => {
    if (section.code === code) {
      section.fields = section.fields.map((field) => {
        if (field.id === fieldId) {
          field[fieldKey] = newValue;
        }
        return field;
      });
    }
  });
  return [...sections];
};

/**
 * Set field to active
 * @param {string} fieldId
 * @param {string} code
 * @param {array} sections
 */
export const setActiveById = (fieldId, code, sections) => setFieldValueByKey(fieldId, code, sections, FieldKeys.Active, true);

/**
 * Set field to inactive
 * @param {string} fieldId
 * @param {string} code
 * @param {array} sections
 */
export const setInactiveById = (fieldId, code, sections) => setFieldValueByKey(fieldId, code, sections, FieldKeys.Active, false);

//
const findField = (fieldId, code, sections) => {
  const targetSection = sections.find(section => section.code === code);
  return targetSection.fields.find(field => field.id === fieldId);
};

/**
 * Reset field value to its initial value
 * @param {string} fieldId
 * @param {string} code
 * @param {array} sections
 */
export const resetFieldValue = (fieldId, code, sections) => {
  const field = findField(fieldId, code, sections);
  if (field) {
    return setFieldValueByKey(fieldId, code, sections, FieldKeys.Value, field.initialValue);
  }
  return sections;
};

export const resetAllFieldsValue = (sections) => {
  const sectionCopy = _.cloneDeep(sections);
  sectionCopy.forEach((section) => {
    section.fields.forEach((field) => {
      field.value = field.initialValue;
    });
  });
  return sectionCopy;
};
