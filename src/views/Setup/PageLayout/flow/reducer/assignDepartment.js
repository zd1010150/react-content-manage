import { combineReducers } from 'redux';
import {
  SETUP_LAYOUT_SET_ALL_LAYOUTS,
  SETUP_LAYOUT_SET_LAYOUT_TEAM,
} from '../actionType';

const initTeamLayouts = (allLayouts) => {
  const result = {};
  allLayouts.forEach((layout) => {
    const layoutId = layout.id;
    const teams = layout.assigned_to_teams && layout.assigned_to_teams.data;
    teams.forEach((t) => {
      result[`${t.id}`] = `${layoutId}`;
    });
  });
  return result;
};

const teamLayouts = (state = {}, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_LAYOUT_SET_ALL_LAYOUTS:
      return initTeamLayouts(payload.layouts || []);
    case SETUP_LAYOUT_SET_LAYOUT_TEAM:
      return Object.assign({}, state, { [payload.teamId]: payload.layoutId });
    default:
      return state;
  }
};

export default combineReducers({
  teamLayouts,
});
