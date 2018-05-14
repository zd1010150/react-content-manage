/* eslint-disable no-param-reassign */
import Enums from 'utils/EnumsManager';
import { getOptionsByType, getValueByType } from './formatDataUtils';

const { FieldTypes } = Enums;
const { ApiError } = FieldTypes;

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
    let { value } = field;

    const {
      page_readonly,
      page_required,
      meta,
      position,
    } = field;

    const {
      id,
      field_name,
      field_label,
      crm_data_type,
      helper_text,
      lookup_own_field_name,
      precision,
      scale,
    } = meta;

    /**
     * This is just a temp fix for error api response. The issue is because that in some scenario, all references of a deleted field are not cleaned in database.
     * The backend may fix this issue in the future. For now, as a solution, we just hide this field and not pass value to backend when create or update.
     * More info about the issue: http://c7git.acy.svr/LogixCRM/fe_logix_crm/issues/55
     */
    if (value && value.error) {
      return {
        active: false,
        helpText: helper_text,
        id,
        initialValue: null,
        key: id,
        label: field_label,
        lookupDisplayKey: lookup_own_field_name,
        name: field_name,
        options: [],
        optionsFetched: false,
        position,
        precision,
        readOnly: page_readonly,
        required: page_required,
        scale,
        type: ApiError,
        value: null,
      };
    }

    const hasMappingValue = Object.prototype.hasOwnProperty.call(mappedValues, field_name);
    if (hasMappingValue) {
      value = mappedValues[field_name];
    }

    const initialValue = getValueByType(crm_data_type, value, lookup_own_field_name);
    const initialOptions = getOptionsByType(crm_data_type, value, meta);

    return {
      active: false,
      helpText: helper_text,
      // The 'id' field is required by lookup field for further data fetching
      id,
      initialValue,
      key: id,
      label: field_label,
      // The 'lookup_own_field_name' is required because it will be used to display value and it varies
      lookupDisplayKey: lookup_own_field_name,
      name: field_name,
      options: initialOptions,
      // A tag to avoid further data fetch for Lookup field
      optionsFetched: false,
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
