import {
  SET_VISIBILITY_OPTION,
  RESET_VIEW,
  SET_TEAMS,
  SELECT_TEAM,
  SET_USERS,
  ADD_ENTITY_TO_SELECTION,
  REMOVE_ENTITY_FROM_SELECTION,
  CHANGE_SELECTION,
  BATCH_ADD_TO_SELECTION,
} from './actionTypes';
import Enums from 'utils/EnumsManager';

const initialState = {
  selectedOption: Enums.ViewVisibilityIds.Me,
  users: [],
  teams: [],
  flatTeams: [],
  usersInTeam: [],
  selectedTeamId: Enums.PhantomID,
  selectedUsers: [],
  selectedTeams: [],
};

const flattenTree = (tree, newTree) => {
  tree.forEach((node) => {
    if (_.isEmpty(node.child_team_rec)) {
      return newTree.push(node);
    }
    newTree.push(node);
    return flattenTree(node.child_team_rec, newTree);
  });
};

// add to selection without duplication
const addToSelection = (entity, selection) => {
  const isAddedBefore = selection.find(item => item.id === entity.id);
  if (isAddedBefore) {
    return selection;
  }
  return [...selection, entity];
};

const batchAddToSelection = (ids, collection) => {
  return collection.filter(entity => ids.indexOf(entity.id) !== -1);
};

const visibilities = (state = initialState, action) => {
  switch (action.type) {
    case SET_VISIBILITY_OPTION:
      const { selectedOption } = action.payload;
      return {
        ...state,
        selectedOption,
      };


    case SET_USERS:
      const { users } = action.payload;
      return {
        ...state,
        users,
      };


      case SET_TEAMS:
      const teams = [...action.teams];
      teams.unshift({
        id: -1,
        name: 'No department',
        parent_id: Enums.RootTeamId,
      });
      // Flatten teams tree here to avoid search performance impact when find a specific team info by id,
      // because that is a recursive process.
      // Only flat tree once when component mounted, node order is not valued.
      // TODO: give more try on TeamTree common component, current antd Tree api doesn't support customized props
      const processedTeams = [];
      flattenTree(teams, processedTeams);
      return {
        ...state,
        teams,
        flatTeams: processedTeams,
      };


    case SELECT_TEAM:
      let { teamId } = action.payload;
      teamId = Number(teamId);
      const usersInTeam = state.users.filter(user => user.team_id === teamId);
      const team = state.flatTeams.find(team => team.id === teamId);
      const title = team ? team.name : '';
      return {
        ...state,
        selectedTeamId: teamId,
        usersInTeam,
        title,
      };

    
    case BATCH_ADD_TO_SELECTION:
      let { selectedUserIds, selectedTeamIds } = action.payload;      
      const selectedUsers = batchAddToSelection(selectedUserIds, state.users);
      const selectedTeams = batchAddToSelection(selectedTeamIds, state.flatTeams);
      // console.log('batch adding');
      // console.dir(selectedUsers);
      // console.dir(selectedTeams);

      return {
        ...state,
        selectedUsers,
        selectedTeams,
      };
      

    case ADD_ENTITY_TO_SELECTION:
      let { entityId, isTeam } = action.payload;
      entityId = Number(entityId);
      if (entityId === Enums.NoTeamId) return state;

      const entities = isTeam ? state.flatTeams : state.users;
      const entity = entities.find(entity => entity.id === entityId);
      if (!entity) return state;

      const targetKey = isTeam ? 'selectedTeams' : 'selectedUsers';
      const selectionAfterAdd = addToSelection(entity, state[targetKey]);
      return {
        ...state,
        [targetKey]: selectionAfterAdd,
      };


    case REMOVE_ENTITY_FROM_SELECTION:
      const removedId = Number(action.payload.entityId);
      const isRemoveTeam = action.payload.isTeam;
      if (removedId === Enums.NoTeamId) return state;

      const removeSource = isRemoveTeam ? 'selectedTeams' : 'selectedUsers';
      return {
        ...state,
        [removeSource]: state[removeSource].filter(entity => entity.id !== removedId),
      };

    case CHANGE_SELECTION:
      const { entityIds } = action.payload;
      const changedSelection = state.users.filter(user => entityIds.indexOf(user.id) !== -1);
      return {
        ...state,
        selectedUsers: changedSelection,
      };

    
    case RESET_VIEW:
      return initialState;


    default:
      return state;
  }
};

export default visibilities;
