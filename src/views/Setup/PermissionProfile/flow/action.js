import { get, patch, post, httpDelete } from 'store/http/httpAction';
import {
  SETUP_PERPRO_SET_SELECTED_DEPARTMENT,
  SETUP_PERPRO_TOGGLE_DEPARTMENT_DIALOG,
  SETUP_PERPRO_SET_SELECTED_PERMISSION,
  SETUP_PERPRO_SET_ALL_PERMISSIONS,
  SETUP_PERPRO_SET_EXPAND_KEYS,
} from './actionType';

export const setAllPermissions = permissions => ({
  type: SETUP_PERPRO_SET_ALL_PERMISSIONS,
  permissions,
});
export const toggleDepartmentDialog = isDisplayDepartmentDialog => ({
  type: SETUP_PERPRO_TOGGLE_DEPARTMENT_DIALOG,
  isDisplayDepartmentDialog,
});
export const setExpandedKeys = keys => ({
  type: SETUP_PERPRO_SET_EXPAND_KEYS,
  keys,
});
export const setDepartment = args => ({
  type: SETUP_PERPRO_SET_SELECTED_DEPARTMENT,
  ...args,
});

export const setSeletedDeparmentPermission = (permissions, isFromRemote) => ({
  type: SETUP_PERPRO_SET_SELECTED_PERMISSION,
  permissions,
  isFromRemote,
});

export const fetchPermission = id => dispatch => get(`/admin/teams/${id}/permissions`, {}, dispatch).then((data) => {
  dispatch(setSeletedDeparmentPermission(data.permissions, true));
  dispatch(setDepartment({ description: data.description }));
});

export const savePermission = ({ team_id, permissions, description }) => dispatch => patch(`/admin/teams/${team_id}/permissions/sync`, { team_id, permissions, description }, dispatch);

export const fetchAllPermission = () => dispatch => get('/admin/permissions', {}, dispatch).then((data) => {
  dispatch(setAllPermissions(data || {}));
});
