import { get } from 'store/http/httpAction';
import Enums from 'utils/EnumsManager';
import { SET_DUPLICATES } from './actionTypes';

export const setDuplicates = (leads, accounts) => ({
      type: SET_DUPLICATES,
      payload: { leads, accounts },
    });

export const tryFindDuplicates = params => dispatch =>
    get(`/admin/leads/duplicates/search?${params}`, {}, dispatch).then((data) => {
      if (data
          && (!_.isEmpty(data.leads) || !_.isEmpty(data.accounts))) {
        dispatch(setDuplicates(data.leads.data, data.accounts.data));
      }
    });
