
import React from 'react';
import { Layout } from 'antd';
import {
  MainContent,
  CopyRight,
  SetupSider,
} from '../page/index';

const { Content, Footer } = Layout;
const SetupLayout = () => (
  <Layout>
    <SetupSider />
    <Layout>
      <Content style={{
                background: '#fff', padding: 24, margin: 0, minHeight: 280,
            }}
      >
        <MainContent />
      </Content>
      <Footer><CopyRight /></Footer>
    </Layout>
  </Layout>
);

export default SetupLayout;

