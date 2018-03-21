import { combineReducers } from 'redux';
import { SETUP_LF_SET_SELECTE_FIELDS } from './actionType';


const selectedField = (state = { fieldName: '', targetType: '', fieldsValue: [] }, action) => {
  const { type, ...payload } = this.props;
  switch (type) {
    case SETUP_LF_SET_SELECTE_FIELDS:
      return Object.assign({}, state, { collapsed: payload.collapsed });
    default:
      return state;
  }
};
export default combineReducers({
  selectedFields,
});
