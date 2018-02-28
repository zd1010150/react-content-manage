import {
  LOGIN_SUCCESS, LOGINOROUT_FAILURE, LOGOUT_SUCCESS,
} from './actionTypes';
import EnumsManager from '../../../utils/EnumsManager';
import { setStore, getStore, removeStore } from '../../../utils/localStorage';

const initialState = getStore(EnumsManager.LocalStorageKey)
                      ? JSON.parse(getStore(EnumsManager.LocalStorageKey))
                      : {};

const loginUser = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      const { data } = action.payload.json;
      setStore(EnumsManager.LocalStorageKey, data);
      return data;
    
    case LOGOUT_SUCCESS:
    case LOGINOROUT_FAILURE:
      removeStore(EnumsManager.LocalStorageKey);
      return {};

    default:
      return state;
  }
};

export default loginUser;