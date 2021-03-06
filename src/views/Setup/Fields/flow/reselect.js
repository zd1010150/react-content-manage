import { createSelector } from 'reselect';
import _ from 'lodash';
import { types } from './objectTypeHelper';

const getCurrentObjectFields = setup => setup.fields.tableView.currentObject;
const getRelativeFields = setup => setup.fields.tableView.relativeFields;
// const getSelectedField = setup => setup.fields.tableView.selectedField;

export const getToFieldsStatus = createSelector(
  [
    getCurrentObjectFields,
    getRelativeFields,
  ],
  (currentFields, relativeFields) => {
    const { to } = relativeFields;
    const result = {};
    const { objType, fields } = currentFields;
    const { mappings } = fields;
    Object.keys(to).forEach((toObjType) => {
      let mappingData = mappings.filter(m => m.from_object_type === objType && m.to_object_type === toObjType); // 过滤出当前的objecttype对应的映射关系
      if (_.isEmpty(mappingData)) mappingData = [{ mapping_data: {} }];
      const allOccupiedFields = Object.keys(mappingData[0].mapping_data); // 当前objecttype映射的objecttypes
      result[toObjType] = to[toObjType].map((f) => {
        const isOccupied = allOccupiedFields.indexOf(`${f.id}`) > -1;
        return Object.assign({}, f, { isOccupied });
      });
    });
    return result;
  },
);

const getGlobalTypes = state => state.global.settings.fields.crm_data_type;

export const getMappedTypes = createSelector([getGlobalTypes], (globalTypes) => {
  const result = {};
  globalTypes.forEach((t) => {
    if (!_.isEmpty(types[t])) {
      result[t] = types[t];
    }
  });
  return result;
});

const unvisibleUserReducer = setup => setup.fields.picklist.manageList.unvisibleUsers;
const visibleUsersReducer = setup => setup.fields.picklist.manageList.visibleUsers;
const selecteTeamIdReducer = setup => setup.fields.picklist.selectedTeam.selectedTeamId;

export const getTeamUser = createSelector([
  visibleUsersReducer,
  selecteTeamIdReducer,
  unvisibleUserReducer,
], (visibleUsers, teamId, unvisibleUsers) => {
  if (_.isEmpty(`${teamId}`)) {
    return [];
  }
  const unvisibleIds = unvisibleUsers.map(v => `${v.id}`);

  const teamUser = visibleUsers.filter(user => (Number(user.team_id) === Number(teamId) && unvisibleIds.indexOf(`${user.id}`) < 0));
  if (_.isEmpty(teamUser)) {
    return [];
  }
  return teamUser;
});

const manageListReducer = setup => setup.fields.picklist.manageList;
export const getTeams = createSelector([
  manageListReducer,
], (manageList) => {
  const { unvisibleTeams, visibleTeams } = manageList;
  if (_.isEmpty(`${visibleTeams}`)) {
    return [];
  }
  const unvisibleIds = unvisibleTeams.map(v => `${v.id}`);

  const teams = visibleTeams.filter(user => (unvisibleIds.indexOf(`${user.id}`) < 0));
  if (_.isEmpty(teams)) {
    return [];
  }
  return teams;
});
