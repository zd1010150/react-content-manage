import {
  SET_VISIBILITY_OPTION,
  RESET_VIEW,
  SET_TEAMS,
  SELECT_TEAM,
  SET_USERS,
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
  tree.forEach(node => {
    if (_.isEmpty(node.child_team_rec)) {
      return newTree.push(node);
    } else {
      newTree.push(node);
      return flattenTree(node.child_team_rec, newTree);
    }
  });
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
      const { teams } = action;
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

    case RESET_VIEW:
      return initialState;

    default:
      return state;
  }
};

export default visibilities;