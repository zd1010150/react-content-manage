import { get, patch, post } from 'store/http/httpAction';
import _ from 'lodash';
import EnumsManager from 'utils/EnumsManager';
import { TOGGLE_DEPARTMENT_SELECT_DIALOG, SET_DEPARTMENT, SET_PAGENATIONS, SET_USERS, SET_EDIT_USER } from './actionType';

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

export const setUserData = args => ({
  type: SET_USERS,
  ...args,
});

const setPaginations = (perPage, currentPage, total) => ({
  type: SET_PAGENATIONS,
  perPage,
  currentPage,
  total,
});

export const fetchUsers = (perPage = EnumsManager.DefaultPageConfigs.PageSize, currentPage = 1) => dispatch => get('/admin/users', { per_page: perPage, page: currentPage }, dispatch).then((data) => {
  if (data && (!_.isEmpty(data.data)) && (!_.isEmpty(data.meta))) {
    dispatch(setUserData(data.data));
    const { pagination } = data.meta;
    dispatch(setPaginations(pagination.per_page, pagination.current_page, pagination.total));
  }
});

export const updateUsers = form => dispatch => patch(`/admin/users/${form.id}`, { ...form }, dispatch).then((data) => {
  if (!_.isEmpty(data)) {
    dispatch(fetchUsers());
  }
});

export const addUsers = (form, callback) => dispatch => post('/admin/users', { ...form }, dispatch).then((data) => {
  if (!_.isEmpty(data)) {
    dispatch(fetchUsers());
    callback();
  }
});

