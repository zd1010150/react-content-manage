/* eslint-disable no-param-reassign,max-len */


import _ from 'lodash';
import { labelToCode } from 'utils/string';
import {
  SETUP_LAYOUT_EDIT_SET_ALL_SECTIONS,
  SETUP_LAYOUT_EDIT_ADD_FIELD_TO_SECTION,
  SETUP_LAYOUT_EDIT_DELETE_FROM_SECTION,
  SETUP_LAYOUT_EDIT_MOVE_BETWEEN_SECTION,
  SETUP_LAYOUT_EDIT_ADD_SECTION,
  SETUP_LAYOUT_EDIT_DELETE_SECTION,
  SETUP_LAYOUT_EDIT_UPDATE_SECTION,
  SETUP_LAYOUT_EDIT_MOVE_SECTION,
  SETUP_LAYOUT_CHANGE_FIELD_ATTR,
} from '../actionType';
import { DEFAULT_SECTION_CODE } from '../config';

const getRowsAndCols = (section) => {
  let rows = 0;
  const { fields } = section;
  _.forEach(fields, (value, key) => {
    rows = fields[key].length > rows ? fields[key].length : rows;
  });
  return Object.assign({}, section, { rows });
};

const initSection = (sections) => {
  const sortedSection = _.sortBy(sections, ['sequence']);
  return sortedSection.map((section) => {
    const newFields = _.groupBy(
      section.fields.map(f => ({
        x: f.position[0],
        y: f.position[1],
        is_layout_required: Boolean(f.meta.notnull),
        id: `${f.id}`,
        label: f.meta.field_label,
        type: f.meta.crm_data_type,
        position: f.position,
        pageRequired: Boolean(f.page_required),
        pageReadonly: Boolean(f.page_readonly),
        isSystem: Boolean(f.meta.is_sys_auto),
      })),
      'y',
    );
    return getRowsAndCols(Object.assign({}, section, { fields: newFields, cols: section.columns }));
  });
};


const insertFields = (fields, sourceField, position) => {
  let [x, y] = position;
  let newTargetColumnFields = [];
  const targetColumnFields = fields && fields[y] ? fields[y] : [];
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
const addSection = (state, { label, sequence, cols }) => {
  const sectionCode = labelToCode(label);
  const newSection = {
    code: sectionCode,
    sequence: state.length,
    cols,
    rows: 1,
    label,
  };
  const newState = state.slice();
  newState.push(newSection);
  return moveSection(newState, { sourceSectionCode: sectionCode, sequence });
};
const deleteSection = (state, { sectionCode, allFields }) => {
  if (sectionCode === DEFAULT_SECTION_CODE) return state;
  let newState = state.slice();
  const deletedSection = newState.filter(section => section.code === sectionCode);
  if (deletedSection && deletedSection.length > 0 && deletedSection[0].fields) {
    _.forEach(deletedSection[0].fields, (fields) => {
      _.forEach(fields, (field) => {
        if (field.is_layout_required) {
          newState = addFieldToSection(newState, {
            allFields, fieldId: field.id, sectionCode: DEFAULT_SECTION_CODE, position: [0, 0],
          });
        }
      });
    });
  }
  newState = moveSection(newState, { sourceSectionCode: sectionCode, sequence: state.length - 1 });
  return newState.slice(0, state.length - 1);
};
const converColsOfSection = (state, { sectionCode, cols }) => {
  const converSection = state.filter(section => section.code === sectionCode)[0];
  if (converSection.cols === cols || cols <= 0) {
    return state;
  }
  const allSectionFields = [];
  const newFields = {};
  _.forEach(converSection.fields, (fields) => {
    allSectionFields.push(...fields);
  });
  for (let i = 0, row = 0; i < allSectionFields.length; i++) {
    if (i && i % cols === 0) { row++; }
    const colIndex = i % cols;
    let field = allSectionFields[i];
    field = Object.assign({}, field, { x: row, y: colIndex });
    _.isEmpty(newFields[colIndex]) ? newFields[colIndex] = [field] : newFields[colIndex].push(field);
  }
  return Object.assign({}, converSection, { fields: newFields, cols, rows: Math.ceil(allSectionFields.length / cols) });
};


const updateSection = (state, { label, sectionCode, cols }) => state.map((section) => {
  if (section.code === sectionCode) {
    if (section.cols !== cols) {
      section = converColsOfSection(state, { sectionCode, cols });
    }
    return Object.assign({}, section, { label });
  }
  return section;
});

const updateFieldAttr = (fields, fieldId, attr) => {
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
  newTargetColumnFields = targetColumn.slice(0);
  newTargetColumnFields[x] = Object.assign({}, targetColumn[x], { ...attr });
  return Object.assign({}, fields, { [y]: newTargetColumnFields });
};

const changeFieldAttr = (state, {
  sectionCode, fieldId, showValue,
}) => state.map((section) => {
  if (section.code === sectionCode) {
    return {
      ...section,
      fields: updateFieldAttr(
        section.fields, fieldId,
        { pageRequired: showValue === 'required', pageReadonly: showValue === 'readOnly' },
      ),
    };
  }
  return section;
});

const sections = (state = [], action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_LAYOUT_EDIT_SET_ALL_SECTIONS:
      return initSection(payload.sections);
    case SETUP_LAYOUT_EDIT_ADD_FIELD_TO_SECTION:
      return addFieldToSection(state, payload);
    case SETUP_LAYOUT_EDIT_DELETE_FROM_SECTION:
      return deleteFieldFromSection(state, payload);
    case SETUP_LAYOUT_EDIT_MOVE_BETWEEN_SECTION:
      return moveField(state, payload);
    case SETUP_LAYOUT_EDIT_DELETE_SECTION:
      return deleteSection(state, payload);
    case SETUP_LAYOUT_EDIT_ADD_SECTION:
      return addSection(state, payload);
    case SETUP_LAYOUT_EDIT_MOVE_SECTION:
      return moveSection(state, payload);
    case SETUP_LAYOUT_EDIT_UPDATE_SECTION:
      return updateSection(state, payload);
    case SETUP_LAYOUT_CHANGE_FIELD_ATTR:
      return changeFieldAttr(state, payload);
    default:
      return state;
  }
};


export default sections;
