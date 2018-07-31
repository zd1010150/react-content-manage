import { get } from 'store/http/httpAction';
import {
  SET_LOGIC,
  SET_CRITERIA,
  SET_FIELDS,
  ADD_CRITERION,
  SET_CRITERION,
  REMOVE_CRITERION,
  SET_SIDER_RECORD,
  SET_FIELD_OPTIONS,
  RESET_CRITERIA,
} from './actionTypes';

export const setCriteria = criteriaData => ({
  type: SET_CRITERIA,
  payload: { criteriaData },
});

export const setLogic = newLogic => ({
  type: SET_LOGIC,
  payload: { newLogic },
});

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

export const tryFetchOptionsIfNeeded = criterion => (dispatch) => {
  const { field } = criterion;
  if (field.fetched) {
    return dispatch(setSiderRecord(criterion));
  }
  return get(`/admin/objects/lookup-metadata/${field.id}`, {}, dispatch)
          .then((data) => {
            if (data) {
              // NOTES: Lookup field may contain duplicate values, we need to remove the duplication here.
              //        Otherwise, duplications will cause issue on Sider selection and render due to same key issue.
              dispatch(setFieldOptions(criterion, _.uniqBy(data, criterion.field.lookupKey)));
              dispatch(setSiderRecord(criterion));
            }
          });
};

export const resetCriteria = () => ({
  type: RESET_CRITERIA,
});
