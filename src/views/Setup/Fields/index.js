
import React from 'react';
import { Spin } from 'antd';
import Loadable from 'react-loadable';

const LoadableComponent = Loadable({
  loader: () => import('./container/index'),
  loading() {
    return <Spin />;
  },
});

export default class LoadableCompanyInfo extends React.Component {
  render() {
    return <LoadableComponent />;
  }
}

