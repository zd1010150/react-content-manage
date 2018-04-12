import React from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  MainContent,
} from '../page/index';

const { Content } = Layout;
const SubMainLayout = ({ rightSiderCollapsed, rightSiderWidth }) => (
  <Layout>
    <Content
      style={{
                background: '#fff', padding: 24, margin: 0, overflow: 'auto', transition: 'margin-right 0.5s', marginRight: rightSiderCollapsed ? 0 : rightSiderWidth,
            }}
      className="main-content-body"
    >
      <MainContent />
    </Content>
  </Layout>
);

SubMainLayout.propTypes = {
  rightSiderCollapsed: PropTypes.bool.isRequired,
  rightSiderWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
const mapStateToProps = ({ ui }) => {
  const { rightSider } = ui;
  return {
    rightSiderCollapsed: rightSider.collapsed,
    rightSiderWidth: rightSider.width,
  };
};
export default connect(mapStateToProps)(SubMainLayout);

