import { ADD_FIELD_TO_SECTION, DELETE_FROM_SECTION, MOVE_BETWEEN_SECTION, ADD_SECTION, DELETE_SECTION, UPDATE_SECTION, MOVE_SECTION, TOGGLE_SECTION_ADD_EDIT_DIALOG, SET_SECTION_ATTRIBUTE, SET_CAN_DROP } from './actionType';

export const addFieldToSection = args => ({
  type: ADD_FIELD_TO_SECTION,
  ...args,
});
export const deleteFromSection = args => ({
  type: DELETE_FROM_SECTION,
  ...args,
});

export const moveBetweenSection = args => ({
  type: MOVE_BETWEEN_SECTION,
  ...args,
});

export const addSection = args => ({
  type: ADD_SECTION,
  ...args,
});

export const deleteSection = args => ({
  type: DELETE_SECTION,
  ...args,
});

export const updateSection = args => ({
  type: UPDATE_SECTION,
  ...args,
});

export const moveSection = args => ({
  type: MOVE_SECTION,
  ...args,
});

export const toggleSectionAddEditDialog = args => ({
  type: TOGGLE_SECTION_ADD_EDIT_DIALOG,
  ...args,
});

export const setSectionAttr = args => ({
  type: SET_SECTION_ATTRIBUTE,
  ...args,
});
export const setCanDrop = canDrop => ({
    type: SET_CAN_DROP,
    canDrop,
});
