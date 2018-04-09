import { toUtc } from 'utils/dateTimeUtils';
import Enums from 'utils/EnumsManager';
const { DateOnly, DateTime } = Enums.FieldTypes;
import { get, post, patch } from 'store/http/httpAction';
import {
  SET_DATA_SOURCE,
  SET_ACTIVE_FIELD,
  RESET_ACTIVE_FIELD,
  SET_FIELD_VALUE,
  RESET_FIELD_VALUE,
  REVERT_ALL_FIELDS,
  SET_FIELD_OPTIONS,
} from './actionTypes';
import { setTools } from '../../Toolbar/flow/actions';

const getFetchUrl = (id, type) => {
  if (_.isNil(id) || id === Enums.PhantomId) {
    return `/admin/${type}/create`;
  }
  return `/admin/${type}/${id}/page_layout`;
};
const extractFieldValues = data => {
  const obj = {};
  data.forEach(section => {
    section.fields.forEach(field => {
      const { name, initialValue, value, type } = field;
      if (value !== initialValue) {
        obj[name] = (type === DateOnly || type === DateTime)
                      ? toUtc(value, '+1100', 'YYYY-DD-MM')
                      : value;
      }
    });
  });
  console.dir(obj);
  return obj;
};


export const setSource = dataSource => ({
  type: SET_DATA_SOURCE,
  payload: { dataSource },
});

export const tryFetch = (id, type) => dispatch =>
    get(getFetchUrl(id, type), {}, dispatch).then((data) => {
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


export const trySaveClient = (id, type, allData) => dispatch => 
    post(`/admin/${type}`, extractFieldValues(allData), dispatch).then((data) => {
      if (data && !_.isEmpty(data.data)) {
        console.log('save success');
        // refetch data by object id
        // but i don't think that's a good idea, it makes more sense to stay in this page.
        // TODO: discuss to decide the behavior
        dispatch(tryFetch(data.data.id, type));
        // TODO: think about what user want/normally to do next after add/update a lead
        // if they want to stay in this page, then we may need backend to respond with tools and modules
        // dispatch(setTools(tools));
      }
    });


export const tryUpdateClient = (id, type, allData) => dispatch => 
    patch(`/admin/${type}/${id}`, extractFieldValues(allData), dispatch).then((data) => {
      if (data && !_.isEmpty(data.data)) {
        console.log('update success');
        // refetch data by object id
        // but i don't think that's a good idea, it makes more sense to stay in this page.
        // TODO: discuss to decide the behavior
        dispatch(tryFetch(data.data.id, type));
      }
    });


export const trySaveAndAddNewClient = (id, type) => dispatch =>
    post(getFetchUrl(id, type), {}, dispatch).then((data) => {
      if (data) {
        console.log('save success');
      }
    });


export const revertAllFields = $ => ({
  type: REVERT_ALL_FIELDS,
});


export const setFieldOptionsById = (code, id, options) => ({
  type: SET_FIELD_OPTIONS,
  payload: { code, id, options },
});

export const tryFetchFieldOptions = (code, id) => dispatch =>
    get(`/admin/objects/lookup-metadata/${id}`, {}, dispatch).then((data) => {
      if (data) {
        dispatch(setFieldOptionsById(code, id, data));
      }
    });