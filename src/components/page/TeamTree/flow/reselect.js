import { createSelector } from 'reselect';
import _ from 'lodash';

const getAllTeams = state => state.global.settings.teams;

export const getTeamIds = createSelector(
  [
    getAllTeams,
  ],
  (teams) => {
    if (_.isEmpty(teams)) {
      return [];
    }
    const teamIds = [];
    const getId = (root) => {
      teamIds.push(`${root.id}`);
      if (!_.isEmpty(root.child_team_rec)) {
        root.child_team_rec.forEach(t => getId(t));
      }
    };
    teams.forEach(t => getId(t));
    return teamIds;
  },
);
