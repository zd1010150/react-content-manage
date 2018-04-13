import { ADD_ERROR, MARK_READED_ERROR } from './actionType';

export const addError = error => ({
  type: ADD_ERROR,
  error,
});
export const markReadedError = id => ({
  type: MARK_READED_ERROR,
  id,
});
