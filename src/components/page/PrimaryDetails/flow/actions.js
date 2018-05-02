/* eslint arrow-parens: ["error", "as-needed"] */
import { get } from 'store/http/httpAction';
import Enums from 'utils/EnumsManager';
import { getFetchUrl, getUpdateUrl, getRequestMethod } from './utils/requests';
import mapToRequestBody from './utils/mapToRequestBody';
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

const { PhantomId } = Enums;


/**
 *  Fetch A Client Structure Data
 */
const setSections = (mappedValues = [], sections) => ({
  type: SET_SECTIONS,
  payload: { mappedValues, sections },
});

export const tryFetchObjectDetails = (objectId, objectType, accountId) => dispatch =>
  get(getFetchUrl(objectId, objectType, accountId), {}, dispatch).then(data => {
    if (data
        && !_.isEmpty(data.data)
        && !_.isEmpty(data.data.structure)) {
      const { tools, sections, modules } = data.data.structure;
      if (tools && sections && modules) {
        dispatch(setSections(data.mapped_values, sections));
        // TODO: Add actions
        // dispatch(setTools(tools));
        // dispatch(setModules(modules));
      }
    }
  });

/**
 *  TODO: OPERATIONS LIST
 *  save and new
 *  [doing]
 *  load options for lookup field when first open
 *  [done]
 *  save
 *  update
 *  go back
 *  check active field is in proper look by type
 *  toggle field
 *  change field
 *  revert single
 *  revert all
 */

/**
 *  SAVE OR UPDATE A CLIENT
 */
const setNewId = newId => ({
  type: SET_NEW_ID,
  payload: { newId },
});

const setUpdateValues = updatedData => ({
  type: UPDATE_VALUES,
  payload: { updatedData },
});

export const tryUpdateClient = (objectId, objectType, accountId) => (dispatch, getState) => {
  getRequestMethod(objectId)(getUpdateUrl(objectId, objectType, accountId), mapToRequestBody(getState()), dispatch).then(data => {
    if (data && !_.isEmpty(data.data)) {
      if (objectId === PhantomId) {
        // set success and push new history to be exist one
        dispatch(setNewId(data.data.id));
      } else {
        // set updated value to be initial values
        // TODO: Issues with this action need to be resolved
        // dispatch(setUpdateValues(data.data));
        // Instead, we use refetch for now
        dispatch(tryFetchObjectDetails(objectId, objectType, accountId));
      }
    }
  });
};


// TOGGLE FIELD STATE
export const setActiveField = (activeId, activeCode) => ({
  type: SET_ACTIVE_FIELD,
  payload: { activeId, activeCode },
});


export const resetActiveField = (inactiveId, inactiveCode) => ({
  type: RESET_ACTIVE_FIELD,
  payload: { inactiveId, inactiveCode },
});


// SET FIELD NEW VALUE
export const setFieldValue = (fieldId, code, newValue) => ({
  type: SET_FIELD_VALUE,
  payload: { fieldId, code, newValue },
});


export const resetFieldValue = (resetFieldId, resetCode) => ({
  type: RESET_FIELD_VALUE,
  payload: { resetFieldId, resetCode },
});

export const resetAllFieldsValue = () => ({
  type: RESET_ALL_FIELDS,
});

// Resets
export const resetId = () => ({
  type: RESET_ID,
});

export const reset = () => ({
  type: RESET,
});


//
export const setFieldOptionsById = (lookupFieldId, code, options) => ({
  type: SET_FIELD_OPTIONS,
  payload: { lookupFieldId, code, options },
});

/**
 * Fetch lookup field options async
 * @param {string} fieldId
 * @param {string} code
 */
export const tryFetchFieldOptions = (fieldId, code) => dispatch =>
  get(`/admin/objects/lookup-metadata/${fieldId}`, {}, dispatch).then(data => {
    if (data) {
      dispatch(setFieldOptionsById(fieldId, code, data));
    }
  });
