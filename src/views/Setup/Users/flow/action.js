import { get, patch, post, httpDelete } from 'store/http/httpAction';
import _ from 'lodash';
import EnumsManager from 'utils/EnumsManager';
import { SETUP_USERS_TOGGLE_DEPARTMENT_SELECT_DIALOG, SETUP_USERS_DEPARTMENT, SETUP_USERS_PAGENATIONS, SETUP_USERS_USERS, SETUP_USERS_EDIT_USER, SETUP_USERS_SEARCHKEY } from './actionType';

export const setEditUser = user => ({
  type: SETUP_USERS_EDIT_USER,
  user,
});
export const toggleDepartmentDialog = visible => ({
  type: SETUP_USERS_TOGGLE_DEPARTMENT_SELECT_DIALOG,
  isDisplayDepartmentDialog: visible,
});

export const setDepartment = args => ({
  type: SETUP_USERS_DEPARTMENT,
  ...args,
});

export const setUserData = users => ({
  type: SETUP_USERS_USERS,
  users,
});

const setPaginations = (perPage, currentPage, total) => ({
  type: SETUP_USERS_PAGENATIONS,
  perPage,
  currentPage,
  total,
});

export const setSearchKey = searchKey => ({
  type: SETUP_USERS_SEARCHKEY,
  searchKey,
});

export const fetchUsers = (perPage = EnumsManager.DefaultPageConfigs.PageSize, currentPage = 1, search, dispatch) => get('/admin/users/list', { per_page: perPage, page: currentPage, search }, dispatch).then((data) => {
  if (data && (!_.isEmpty(data.data)) && (!_.isEmpty(data.meta))) {
    dispatch(setUserData(data.data));
    const { pagination } = data.meta;

    dispatch(setPaginations(pagination.per_page, pagination.current_page, pagination.total));
  }
});

export const queryByPaging = (perPage, currentPage) => (dispatch, getState) => {
  const state = getState();
  const { searchKey } = state.setup.users.searchKey;
  return fetchUsers(perPage, currentPage, searchKey, dispatch);
};
export const queryBySearchKey = searchKey => (dispatch, getState) => {
  const { perPage } = getState().setup.users.usersDataTablePagination;
  dispatch(setSearchKey(searchKey));
  return fetchUsers(perPage, 1, searchKey, dispatch);
};

export const updateUsers = (form, cb) => dispatch => patch(`/admin/users/${form.id}`, { ...form }, dispatch).then(() => {
  if (_.isFunction(cb)) {
    cb();
  }
});

export const addUsers = (form, callback) => dispatch => post('/admin/users', { ...form }, dispatch).then((data) => {
  if (!_.isEmpty(data)) {
    _.isFunction(callback) ? callback() : '';
  }
});

export const deleteUsers = (id, cb) => (dispatch, getState) => httpDelete(`/admin/users/${id}`, {}, dispatch).then((data) => {
  if (!_.isEmpty(data)) {
    if (_.isFunction(cb)) {
      cb(data);
    }
  }
});

export const fetchEditUser = (id, cb) => dispatch => get(`/admin/users/${id}`, {}, dispatch).then((data) => {
  if (!_.isEmpty(data.data)) {
    dispatch(setEditUser(data.data));
    if (_.isFunction(cb)) {
      cb(data.data);
    }
  }
});
