import { get, post, patch } from 'store/http/httpAction';
import { setBIForm } from '../flow/biForm/actions';
import { setCIForm } from '../flow/ciForm/actions';
import { setInvoiceInfo } from '../flow/invoiceInfo/actions';
import { setItemsList } from '../flow/itemsList/actions';
import { setRelatedTo, setInfo } from '../flow/secondaryInfo/actions';
import { setSummary } from '../flow/summary/actions';
import { setAttachments } from '../flow/upload/actions';
import { RESET } from './actionTypes';

export const tryFetchInvoiceDetails = id => dispatch =>
  get(`/admin/invoice/${id}`, {}, dispatch).then((data) => {
    if (data && !_.isEmpty(data.data)) {
      dispatch(setCIForm(data.data));
      dispatch(setBIForm(data.data));
      dispatch(setInvoiceInfo(data.data));
      if (!_.isEmpty(data.data.items) && _.isArray(data.data.items.items)) {
        dispatch(setItemsList(data.data.items.items));
      }
      if (_.isArray(data.data.extra_prices)) {
        dispatch(setSummary(data.data.extra_prices));
      }
      if (_.isArray(data.data.attachments)) {
        dispatch(setAttachments(data.data.attachments));
      }
      dispatch(setInfo(data.data));
    }
  });

export const tryFetchInvoiceDefaults = (objectId, objectType) => dispatch =>
  get(`/admin/invoice/for-object/${objectType}/${objectId}/create`, {}, dispatch).then((data) => {
    if (data && !_.isEmpty(data.default)) {
      dispatch(setCIForm(data.default));
      dispatch(setBIForm(data.default));
      dispatch(setInvoiceInfo(data.default));
      // TODO: replace this part w/ shared func in order to share it within other part.
      dispatch(setRelatedTo(`${data.default.invoice_able_type}__${data.default.invoice_able_id}`));
    }
  });

export const trySaveNewInvoice = (payload, callback) => dispatch =>
  post('/admin/invoice', payload, dispatch).then((data) => {
    if (data && !_.isEmpty(data.data)) {
      if (_.isFunction(callback)) {
        callback();
      }
    }
  });

export const tryUpdateInvoice = (id, payload, callback) => dispatch =>
  patch(`/admin/invoice/${id}`, payload, dispatch).then((data) => {
    if (data && !_.isEmpty(data.data)) {
      if (_.isFunction(callback)) {
        callback();
      }
    }
  });

export const reset = () => ({
  type: RESET,
});
