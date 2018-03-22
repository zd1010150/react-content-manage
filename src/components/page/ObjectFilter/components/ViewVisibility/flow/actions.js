import {
  SET_VISIBILITY_OPTION,
  SELECT_TEAM,
  SET_USERS,
  ADD_ENTITY_TO_SELECTION,
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

// TODO: extract these part into global settings to avoid duplication with similar part in Setup
//       also will resolve the issue in future if work on code splitting
export const setUsers = users => ({
  type: SET_USERS,
  payload: { users },
});

export const fetchUsers = () => dispatch => get('/admin/users/all', {}, dispatch).then((data) => {
  if (!_.isEmpty(data.data)) {
    dispatch(setUsers(data.data));
  }
});

export const addEntityToSelection = (entityId, isTeam) => ({
  type: ADD_ENTITY_TO_SELECTION,
  payload: { entityId, isTeam },
});