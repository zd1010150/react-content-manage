import { ADD_FIELD_TO_SECTION, DELETE_FROM_SECTION, MOVE_BETWEEN_SECTION } from './actionType';


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
