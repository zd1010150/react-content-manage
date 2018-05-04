import Enums from 'utils/EnumsManager';
import { getStore, removeStore, setStore } from '../../../utils/localStorage';
import { MY_SETTING_SET_AVATOR } from '../../MySetting/flow/actionType';
import { LOGINOROUT_FAILURE, LOGIN_SUCCESS, LOGOUT_SUCCESS } from './actionTypes';

const initialState = getStore(Enums.LocalStorageKey)
  ? JSON.parse(getStore(Enums.LocalStorageKey))
  : {};

const loginUser = (state = initialState, action) => {
  const { type, ...payload } = action;
  let user;
  switch (type) {
    case LOGIN_SUCCESS:
      setStore(Enums.LocalStorageKey, payload);
      return payload;


    case MY_SETTING_SET_AVATOR:
      user = Object.assign({}, state, { avatar: action.avatar });
      setStore(Enums.LocalStorageKey, JSON.stringify(user));
      return user;


    case LOGOUT_SUCCESS:
    case LOGINOROUT_FAILURE:
      removeStore(Enums.LocalStorageKey);
      return {};


    default:
      return state;
  }
};

export default loginUser;
