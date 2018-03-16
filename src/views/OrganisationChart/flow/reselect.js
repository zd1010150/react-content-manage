import { createSelector } from 'reselect';
import _ from 'lodash';

const getSelectedTeamId = setupOrgChart => setupOrgChart.selectedDepartment.id;
const getAllUsers = setupOrgChart => setupOrgChart.allUsers;

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

