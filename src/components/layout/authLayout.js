import React from 'react';
import { Layout } from 'antd';
import {
  AuthMainContent,
  CopyRight,
} from '../page/index';

const { Content } = Layout;


const layout = () => (
  <Layout>
    <Content>
      <AuthMainContent />
      <CopyRight />
    </Content>
  </Layout>
);

export default layout;
