
/* eslint-disable no-underscore-dangle */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { syncStateAndLocalStorage } from 'utils/localStorage';
import configureStore from './store/configureStore';
import I18n from './i18n/index';
import { fetchGlobalSetting, fetchAccountInfo } from './store/global/action';
import './assets/less/index.less';
import { ErrorNotification } from './components/page/index';
import App from './App';

const store = configureStore();

// 在非生成环境，都打印redux中的state,以便于跟踪调试，在非生产环境中都写入固定cookie用于调试

if (process.env.NODE_ENV !== 'production') {
  store.subscribe(() => {
    console.log('redux store ===', store.getState());
  });
}
window.__store__ = store;
// store.dispatch(fetchGlobalSetting()); // 获取全局配置,页面中大多数数据请求都基于本配置
// store.dispatch(fetchAccountInfo()); // 获取用户基本信息

ErrorNotification(store);

window.addEventListener('beforeunload', () => {
  // syncStateAndLocalStorage(store.getState().global);
  // removeMangentoLanguageCookie();
});

const AppView = () => (
  <Provider store={store}>
    <I18n>
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </I18n>
  </Provider>
);
ReactDOM.render(<AppView />, document.getElementById('root'));

