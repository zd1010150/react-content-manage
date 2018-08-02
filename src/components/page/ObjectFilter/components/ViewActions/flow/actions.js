import { httpDelete, patch, post } from 'store/http/httpAction';
import { DONE } from './actionTypes';
import mapCriteriaToApi from './utils';

// Format redux to cater for API data format requirement
const mapDataToAPI = (objectType, data, getState) => {
  const {
    name,
    fields,
    visibilities,
  } = data;
  const { view_name } = name;

  const { selectedFields } = fields;
  const selectors = selectedFields.map((field, i) => ({
    id: field.id,
    display_num: i,
  }));

  const { selectedOption, selectedTeams, selectedUsers } = visibilities;
  const assignees = selectedUsers.map(user => user.id);
  const assignedTeams = selectedTeams.map(team => team.id);

  // format criteria data
  const state = getState();
  const { FilterCriteria__REFACTORED } = state;
  const { criteria, logic } = FilterCriteria__REFACTORED;
  const mappedCriteria = mapCriteriaToApi(criteria.criteria);

  return {
    view_name,
    object_type: objectType,
    condition_logic: logic,
    filters: mappedCriteria,
    selectors,
    assign_option: selectedOption,
    assign_to_users: assignees,
    assign_to_teams: assignedTeams,
  };
};

export const done = () => ({
  type: DONE,
});


export const trySaveNew = (objectType, viewData) => (dispatch, getState) =>
  post('/admin/list_views', mapDataToAPI(objectType, viewData, getState), dispatch).then((data) => {
    if (data && !_.isEmpty(data.data)) {
      dispatch(done());
    }
  });


export const trySave = (objectType, viewData, id) => (dispatch, getState) =>
  patch(`/admin/list_views/${id}`, mapDataToAPI(objectType, viewData, getState), dispatch).then((data) => {
    if (data && !_.isEmpty(data.data)) {
      dispatch(done());
    }
  });


export const tryDeleteView = viewId => dispatch =>
  httpDelete(`/admin/list_views/${viewId}`, {}, dispatch).then((data) => {
    if (data && data.deleted) {
      dispatch(done());
    }
  });
