
import _ from 'lodash';
import { ADD_FIELD_TO_SECTION, DELETE_FROM_SECTION } from '../actionType';
import { allFields, allSections } from '../mockData';

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
const fields = (state = initFilels(allFields, allSections), action) => {
  const { type, ...payload } = action;
  switch (type) {
    case ADD_FIELD_TO_SECTION:
      return addFieldToSection(state, payload);
    case DELETE_FROM_SECTION:
      return deleteFieldFromSection(state, payload);
    default:
      return state;
  }
};

export default fields;
