import { get } from 'store/http/httpAction';
import { setCIForm } from '../flow/ciForm/actions';
import { setBIForm } from '../flow/biForm/actions';

export const tryFetchInvoiceDetails = id => dispatch =>
  get(`/admin/invoice/${id}`, {}, dispatch).then((data) => {
    if (data && !_.isEmpty(data.data)) {
      console.dir(data.data);
      // TODO: set ci form
      // TODO: set bi form
      // TODO: set invoice form
      // TODO: set item description
    }
  });

export const tryFetchInvoiceDefaults = (objectId, objectType) => dispatch =>
  get(`/admin/invoice/for-object/${objectType}/${objectId}/create`, {}, dispatch).then((data) => {
    if (data && !_.isEmpty(data.default)) {
      dispatch(setCIForm(data.default));
      dispatch(setBIForm(data.default));
      // TODO: set invoice form
      // TODO: set item description
    }
  });

