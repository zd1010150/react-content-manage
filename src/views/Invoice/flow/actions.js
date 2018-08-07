import { get } from 'store/http/httpAction';
import {
  SET_CI_FORM,
  SET_CI_FIELD,
  SET_BI_FIELD,
} from './actionTypes';

// Component level
export const setCIForm = data => ({
  type: SET_CI_FORM,
  payload: { data },
});

export const tryFetchInvoiceDetails = id => dispatch =>
  get(`/admin/invoice/${id}`, {}, dispatch).then((data) => {
    if (data && !_.isEmpty(data.data)) {
      console.dir(data.data);
      dispatch(setCIForm(data.data));
      // TODO: set bi form
      // TODO: set invoice form
      // TODO: set item description
    }
  });

// CIForm
export const setCIField = field => ({
  type: SET_CI_FIELD,
  payload: { field },
});

// BIForm
export const setBIField = field => ({
  type: SET_BI_FIELD,
  payload: { field },
});
