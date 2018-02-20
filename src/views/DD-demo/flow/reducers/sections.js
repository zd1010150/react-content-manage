/* eslint-disable no-param-reassign,max-len */

import _ from 'lodash';
import { ADD_FIELD_TO_SECTION, DELETE_FROM_SECTION, MOVE_BETWEEN_SECTION } from '../actionType';
import { allSections } from '../mockData';

const initSection = (sections) => {
  const sortedSection = _.sortBy(sections, ['sequence']);
  return sortedSection.map(section => Object.assign({}, section, {
    fields: _.groupBy(section.fields.map(f => Object.assign({}, f, { x: f.position[0], y: f.position[1] })), 'y'),
  }));
};
const insertFields = (fields, sourceField, position) => {
  let [x, y] = position;
  let newTargetColumnFields = [];
  const targetColumnFields = fields[y];
  const columnLenght = targetColumnFields.length;
  x = x > columnLenght ? columnLenght : x; // 修正插入的位置
  if (x === columnLenght) {
    newTargetColumnFields = targetColumnFields.slice();
    newTargetColumnFields.push(Object.assign({}, sourceField, { x: columnLenght, y }));
  } else if (x >= 0 && x < columnLenght) {
    newTargetColumnFields = targetColumnFields.slice(0, x);
    for (let i = x; i < columnLenght; i++) {
      newTargetColumnFields[i + 1] = Object.assign({}, targetColumnFields[i], {
        x: i + 1,
        y,
      });
    }
    newTargetColumnFields[x] = Object.assign({}, sourceField, { x, y });
  }

  return Object.assign({}, fields, { [y]: newTargetColumnFields });
};
/**
 * add field to the section
 * @param state
 * @param sections
 * @param fieldCode
 * @param sectionCode
 * @param position
 */
const addFieldToSection = (state, {
  allFields, fieldId, sectionCode, position,
}) => {
  const section = state.filter(item => item.code === sectionCode)[0];
  const field = allFields.filter(item => item.id === fieldId)[0];
  const newFields = insertFields(section.fields, field, position);
  const newSection = Object.assign({}, section, { fields: newFields });
  return state.map((item) => {
    if (item.code === sectionCode) {
      return newSection;
    } return item;
  });
};

const deleteFields = (fields, fieldId) => {
  let y,
    x,
    f,
    colFields,
    flag = false,
    newTargetColumnFields = [];
  for (const col in fields) {
    if (flag) break;
    colFields = fields[col];
    for (let i = 0; i < colFields.length; i++) {
      f = colFields[i];
      if (f.id === fieldId) {
        y = col;
        x = i;
        flag = true;
        break;
      }
    }
  }
  const targetColumn = fields[y];
  const targetColumnLength = targetColumn.length;
  if (x > 0) {
    newTargetColumnFields = targetColumn.slice(0, x);
  }
  for (let j = x + 1; j < targetColumnLength; j++) {
    newTargetColumnFields[j - 1] = Object.assign({}, targetColumn[j], { x: j - 1, y: Number(y) });
  }
  return Object.assign({}, fields, { [y]: newTargetColumnFields });
};
const deleteFieldFromSection = (state, {
  fieldId, sectionCode,
}) => {
  const section = state.filter(item => item.code === sectionCode)[0];
  const newFields = deleteFields(section.fields, fieldId);
  const newSection = Object.assign({}, section, { fields: newFields });
  return state.map((item) => {
    if (item.code === sectionCode) {
      return newSection;
    } return item;
  });
};

const moveField = (state, {
  fieldId, allFields, sourceSectionCode, targetSectionCode, position,
}) => {
  const deletedSection = deleteFieldFromSection(state, { fieldId, sectionCode: sourceSectionCode });
  return addFieldToSection(deletedSection, {
    fieldId, allFields, sectionCode: targetSectionCode, position,
  });
};
const sections = (state = initSection(allSections), action) => {
  const { type, ...payload } = action;
  switch (type) {
    case ADD_FIELD_TO_SECTION:
      return addFieldToSection(state, payload);
    case DELETE_FROM_SECTION:
      return deleteFieldFromSection(state, payload);
    case MOVE_BETWEEN_SECTION:
      return moveField(state, payload);
    default:
      return state;
  }
};


export default sections;
