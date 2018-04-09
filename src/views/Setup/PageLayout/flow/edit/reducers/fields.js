
import _ from 'lodash';
import {
  SETUP_LAYOUT_EDIT_SET_ALL_FIELDS,
  SETUP_LAYOUT_EDIT_ADD_FIELD_TO_SECTION,
  SETUP_LAYOUT_EDIT_DELETE_FROM_SECTION,
  SETUP_LAYOUT_EDIT_DELETE_SECTION,
} from '../actionType';
import { DEFAULT_SECTION_CODE } from '../config';
/*
* 标识所有的已经在section中的fields的is_selected为true
* */
const initFilels = (fields, sections) => {
  const allSelectedFiledIds = [];
  sections.reduce((accumulator, item) => {
    accumulator.push(...item.fields.map(f => f.id));
    return accumulator;
  }, allSelectedFiledIds);
  return fields.map(item => ({
    id: `${item.id}`,
    label: item.field_label,
    type: item.crm_data_type,
    is_layout_required: Boolean(item.notnull),
    isSelected: allSelectedFiledIds.indexOf(item.id) > -1,
    isSystem: Boolean(item.is_sys_auto),
  }));
};
const addFieldToSection = (state, { fieldId }) => state.map((item) => {
  if (item.id === fieldId) {
    return Object.assign({}, item, { isSelected: true });
  } return item;
});
const deleteFieldFromSection = (state, { fieldId }) => state.map((item) => {
  if (item.id === fieldId) {
    return Object.assign({}, item, { isSelected: false });
  } return item;
});
const deleteSection = (state, { sectionCode, allSections }) => {
  if (sectionCode === DEFAULT_SECTION_CODE) {
    return state;
  }
  let newState = state.slice(),
    section = allSections.filter(section => section.code === sectionCode);
  if (section && section.length > 0 && section[0].fields) {
    _.forEach(section[0].fields, (fields) => {
      _.forEach(fields, (field) => {
        if (!field.is_layout_required) {
          newState = deleteFieldFromSection(newState, { fieldId: field.id });
        }
      });
    });
    return newState;
  }
  return state;
};
const fields = (state = [], action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_LAYOUT_EDIT_SET_ALL_FIELDS:
      return initFilels(payload.fields, payload.sections);
    case SETUP_LAYOUT_EDIT_ADD_FIELD_TO_SECTION:
      return addFieldToSection(state, payload);
    case SETUP_LAYOUT_EDIT_DELETE_FROM_SECTION:
      return deleteFieldFromSection(state, payload);
    case SETUP_LAYOUT_EDIT_DELETE_SECTION:
      return deleteSection(state, payload);
    default:
      return state;
  }
};

export default fields;
