import { createSelector } from 'reselect';
import _ from 'lodash';

const getAllTeams = state => state.global.settings.teams;
const getAllPermissions = state => state.setup.permissionPro.permissions;
const getUI = state => state.setup.permissionPro.ui;

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
const getParentsOfNode = (permissions, nodeId) => {
  let parents = [],
    isFind = false;
  const getParentId = (root) => {
    if (root.id === nodeId) {
      parents = root.parent;
      isFind = true;
    }
    if (!_.isEmpty(root.child_rec)) {
      Object.keys(root.child_rec).forEach((t) => {
        if (!isFind) {
          getParentId(root.child_rec[t]);
        }
      });
    }
    isFind = false;
  };
  Object.keys(permissions).forEach((t) => {
    if (!isFind) {
      getParentId(permissions[t]);
    }
  });
  return parents;
};

export const getAllExpandedKeys = createSelector(
  [
    getUI,
    getAllPermissions,
  ],
  (ui, allPermissions) => {
    const { treeExpandKeys } = ui;
    let allExpandKeys = [...treeExpandKeys];
    treeExpandKeys.forEach((key) => {
      allExpandKeys = [...allExpandKeys, ...getParentsOfNode(allPermissions, key)];
    });
    return allExpandKeys;
  },
);
