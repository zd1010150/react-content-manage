import { combineReducers } from 'redux';
import { REMOVE_ATTACHMENT, SET_ATTACHMENT } from './actionTypes';
import ciForm from './ciReducer';
import biForm from './biReducer';
// NOTES: new reducers
import invoiceInfo from './invoiceInfo/reducer';
import itemsList from './itemsList/reducer';
import summary from './summary/reducer';
import secondaryInfo from './secondaryInfo/reducer';

const initialState = {
  fileList: [],
};

const attachment = (state = initialState, action) => {
  switch (action.type) {
    case SET_ATTACHMENT:
      const { newFile } = action.payload;
      return {
        ...state,
        fileList: [newFile],
      };

    case REMOVE_ATTACHMENT:
      const { existFile } = action.payload;
      return {
        ...state,
        fileList: [],
      };

    default:
      return state;
  }
};

export default combineReducers({
  ciForm,
  biForm,
  invoiceInfo,
  attachment,
  itemsList,
  summary,
  secondaryInfo,
});
