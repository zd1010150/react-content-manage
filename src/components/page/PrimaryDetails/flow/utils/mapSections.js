/* eslint-disable no-param-reassign */
import getValueByType from './getValueByType';

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
      help_text,
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
      helpText: help_text,
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
export default (sections, mappedValues) => {
  // TOOD: Remove, testing purpose
  if (!_.isEmpty(mappedValues)) {
    console.log('not empty is creating new opport');
  }
  const sortedSections = _.sortBy(sections, ['sequence']);
  sortedSections.forEach((section) => {
    section.fields = formatFields(section.fields, mappedValues);
  });
  return sortedSections;
};
