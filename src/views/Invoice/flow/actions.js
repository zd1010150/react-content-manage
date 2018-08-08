import { get } from 'store/http/httpAction';
import { setCIForm } from '../flow/ciForm/actions';
import { setBIForm } from '../flow/biForm/actions';
import { setInvoiceInfo } from '../flow/invoiceInfo/actions';
import { setRelatedTo } from '../flow/secondaryInfo/actions';

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
      dispatch(setInvoiceInfo(data.default));
      // TODO: replace this part w/ shared func in order to share it within other part.
      dispatch(setRelatedTo(`${data.default.invoice_able_type}__${data.default.invoice_able_id}`));
    }
  });
