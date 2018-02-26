
import _ from 'lodash';
import { ADD_FIELD_TO_SECTION, DELETE_FROM_SECTION, DELETE_SECTION } from '../actionType';
import { allFields, allSections } from '../mockData';
import { DEFAULT_SECTION_CODE } from '../config';
/*
* 标识所有的已经在section中的fields的is_selected为true
* */
const initFilels = (fields, sections) => {
  const allSelectedFileds = [];
  sections.reduce((accumulator, item) => {
    accumulator.push(...item.fields);
    return accumulator;
  }, allSelectedFileds);
  return fields.map(item => Object.assign({}, item, {
    isSelected: !!_.find(allSelectedFileds, { id: item.id }),
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
  if (section && section.length > 0 &&  section[0].fields) {
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
const fields = (state = initFilels(allFields, allSections), action) => {
  const { type, ...payload } = action;
  switch (type) {
    case ADD_FIELD_TO_SECTION:
      return addFieldToSection(state, payload);
    case DELETE_FROM_SECTION:
      return deleteFieldFromSection(state, payload);
    case DELETE_SECTION:
      return deleteSection(state, payload);
    default:
      return state;
  }
};

export default fields;
