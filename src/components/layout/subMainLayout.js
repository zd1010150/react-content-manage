import React from 'react';
import { Layout } from 'antd';
import { RightSider } from 'components/page/index';

import {
  MainContent,
} from '../page/index';

const { Content } = Layout;
const SubMainLayout = () => (
  <Layout>
    <Content
      style={{
                background: '#fff', padding: 24, margin: 0, minHeight: 280,
            }}
      className="main-content-body"
    >
      <MainContent />
    </Content>
    {/*<RightSider />*/}
  </Layout>
);

export default SubMainLayout;
