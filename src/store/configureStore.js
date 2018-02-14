import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { makeRootReducer } from './reducers';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk),
  // other store enhancers if any
)
export default function configureStore(initialState = {}) {
  const store = createStore(
    makeRootReducer(),
    initialState,
    // applyMiddleware(thunk), // routerMiddleware redux 方式的回退
    enhancer,

  );
  store.asyncReducers = {};

  // if (module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     const reducers = require('./reducers').default; // eslint-disable-line global-require
  //     store.replaceReducer(reducers(store.asyncReducers));
  //   });
  // }

  return store;
}
