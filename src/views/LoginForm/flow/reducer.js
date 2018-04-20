import {
  LOGIN_SUCCESS, LOGINOROUT_FAILURE, LOGOUT_SUCCESS,
} from './actionTypes';
import { MY_SETTING_SET_AVATOR } from '../../MySetting/flow/actionType';
import EnumsManager from '../../../utils/EnumsManager';
import { setStore, getStore, removeStore } from '../../../utils/localStorage';

const initialState = getStore(EnumsManager.LocalStorageKey)
  ? JSON.parse(getStore(EnumsManager.LocalStorageKey))
  : {};

const loginUser = (state = initialState, action) => {
  const { type, ...payload } = action;
  let user;
  switch (type) {
    case LOGIN_SUCCESS:
      setStore(EnumsManager.LocalStorageKey, payload);
      return payload;
    case MY_SETTING_SET_AVATOR:
      user = Object.assign({}, state, { avatar: action.avatar });
      setStore(EnumsManager.LocalStorageKey, user);
      return user;
    case LOGOUT_SUCCESS:
    case LOGINOROUT_FAILURE:
      removeStore(EnumsManager.LocalStorageKey);
      return {};

    default:
      return state;
  }
};

export default loginUser;
