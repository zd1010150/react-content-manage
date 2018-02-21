/* eslint-disable no-param-reassign,max-len */


import _ from 'lodash';
import { labelToCode } from 'utils/string';
import { ADD_FIELD_TO_SECTION, DELETE_FROM_SECTION, MOVE_BETWEEN_SECTION, ADD_SECTION, DELETE_SECTION, UPDATE_SECTION, MOVE_SECTION } from '../actionType';
import { allSections } from '../mockData';

const getRowsAndCols = (section) => {
  let rows = 0;
  const { fields } = section;
  _.forEach(fields, (value, key) => {
    rows = fields[key].length > rows ? fields[key].length : rows;
  });
  const cols = Object.keys(fields).length;
  return Object.assign({}, section, { rows, cols });
};

const initSection = (sections) => {
  const sortedSection = _.sortBy(sections, ['sequence']);
  return sortedSection.map((section) => {
    const newFields = _.groupBy(section.fields.map(f => Object.assign({}, f, { x: f.position[0], y: f.position[1] })), 'y');
    return getRowsAndCols(Object.assign({}, section, { fields: newFields }));
  });
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
  const newSection = getRowsAndCols(Object.assign({}, section, { fields: newFields }));
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
  const newSection = getRowsAndCols(Object.assign({}, section, { fields: newFields }));
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
const moveSection = (state, {
  sourceSectionCode, sequence,
}) => {
  const newState = state.slice();
  const sourceSection = _.find(state, { code: sourceSectionCode });
  const sourceSequence = sourceSection.sequence;
  if (sourceSection && sequence !== sourceSequence) {
    if (sequence > sourceSequence) {
      for (let i = sourceSequence; i < sequence; i++) {
        newState[i] = Object.assign({}, state[i + 1], { sequence: i });
      }
    } else {
      for (let i = sequence; i < sourceSequence; i++) {
        newState[i + 1] = Object.assign({}, state[i], { sequence: i + 1 });
      }
    }
    newState[sequence] = Object.assign({}, sourceSection, { sequence });
    return newState;
  }
  return state;
};
const addSection = (state, { label, sequence }) => {
  const sectionCode = labelToCode(label);
  const newSection = {
    code: sectionCode,
    sequence: state.length,
    cols: 0,
    rows: 0,
    label,
  };
  const newState = state.slice();
  newState.push(newSection);
  return moveSection(newState, { sourceSectionCode: sectionCode, sequence });
};
const deleteSection = (state, { sectionCode } ) => {
  debugger;
  const newState = moveSection(state, { sourceSectionCode: sectionCode, sequence: state.length - 1 });
  return newState.slice(0, state.length - 1);
};
const updateSection = (state, { label, sectionCode }) => state.map((section) => {
  if (section.code === sectionCode) {
    return Object.assign({}, section, { label });
  }
  return section;
});
const sections = (state = initSection(allSections), action) => {
  debugger;
  const { type, ...payload } = action;
  switch (type) {
    case ADD_FIELD_TO_SECTION:
      return addFieldToSection(state, payload);
    case DELETE_FROM_SECTION:
      return deleteFieldFromSection(state, payload);
    case MOVE_BETWEEN_SECTION:
      return moveField(state, payload);
    case DELETE_SECTION:
      return deleteSection(state, payload);
    case ADD_SECTION:
      return addSection(state, payload);
    case MOVE_SECTION:
      return moveSection(state, payload);
    case UPDATE_SECTION:
      return updateSection(state, payload);
    default:
      return state;
  }
};


export default sections;
