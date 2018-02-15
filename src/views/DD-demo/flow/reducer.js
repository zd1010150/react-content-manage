/* eslint-disable no-param-reassign,max-len */

import _ from 'lodash';
import { ADD_FIELD_TO_SECTION, DELETE_FROM_SECTION, MOVE_BETWEEN_SECTION } from './actionType';
import { allFields, allSections } from './mockData';

const initSection = (sections) => {
  const sortedSection = _.sortBy(sections, ['sequence']);
  return sortedSection.map(section => Object.assign({}, section, { fields: _.sortBy(section.fields, ['sequence']) }));
};

const addFieldToSection = (state, fieldCode, sectionCode, position) => {
  const newState = Object.assign({}, state);
  state.map((item) => {
    if (item.code === fieldCode) {
      return Object.assign({}, item, {
        isSelected: true,
      });
    }
    return item;
  });
};

const sections = (state = initSection(allSections), action) => {
  switch (action.type) {
    case ADD_FIELD_TO_SECTION:
    default:
      return state;
  }
};


