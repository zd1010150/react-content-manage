import { createSelector } from 'reselect';
import _ from 'lodash';
import { DEFAULT_DEPAREMTN } from 'config/app.config';
import { getTreeItemByKey } from 'utils/treeUtil';

const getSelectedTeamId = state => state.orgChart.selectedDepartment.id;
const getAllUsers = state => state.orgChart.allUsers;
const getAllTeams = state => state.global.settings.teams;

export const getSelectedTeamName = createSelector(
  [
    getAllTeams,
    getSelectedTeamId,
  ],
  (teams, teamid) => {
    if (_.isEmpty(teams) || _.isEmpty(`${teamid}`) || (Number(teamid) === Number(DEFAULT_DEPAREMTN.id))) {
      return DEFAULT_DEPAREMTN.name;
    }
    const team = getTreeItemByKey(teams, teamid);
    return _.isEmpty(team) ? DEFAULT_DEPAREMTN.name : team.name;
  },
);

export const getTeamUsers = createSelector(
  [
    getSelectedTeamId,
    getAllUsers,
  ],
  (teamId, allUsers) => {
    if (_.isEmpty(allUsers)) {
      return [];
    }
    const teamUser = allUsers.filter(user => Number(user.team_id) === Number(teamId));
    if (_.isEmpty(teamUser)) {
      return [];
    }
    return teamUser;
  },
);

