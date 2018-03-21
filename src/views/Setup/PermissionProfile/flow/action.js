import { get, patch, post, httpDelete } from 'store/http/httpAction';
import _ from 'lodash';
import {
  SETUP_PERPRO_SET_SELECTED_DEPARTMENT,
  SETUP_PERPRO_TOGGLE_DEPARTMENT_DIALOG,
} from './actionType';

export const toggleDepartmentDialog = isDisplayDepartmentDialog => ({
  type: SETUP_PERPRO_TOGGLE_DEPARTMENT_DIALOG,
  isDisplayDepartmentDialog,
});

export const setDepartment = ({ department_id, department_name }) => ({
  type: SETUP_PERPRO_SET_SELECTED_DEPARTMENT,
  department_id,
  department_name,
});

export const fetchPermission = id => dispatch => get('', { id: '' }, dispatch).then((data) => {

});

export const savePermission = ({ team_id, permissions, description }) => dispatch => patch(`/admin/teams/${team_id}/permissions/sync`, { team_id, permissions, description }, dispatch);
