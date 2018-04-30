/* eslint-disable no-case-declarations */
import {
  CHANGE_FROM_SELECTION,
  REMOVE_FROM_SELECTION,
  SET_ACTIVE_TEAM,
  SET_SHARE_TO,
  UPDATE_SELECTION,
} from './actionTypes';

const teamKey = 'sharedTeams';
const userKey = 'sharedUsers';

const getUpdatedData = (id, record, isTeam, isRemove, state) => {
  const key = isTeam ? teamKey : userKey;
  const isEntityExist = state[key].find(entity => entity.id == id);
  if (isRemove && isEntityExist) {
    return state[key].filter(entity => entity.id !== id);
  } else if (!isRemove && !isEntityExist) {
    return [...state[key], record];
  }
  return state[key];
};

const initialState = {
  [teamKey]: [],
  [userKey]: [],
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
      const targetTeam = teams.find(team => team.id == activeTeamId);
      const usersInTeam = action.payload.allUsers.filter(user => user.team_id == activeTeamId);
      return {
        ...state,
        title: targetTeam ? targetTeam.name : '',
        usersInTeam,
      };


    case UPDATE_SELECTION:
      const {
        id,
        record,
        isTeam,
        isRemove,
      } = action.payload;
      const subStoreKey = isTeam ? teamKey : userKey;
      return {
        ...state,
        [subStoreKey]: getUpdatedData(id, record, isTeam, isRemove, state),
      };


    default:
      return state;
  }
};

export default objectShare;
