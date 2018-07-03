import { get } from 'store/http/httpAction';
import {
  SET_ATTACHMENT,
  REMOVE_ATTACHMENT,
  SET_CI_FIELD,
  SET_BI_FIELD,
  SET_INVOICE_FIELD,
  SET_ITEM_INFO_FIELD,
  SET_ACTIVE_RECORD,
  UPDATE_ACTIVE_RECORD,
  ADD_NEW_ROW,
} from './actionTypes';

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

// Invoice Info Form
export const setInvoiceField = field => ({
  type: SET_INVOICE_FIELD,
  payload: { field },
});

export const tryFetchAutoInvoiceId = () => dispatch =>
  get('/admin/invoice/auto-invoice_no', {}, dispatch).then((data) => {
    if (data && data.data) {
      dispatch(setInvoiceField({
        invoiceNo: { value: data.data },
      }));
    }
  });


// Item Info Form
export const setItemInfoField = field => ({
  type: SET_ITEM_INFO_FIELD,
  payload: { field },
});

export const setActiveRecord = (id, colName) => ({
  type: SET_ACTIVE_RECORD,
  payload: { id, colName },
});

export const updateRecordOnBlur = (recordId, newVal, recordCol) => ({
  type: UPDATE_ACTIVE_RECORD,
  payload: { recordId, newVal, recordCol },
});

export const addNewRow = () => ({
  type: ADD_NEW_ROW,
});
