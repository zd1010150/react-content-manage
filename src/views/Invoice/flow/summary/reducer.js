import Enums from 'utils/EnumsManager';
import Summary from '../../utils/summary';
import { RESET } from '../actionTypes';
import { ACTIVATE_ROW, DEACTIVATE_ROW, SET_ROW_VALUE, SET_SUMMARY } from './actionTypes';

const {
  Subtotal,
  Tax,
  GrandTotal,
} = Enums.InvoicePage.Summary.Rows;

const initialState = [
  new Summary(Subtotal),
  new Summary(Tax),
  new Summary(GrandTotal),
];

const summary = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUMMARY:
      const subTotal = action.payload.data.find(r => r.description === Subtotal);
      if (subTotal) {
        state[0].setData(subTotal);
      }
      const tax = action.payload.data.find(r => r.description === Tax);
      if (tax) {
        state[1].setData(tax);
      }
      return [...state];

    case ACTIVATE_ROW:
      const activatedRow = state.find(r => r.description === action.payload.key);
      activatedRow.setProperty('isEditing', true);
      return [...state];

    case DEACTIVATE_ROW:
      const deactivatedRow = state.find(r => r.description === action.payload.key);
      deactivatedRow.setProperty('isEditing', false);
      return [...state];

    case SET_ROW_VALUE:
      const targetRow = state.find(r => r.description === action.payload.rowKey);
      targetRow.setProperty(action.payload.key, action.payload.value);
      return [...state];

    case RESET:
      return [
        new Summary(Subtotal),
        new Summary(Tax),
        new Summary(GrandTotal),
      ];

    default:
      return state;
  }
};

export default summary;
