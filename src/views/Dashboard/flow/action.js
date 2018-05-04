import { get } from 'store/http/httpAction';
import { DASHBOARD_SET_DATA } from './actionType';

export const setData = data => ({
  type: DASHBOARD_SET_DATA,
  data,
});

export const fetchNewLeads = () => dispatch => get('/admin/leads/recent', {}, dispatch).then((data) => {
  dispatch(setData({
    leads: (data && data.data) || [],
  }));
});

export const fetchNewAccounts = () => dispatch => get('/admin/accounts/recent', {}, dispatch).then((data) => {
  dispatch(setData({
    accounts: (data && data.data) || [],
  }));
});

export const fetchLatestObject = () => dispatch => get('/admin/objects/recent-viewed', {}, dispatch).then((data) => {
  dispatch(setData({
    objects: (data && data.data) || [],
  }));
});
