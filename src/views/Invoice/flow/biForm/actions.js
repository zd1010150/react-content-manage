import {
  SET_BI_FORM,
  SET_BI_FIELD,
} from './actionTypes';

export const setBIForm = data => ({
  type: SET_BI_FORM,
  payload: { data },
});

export const setBIField = field => ({
  type: SET_BI_FIELD,
  payload: { field },
});
