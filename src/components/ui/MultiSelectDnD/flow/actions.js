import { SET_NEW_VALUE, SET_FIELD_VALUES, UPDATE_VALUES } from './actionTypes';
import { get, httpDelete, post } from 'store/http/httpAction';

const url = '/admin/leads';

export const setFieldValues = allValues => ({  
  type: SET_FIELD_VALUES,
  allValues,
});

export const fetchFieldValues = () => dispatch => get(url, {}, dispatch)
        .then(json => {
          if (json) dispatch(setFieldValues(json));
        });

export const setNewValue = json => ({  
  type: SET_NEW_VALUE,
  json,
});

export const addNewValue = newValue => dispatch => get(url, {}, dispatch)
        .then(json => {
          if (json) dispatch(setNewValue(newValue));
        });

export const sortValues = ids => dispatch => get(url, {}, dispatch)
        .then(json => {
          console.log('new order has synced');
        });


export const removeById = id => ({  
  type: UPDATE_VALUES,
  id,
});

export const removeValue = id => dispatch => get(url, {}, dispatch)
        .then(json => {
          if (json) dispatch(removeById(id));
        });

export const deactivateValue = id => dispatch => get(url, {}, dispatch)
        .then(json => {
          if (json) dispatch(removeById(id));
        });