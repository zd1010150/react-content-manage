import { createSelector } from 'reselect';
import _ from 'lodash';




const getCurrentObjectFields = setup => setup.fields.tableView.currentObject;
const getRelativeFields = setup => setup.fields.tableView.relativeFields;

export const getToFieldsStatus = createSelector(
    [
        getCurrentObjectFields,
        getRelativeFields,
    ],
    (currentFields, relativeFields) => {
        const toFields = relativeFields.to;

        if (!_.isEmpty(toFields)) {

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

