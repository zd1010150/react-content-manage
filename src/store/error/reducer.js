import { combineReducers } from 'redux';
import { ADD_ERROR, MARK_READED_ERROR } from './actionType';

const addError = (state, error) => {
  const id = state.length + 1;
  const newState = state.slice();
  newState.push({
    id,
    msg: error,
    readed: false,
  });
  return newState;
};
const markReadedError = (state, errorId) => state.map((item) => {
  if (item.id === errorId) {
    return Object.assign({}, item, { readed: true });
  }
  return item;
});
const errors = (state = [], action) => {
  switch (action.type) {
    case ADD_ERROR:
      return addError(state, action.error);
    case MARK_READED_ERROR:
      return markReadedError(state, action.id);
    default:
      return state;
  }
};

export default combineReducers({ errors });
