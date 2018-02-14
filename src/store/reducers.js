import { combineReducers } from 'redux';
import globalsReducer from './global/reducer';
import loadingReducer from './loading/loadingReducer';
import errorReducer from './error/reducer';
import pageReducer from './pageReducer';


export const makeRootReducer = (asyncReducers = {}) => (
  combineReducers({
    global: globalsReducer, // 注入全局reducer
    loading: loadingReducer,
    errors: errorReducer,
    ...asyncReducers, // hook 以后用来注入异步reducer
    ...pageReducer, // 注入页面级reducer

  })
);

export const injectReducers = (store, reducers) => {
  store.asyncReducers = { // eslint-disable-line no-param-reassign
    ...store.asyncReducers,
    ...reducers,
  };
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
