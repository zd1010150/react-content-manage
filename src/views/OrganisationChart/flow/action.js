import { get, patch, post, httpDelete } from 'store/http/httpAction';
import { fetchTeams } from 'store/global/action';
import _ from 'lodash';
import { ORGCHART_SET_SORTABLE_VIEW_VISIBLE,
  ORGCHART_SET_ADD_VISIBLE,
  ORGCHART_RESET_NEW_DEPARMENT,
  ORGCHART_SET_NEW_DEPARTMENT_NAME,
  ORGCHART_SET_SELECTED_DEPARTMENT,
  ORGCHART_SET_USER,
  ORGCHART_SET_SELECTED_USER_TEAM_DIALOG_VISIBLE,
  ORGCHART_SET_SELECT_USER } from './actionType';


export const setSortableViewVisible = isSortViewVisible => ({
  type: ORGCHART_SET_SORTABLE_VIEW_VISIBLE,
  isSortViewVisible,
});
/* ADD */
export const setAddVisible = isAddVisible => ({
  type: ORGCHART_SET_ADD_VISIBLE,
  isAddVisible,
});


export const setNewDepartName = name => ({
  type: ORGCHART_SET_NEW_DEPARTMENT_NAME,
  name,
});
export const resetNewDepartment = () => ({
  type: ORGCHART_RESET_NEW_DEPARMENT,
});
/* Display the user */
export const setSelectedTeam = (id, name) => ({
  type: ORGCHART_SET_SELECTED_DEPARTMENT,
  id,
  name,
});

export const setSeleteTeamDialogVisible = isSelectTeamDialogVisible => ({
  type: ORGCHART_SET_SELECTED_USER_TEAM_DIALOG_VISIBLE,
  isSelectTeamDialogVisible,
});

export const setSelectedUser = user => ({
  type: ORGCHART_SET_SELECT_USER,
  user,
});

export const setAllUser = users => ({
  type: ORGCHART_SET_USER,
  users,
});

export const addDepartment = (name, parentId, cb) => dispatch => post('/admin/teams', { name, parent_id: parentId }, dispatch).then((data) => {
  if (!_.isEmpty(data)) {
    dispatch(fetchTeams());
  }
  if (_.isFunction(cb)) {
    cb();
  }
});

export const deleteDepartment = id => dispatch => httpDelete(`/admin/teams/${id}`, { }, dispatch).then((data) => {
  if (!_.isEmpty(data)) {
    dispatch(fetchTeams());
  }
});

export const updateTeam = (id, name, cb) => dispatch => patch(`/admin/teams/${id}`, { name }, dispatch).then((data) => {
  if (!_.isEmpty(data)) {
    dispatch(fetchTeams());
  }
  if (_.isFunction(cb)) {
    cb();
  }
});

export const sortDepartment = cb => (dispatch, getState) => patch('/admin/teams/', { teams: getState().global.settings.teams }, dispatch).then((data) => {
  if (!_.isEmpty(data)) {
    dispatch(fetchTeams());
  }
  if (_.isFunction(cb)) {
    cb();
  }
});

export const getAllUser = () => dispatch => get('/admin/users/all', {}, dispatch).then((data) => {
  if (!_.isEmpty(data.data)) {
    dispatch(setAllUser(data.data));
  }
});
