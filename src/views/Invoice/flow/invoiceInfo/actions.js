import { get } from 'store/http/httpAction';
import {
  SET_FIELD,
  SET_INVOICE_NUMBER,
  SET_INVOICE_INFO,
} from './actionTypes';

export const setField = field => ({
  type: SET_FIELD,
  payload: { field },
});

export const setInvoiceNumber = invoiceNum => ({
  type: SET_INVOICE_NUMBER,
  payload: { invoiceNum },
});

export const tryFetchAutoNumber = () => dispatch =>
  get('/admin/invoice/auto-invoice_no', {}, dispatch).then((data) => {
    if (data && !_.isEmpty(data.data)) {
      dispatch(setInvoiceNumber(data.data));
    }
  });

export const setInvoiceInfo = data => ({
  type: SET_INVOICE_INFO,
  payload: { data },
});
