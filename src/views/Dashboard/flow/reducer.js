import { DASHBOARD_SET_DATA } from './actionType';

const dashboard = (state = { leads: [], accounts: [], objects: [], activities: [] }, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case DASHBOARD_SET_DATA:
      return Object.assign({}, state, { ...payload.data });
    default:
      return state;
  }
};
export default dashboard;

