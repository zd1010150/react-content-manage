export const ADD_ERROR = 'ADD_ERROR';
export const MARK_READED_ERROR = 'MARK_READED_ERROR';

export const addError = error => ({
  type: ADD_ERROR,
  error,
});
export const markReadedError = id => ({
  type: MARK_READED_ERROR,
  id,
});
