
/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ScrollTop } from 'components/ui/index';
import configureStore from './store/configureStore';
import I18n from './i18n/index';
import 'antd/dist/antd.less'; // should before the customized style
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

ErrorNotification(store);

const AppView = () => (
  <Provider store={store}>
    <I18n>
      <BrowserRouter >
        <ScrollTop>
            <App />
        </ScrollTop>
      </BrowserRouter>
    </I18n>
  </Provider>
);
ReactDOM.render(<AppView />, document.getElementById('root'));

