/* eslint-disable no-case-declarations */
import {
  SET_SECTIONS,
  SET_ACTIVE_FIELD,
  RESET_ACTIVE_FIELD,
  SET_FIELD_VALUE,
  RESET_FIELD_VALUE,
  RESET_ALL_FIELDS,
  SET_NEW_ID,
  RESET_ID,
  RESET,
  UPDATE_VALUES,
  SET_FIELD_OPTIONS,
} from './actionTypes';
import {
  setActiveById,
  setInactiveById,
  mapSections,
  setFieldValueByKey,
  resetFieldValue,
  resetAllFieldsValue,
  updateSections,
} from './utils/mapSections';

const initialState = {
  sections: [],
  newId: '',
};

const details = (state = initialState, action) => {
  switch (action.type) {
    case SET_SECTIONS:
      const { mappedValues, sections } = action.payload;
      return {
        ...state,
        sections: mapSections(sections, mappedValues),
      };


    case SET_ACTIVE_FIELD:
      const { activeCode, activeId } = action.payload;
      return {
        ...state,
        sections: setActiveById(activeId, activeCode, state.sections),
      };


    case RESET_ACTIVE_FIELD:
      const { inactiveId, inactiveCode } = action.payload;
      return {
        ...state,
        sections: setInactiveById(inactiveId, inactiveCode, state.sections),
      };


    case SET_FIELD_VALUE:
      const { fieldId, newValue, code } = action.payload;
      return {
        ...state,
        sections: setFieldValueByKey(fieldId, code, state.sections, 'value', newValue),
      };

    case RESET_FIELD_VALUE:
      const { resetFieldId, resetCode } = action.payload;
      return {
        ...state,
        sections: resetFieldValue(resetFieldId, resetCode, state.sections),
      };


    case RESET_ALL_FIELDS:
      return {
        ...state,
        sections: resetAllFieldsValue(state.sections),
      };


    case SET_NEW_ID:
      const { newId } = action.payload;
      return {
        ...state,
        newId,
      };


    case UPDATE_VALUES:
      const { updatedData } = action.payload;
      return {
        ...state,
        sections: updateSections(updatedData, state.sections),
      };


    case SET_FIELD_OPTIONS:
      const { lookupFieldId, options } = action.payload;
      return {
        ...state,
        sections: setFieldValueByKey(
          lookupFieldId,
          action.payload.code,
          state.sections,
          'options',
          options,
        ),
      };


    // Resets
    case RESET_ID:
      return {
        ...state,
        newId: initialState.newId,
      };
    case RESET:
      return initialState;


    default:
      return state;
  }
};

export default details;
