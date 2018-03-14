import { get, patch, post, httpDelete } from 'store/http/httpAction';
import _ from 'lodash';
import EnumsManager from 'utils/EnumsManager';
import { TOGGLE_DEPARTMENT_SELECT_DIALOG, SET_DEPARTMENT, SET_PAGENATIONS, SET_USERS, SET_EDIT_USER, SET_SEARCHKEY } from './actionType';

export const setEditUser = args => ({
  type: SET_EDIT_USER,
  ...args,
});
export const toggleDepartmentDialog = visible => ({
  type: TOGGLE_DEPARTMENT_SELECT_DIALOG,
  isDisplayDepartmentDialog: visible,
});

export const setDepartment = args => ({
  type: SET_DEPARTMENT,
  ...args,
});

export const setUserData = users => ({
  type: SET_USERS,
  users,
});

const setPaginations = (perPage, currentPage, total) => ({
  type: SET_PAGENATIONS,
  perPage,
  currentPage,
  total,
});

export const setSearchKey = searchKey => ({
  type: SET_SEARCHKEY,
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
  const { searchKey } = state.setupUsers.searchKey;
  return fetchUsers(perPage, currentPage, searchKey, dispatch);
};
export const queryBySearchKey = searchKey => (dispatch, getState) => {
  const { perPage } = getState().setupUsers.usersDataTablePagination;
  dispatch(setSearchKey(searchKey));
  return fetchUsers(perPage, 1, searchKey, dispatch);
};

export const updateUsers = form => dispatch => patch(`/admin/users/${form.id}`, { ...form }, dispatch);

export const addUsers = (form, callback) => dispatch => post('/admin/users', { ...form }, dispatch).then((data) => {
  if (!_.isEmpty(data)) {
    _.isFunction(callback) ? callback() : '';
  }
});

export const deleteUsers = (id, cb) => dispatch => httpDelete(`/admin/users/${id}`, {}, dispatch).then((data) => {
  if (!_.isEmpty(data)) {
    dispatch(fetchUsers(dispatch));
    _.isFunction(cb) ? cb() : '';
  }
});

export const fetchEditUser = () => dispatch => httpDelete(`/admin/users/${id}`, {}, dispatch).then((data) => {
  if (!_.isEmpty(data)) {
    dispatch(fetchUsers());
    _.isFunction(cb) ? cb() : '';
  }
});
