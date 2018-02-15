
import _ from 'lodash';
import { ADD_FIELD_TO_SECTION, DELETE_FROM_SECTION, MOVE_BETWEEN_SECTION } from './actionType';
import { allFields, allSections } from '../mockData';

/*
* 标识所有的已经在section中的fields的is_selected为true
* */
const initFilels = (fields, sections) => {
  const allSelectedFileds = [];
  sections.reduce((accumulator, item) => accumulator.push(item.fields.slice()), allSelectedFileds);

  return fields.map(item => Object.assign({}, item, {
    isSelected: _.find(allSelectedFileds, { code: item.code }),
  }));
};


const fields = (state = initFilels(allFields, allSections), action) => {
  switch (action.type) {
    case ADD_FIELD_TO_SECTION:
      return;
    default:
      return state;
  }
};

export default fields;
