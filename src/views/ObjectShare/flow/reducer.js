/* eslint-disable no-case-declarations */
import {
  CHANGE_FROM_SELECTION,
  REMOVE_FROM_SELECTION,
  SET_ACTIVE_TEAM,
  SET_SHARE_TO,
} from './actionTypes';

const initialState = {
  sharedTeams: [],
  sharedUsers: [],
  title: '',
  usersInTeam: [],
};

const objectShare = (state = initialState, action) => {
  switch (action.type) {
    case SET_SHARE_TO:
      const { sharedTeams, sharedUsers } = action.payload;
      return {
        ...state,
        sharedTeams,
        sharedUsers,
      };


    case REMOVE_FROM_SELECTION:
      const { removeId, isRemoveFromTeam } = action.payload;
      const removeSource = isRemoveFromTeam ? 'sharedTeams' : 'sharedUsers';
      const dataAfterRemove = state[removeSource].filter(item => item.id !== removeId);
      return {
        ...state,
        [removeSource]: dataAfterRemove,
      };


    case CHANGE_FROM_SELECTION:
      const { changedUserIds, allUsers } = action.payload;
      const changedUsers = allUsers.filter(user => changedUserIds.indexOf(user.id) !== -1);
      return {
        ...state,
        sharedUsers: changedUsers,
      };


    case SET_ACTIVE_TEAM:
      const { activeTeamId, teams } = action.payload;
      return {
        ...state,
        // title,
        // usersInTeam,
      };


    default:
      return state;
  }
};

export default objectShare;