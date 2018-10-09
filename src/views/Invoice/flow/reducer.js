import { combineReducers } from 'redux';

import ciForm from './ciForm/reducer';
import biForm from './biForm/reducer';
import invoiceInfo from './invoiceInfo/reducer';
import itemsList from './itemsList/reducer';
import summary from './summary/reducer';
import secondaryInfo from './secondaryInfo/reducer';
import attachments from './upload/reducer';

export default combineReducers({
  ciForm,
  biForm,
  invoiceInfo,
  itemsList,
  summary,
  secondaryInfo,
  attachments,
});
