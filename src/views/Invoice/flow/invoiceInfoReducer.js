import { SET_INVOICE_FIELD } from './actionTypes';

const initialState = {
  invoiceNo: {
    value: '',
  },
  invoiceDate: {
    value: '',
  },
  invoiceDueDate: {
    value: '',
  },
};

const invoiceInfo = (state = initialState, action) => {
  switch (action.type) {
    case SET_INVOICE_FIELD:
      const { field } = action.payload;
      return {
        ...state,
        ...field,
      };

    default:
      return state;
  }
};

export default invoiceInfo;
