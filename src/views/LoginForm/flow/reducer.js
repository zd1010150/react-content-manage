/* eslint-disable no-case-declarations */
import Enums from 'utils/EnumsManager';
import { getStore, removeStore, setStore } from 'utils/localStorage';
import { MY_SETTING_SET_AVATOR } from '../../MySetting/flow/actionType';
import { LOGINOROUT_FAILURE, LOGIN_SUCCESS, LOGOUT_SUCCESS, DEREGISTER_LOGIN_USER } from './actionTypes';

const { LocalStorageKeys } = Enums;
const { User } = LocalStorageKeys;

const initialState = getStore(Enums.LocalStorageKey)
  ? JSON.parse(getStore(Enums.LocalStorageKey))
  : {};

const loginUser = (state = initialState, action) => {
  let user;
  switch (action.type) {
    case LOGIN_SUCCESS:
      const { data: userData } = action.payload;
      setStore(User, userData);
      return userData;
    case MY_SETTING_SET_AVATOR:
      user = Object.assign({}, state, { avatar: action.avatar });
      setStore(User, JSON.stringify(user));
      return user;
    case LOGOUT_SUCCESS:
    case LOGINOROUT_FAILURE:
    case DEREGISTER_LOGIN_USER:
      removeStore(User);
      return {};


    default:
      return state;
  }
};

export default loginUser;
