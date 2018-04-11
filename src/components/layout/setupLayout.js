
import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  MainContent,
  SetupSider,
} from '../page/index';

const { Content } = Layout;
const SetupLayout = ({ rightSiderCollapsed, rightSiderWidth }) => (
  <Layout>
    <SetupSider />
    <Layout>
      <Content
        style={{
            transition: 'margin-right 0.5s', padding: 24, margin: 0, overflow: 'auto', marginRight: rightSiderCollapsed ? 0 : rightSiderWidth,
                }}
      >
        <MainContent />
      </Content>
    </Layout>


  </Layout>
);
SetupLayout.propTypes = {
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
export default connect(mapStateToProps)(SetupLayout);

