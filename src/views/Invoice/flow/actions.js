import { get } from 'store/http/httpAction';
import {
  // Set after load
  SET_CI_FORM,
  SET_ITEM_DETAILS,

  SET_ATTACHMENT,
  REMOVE_ATTACHMENT,
  SET_CI_FIELD,
  SET_BI_FIELD,
} from './actionTypes';

// Component level
export const setCIForm = data => ({
  type: SET_CI_FORM,
  payload: { data },
});

export const setItemDetails = data => ({
  type: SET_ITEM_DETAILS,
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
      dispatch(setItemDetails(data.data));
    }
  });

export const setAttachment = newFile => ({
  type: SET_ATTACHMENT,
  payload: { newFile },
});


export const removeAttachment = existFile => ({
  type: REMOVE_ATTACHMENT,
  payload: { existFile },
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
