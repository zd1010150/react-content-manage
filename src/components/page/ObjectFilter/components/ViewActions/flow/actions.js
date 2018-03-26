import { post, patch } from 'store/http/httpAction';

import { SAVE_FAILED, SAVE_SUCCESS } from './actionTypes';

// Format redux to cater for API data format requirement
const mapDataToAPI = (object_type, data) => {
  const { name, fields, filterCriteria, visibilities } = data;

  const { view_name } = name;
  
  const { condition_logic, filters } = filterCriteria;

  const { selectedFields } = fields;
  const selectors = selectedFields.map((field, i) => ({
    id: field.id,
    display_num: i,
  }));

  const { selectedOption, selectedTeams, selectedUsers } = visibilities;
  const assign_to_users = selectedUsers.map(user => user.id);
  const assign_to_teams = selectedTeams.map(team => team.id);

  const testData = {
    view_name,
    object_type,
    condition_logic,
    filters,
    selectors,
    assign_option: selectedOption,
    assign_to_users,
    assign_to_teams,
  };
  return testData;
};

export const saveSuccess = _ => ({
  type: SAVE_SUCCESS,
});

export const trySaveNew = (objectType, viewData) => dispatch => post('/admin/list_views', mapDataToAPI(objectType, viewData), dispatch).then((data) => {
  if (data && !_.isEmpty(data.data)) {
    dispatch(saveSuccess());
  }
});

export const trySave = (objectType, viewData, id) => dispatch => patch(`/admin/list_views/${id}`, mapDataToAPI(objectType, viewData), dispatch).then((data) => {
  if (data) {
    debugger;
    // dispatch(setUsers(data.data));
  }
});