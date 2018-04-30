import { get, patch } from 'store/http/httpAction';
import {
  UPDATE_SELECTION,
  CHANGE_FROM_SELECTION,
  REMOVE_FROM_SELECTION,
  SET_ACTIVE_TEAM,
  SET_SHARE_TO,
} from './actionTypes';

//
const setShareTo = (sharedTeams, sharedUsers) => ({
  type: SET_SHARE_TO,
  payload: { sharedTeams, sharedUsers },
});

export const tryFetchShareTo = (objectType, objectId) => dispatch =>
  get(`/admin/${objectType}/${objectId}/shares`, {}, dispatch).then((data) => {
    if (data
        && !_.isEmpty(data.shared_to_teams)
        && data.shared_to_teams.data
        && !_.isEmpty(data.shared_to_users)
        && data.shared_to_users.data) {
      dispatch(setShareTo(data.shared_to_teams.data, data.shared_to_users.data));
    }
  });


//
export const removeFromSelection = (removeId, isRemoveFromTeam) => ({
  type: REMOVE_FROM_SELECTION,
  payload: { removeId, isRemoveFromTeam },
});


//
export const changeSelections = (changedUserIds, allUsers) => ({
  type: CHANGE_FROM_SELECTION,
  payload: { changedUserIds, allUsers },
});


//
export const setActiveTeam = (activeTeamId, teams, allUsers) => ({
  type: SET_ACTIVE_TEAM,
  payload: { activeTeamId, teams, allUsers },
});


//
export const updateSelection = (id, record, isTeam, isRemove) => ({
  type: UPDATE_SELECTION,
  payload: { id, record, isTeam, isRemove },
});


//
export const tryUpdateShares = (objectType, objectId, params) => dispatch =>
  patch(`/admin/${objectType}/${objectId}/shares`, params, dispatch).then((data) => {
    if (data) {
      debugger;
    }
  });