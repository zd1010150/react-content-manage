import { get, post, patch } from 'store/http/httpAction';
import {
  SET_DATA_SOURCE,
  SET_ACTIVE_FIELD,
  RESET_ACTIVE_FIELD,
  SET_FIELD_VALUE,
  RESET_FIELD_VALUE,
  REVERT_ALL_FIELDS,
} from './actionTypes';
import Enums from 'utils/EnumsManager';
import { setTools } from '../../Toolbar/flow/actions';


const getFetchUrl = (id, type) => {
  if (_.isEmpty(id) || id === Enums.PhantomID) {
    return `/admin/${type}/create`;
  }
  return `/admin/${type}/${id}/page_layout`;
};

export const setSource = dataSource => ({
  type: SET_DATA_SOURCE,
  payload: { dataSource },
});

export const tryFetch = (id, type) => dispatch => get(getFetchUrl(id, type), {}, dispatch).then((data) => {
  if (data
      && !_.isEmpty(data.data)
      && !_.isEmpty(data.data.structure)) {
    dispatch(setSource(data.data.structure.sections));
    dispatch(setTools(data.data.structure.tools));
    // setModules
    //dispatch(setModules(data.data.structure.modules));
  }
});


export const setActiveField = (code, fieldId) => ({
  type: SET_ACTIVE_FIELD,
  payload: { code, fieldId },
});


export const resetActiveField = $ => ({
  type: RESET_ACTIVE_FIELD,
});


export const setFieldValue = (code, fieldId, value) => ({
  type: SET_FIELD_VALUE,
  payload: { code, fieldId, value },
});


export const resetFieldValue = (code, fieldId) => ({
  type: RESET_FIELD_VALUE,
  payload: { code, fieldId },
});

//
export const extractFieldValues = data => {
  const obj = {};
  data.forEach(section => {
    section.fields.forEach(field => {
      const { name, initialValue, value } = field;
      if (value !== initialValue) {
        obj[name] = value;
      }
    });
  });
  console.dir(obj);
  return obj;
};

export const trySaveClient = (id, type, allData) => dispatch => post(`/admin/${type}`, extractFieldValues(allData), dispatch).then((data) => {
  if (data) {
    console.log('save success');
  }
});


export const tryUpdateClient = (id, type, allData) => dispatch => patch(`/admin/${type}/${id}`, extractFieldValues(allData), dispatch).then((data) => {
  if (data) {
    console.log('update success');
  }
});


export const trySaveAndAddNewClient = (id, type) => dispatch => post(getFetchUrl(id, type), {}, dispatch).then((data) => {
  if (data) {
    console.log('save success');
  }
});


export const revertAllFields = $ => ({
  type: REVERT_ALL_FIELDS,
});