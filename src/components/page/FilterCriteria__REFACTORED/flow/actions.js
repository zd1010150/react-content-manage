import { get } from 'store/http/httpAction';
import {
  SET_FIELDS,
  ADD_CRITERION,
  SET_CRITERION,
  REMOVE_CRITERION,
  SET_SIDER_RECORD,
  SET_FIELD_OPTIONS,
} from './actionTypes';

export const addCriterion = () => ({
  type: ADD_CRITERION,
});

export const setFields = fields => ({
  type: SET_FIELDS,
  payload: { fields },
});

export const setCriterionByColumn = (column, displayNum, newValue, newSubtype) => ({
  type: SET_CRITERION,
  payload: { column, displayNum, newValue, newSubtype },
});

export const removeCriterionByDisplayNum = removedDisplayNum => ({
  type: REMOVE_CRITERION,
  payload: { removedDisplayNum },
});

export const setSiderRecord = criterion => ({
  type: SET_SIDER_RECORD,
  payload: { criterion },
});

export const setFieldOptions = (criterion, options) => ({
  type: SET_FIELD_OPTIONS,
  payload: { criterion, options },
});

export const fetchOptionsIfNeeded = criterion => (dispatch) => {
  const { field } = criterion;
  if (field.fetched) {
    return dispatch(setSiderRecord(criterion));
  }
  return get(`/admin/objects/lookup-metadata/${field.id}`, {}, dispatch)
          .then((data) => {
            if (data) {
              dispatch(setFieldOptions(criterion, data));
              dispatch(setSiderRecord(criterion));
            }
          });
};
