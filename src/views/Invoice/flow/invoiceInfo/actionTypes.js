import Enums from 'utils/EnumsManager';

const { INVOICE } = Enums.ReduxActionTypePrefix;
const INVOICEINFO = 'INVOICEINFO';

export const SET_INVOICE_NUMBER = `${INVOICE}_${INVOICEINFO}_SET_INVOICE_NUMBER`;
export const SET_FIELD = `${INVOICE}_${INVOICEINFO}_SET_FIELD`;
