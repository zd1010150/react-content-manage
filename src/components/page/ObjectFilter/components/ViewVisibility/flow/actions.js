import {
  SET_VISIBILITY_OPTION,
  SELECT_TEAM,
  SET_USERS,
} from './actionTypes';
import { get } from 'store/http/httpAction';

export const setVisibilityOption = selectedOption => ({  
  type: SET_VISIBILITY_OPTION,
  payload: { selectedOption },
});

export const selectTeam = teamId => ({
  type: SELECT_TEAM,
  payload: { teamId },
});

export const setUsers = users => ({
  type: SET_USERS,
  payload: { users },
});

export const fetchUsers = () => dispatch => get('/admin/users/all', {}, dispatch).then((data) => {
  if (!_.isEmpty(data.data)) {
    dispatch(setUsers(data.data));
  }
});