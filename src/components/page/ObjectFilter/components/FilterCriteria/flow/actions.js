import { get } from 'store/http/httpAction';
import {
  SET_FILTERS,
  SET_CONDITION_LOGIC,
  SET_SIDER_OPTIONS,
  SET_SIDER_SELECTION,
  SYNC_SIDER_SELECTION,
  INSERT_SIDER_SELECTION,
  ADD_FILTER,
  REMOVE_FILTER,
  CHANGE_FILTER,
  SET_LOOKUP_VALUE,
} from './actionTypes';

export const setFilters = data => ({
  type: SET_FILTERS,
  payload: { data },
});

export const setConditionLogic = condition_logic => ({
  type: SET_CONDITION_LOGIC,
  payload: { condition_logic },
});

export const addFilter = () => ({
  type: ADD_FILTER,
});

export const removeFilter = displayNum => ({
  type: REMOVE_FILTER,
  payload: { displayNum },
});

export const changeFilterByColumn = (displayNum, key, value, fieldId) => ({
  type: CHANGE_FILTER,
  payload: { displayNum, key, value, fieldId },
});

export const setSiderSelection = $ => ({
  type: SET_SIDER_SELECTION,
});

export const setSiderOptions = (siderDisplayNum, siderOptions) => ({
  type: SET_SIDER_OPTIONS,
  payload: { siderDisplayNum, siderOptions },
});

export const fetchLookupValuesById = (displayNum, id) => dispatch => get(`/admin/objects/lookup-metadata/${id}`, {}, dispatch).then(json => {
  if (json) {
    dispatch(setSiderOptions(displayNum, json));
    dispatch(setSiderSelection());
  }
});

export const syncSiderSelection = checkedIds => ({
  type: SYNC_SIDER_SELECTION,
  payload: { checkedIds },
});

export const insertSiderSelectionToField = $ => ({
  type: INSERT_SIDER_SELECTION,
});

export const setLookupValue = newLookupFilters =>({
  type: SET_LOOKUP_VALUE,
  payload: { newLookupFilters },
});