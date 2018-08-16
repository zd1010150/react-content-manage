import {
  SET_CI_FORM,
  SET_CI_FIELD,
} from './actionTypes';

export const setCIForm = data => ({
  type: SET_CI_FORM,
  payload: { data },
});

export const setCIField = field => ({
  type: SET_CI_FIELD,
  payload: { field },
});
