import moment from 'moment';
import { RESET } from '../actionTypes';
import { SET_FIELD, SET_INVOICE_NUMBER } from './actionTypes';

const initialState = {
  invoiceNum: {
    value: '',
  },
  invoiceDate: {
    value: moment(),
  },
  invoiceDueDate: {
    value: moment(),
  },
};

const invoiceInfo = (state = initialState, action) => {
  switch (action.type) {
    case SET_INVOICE_NUMBER:
      return {
        ...state,
        invoiceNum: {
          ...state.invoiceNum,
          value: action.payload.invoiceNum,
        },
      };

    case SET_FIELD:
      return {
        ...state,
        ...action.payload.field,
      };

    case RESET:
      return initialState;

    default:
      return state;
  }
};

export default invoiceInfo;
