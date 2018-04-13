import { get, patch, post, httpDelete } from 'store/http/httpAction';
import { fetchTeams } from 'store/global/action';
import { DEFAULT_DEPAREMTN } from 'config/app.config';
import _ from 'lodash';
import { SETUP_ORGCHARTSET_SORTABLE_VIEW_VISIBLE,
  SETUP_ORGCHARTSET_ADD_VISIBLE,
  SETUP_ORGCHARTRESET_NEW_DEPARMENT,
  SETUP_ORGCHARTSET_NEW_DEPARTMENT_NAME,
  SETUP_ORGCHARTSET_SELECTED_DEPARTMENT,
  SETUP_ORGCHARTSET_USER,
  SETUP_ORGCHARTSET_SELECTED_USER_TEAM_DIALOG_VISIBLE,
  SETUP_ORGCHARTSET_SELECT_USER,
  SETUP_ORGCHARTSET_SORTING_TEAM,
} from './actionType';


export const setSortableViewVisible = isSortViewVisible => ({
  type: SETUP_ORGCHARTSET_SORTABLE_VIEW_VISIBLE,
  isSortViewVisible,
});
/* ADD */
export const setAddVisible = isAddVisible => ({
  type: SETUP_ORGCHARTSET_ADD_VISIBLE,
  isAddVisible,
});


export const setNewDepartName = name => ({
  type: SETUP_ORGCHARTSET_NEW_DEPARTMENT_NAME,
  name,
});
export const resetNewDepartment = () => ({
  type: SETUP_ORGCHARTRESET_NEW_DEPARMENT,
});
/* Display the user */
export const setSelectedTeam = id => ({
  type: SETUP_ORGCHARTSET_SELECTED_DEPARTMENT,
  id,
});
export const setSeleteTeamDialogVisible = isSelectTeamDialogVisible => ({
  type: SETUP_ORGCHARTSET_SELECTED_USER_TEAM_DIALOG_VISIBLE,
  isSelectTeamDialogVisible,
});

export const setSelectedUser = user => ({
  type: SETUP_ORGCHARTSET_SELECT_USER,
  user,
});

export const setAllUser = users => ({
  type: SETUP_ORGCHARTSET_USER,
  users,
});
/* Sort teams */
export const setSortingTeam = sortingTeams => ({
  type: SETUP_ORGCHARTSET_SORTING_TEAM,
  sortingTeams,
});
export const addDepartment = (name, parentId, cb) => dispatch => post('/admin/teams', { name, parent_id: parentId }, dispatch).then((data) => {
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
export const deleteDepartment = id => dispatch => httpDelete(`/admin/teams/${id}`, { }, dispatch).then((data) => {
  if (!_.isEmpty(data)) {
    dispatch(fetchTeams());
    dispatch(getAllUser());
    dispatch(setSelectedTeam(DEFAULT_DEPAREMTN.id));
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

export const sortDepartment = (teams, cb) => (dispatch) => patch('/admin/teams/struct/sort', { teams }, dispatch).then((data) => {
  if (!_.isEmpty(data)) {
    dispatch(fetchTeams());
  }
  if (_.isFunction(cb)) {
    cb();
  }
});

