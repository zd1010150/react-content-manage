import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  MainContent,
  SetupSider,
} from '../page/index';
import styles from './layout.less';

const cx = classNames.bind(styles);


const SetupLayout = ({ rightSiderCollapsed, rightSiderWidth, appRoutHash }) => (

  <div className={cx('content-wrapper')} key={appRoutHash}>
    <SetupSider />
    <div
      className={cx('setup-content-layout-wrapper')}
      style={{
               marginRight: rightSiderCollapsed ? 0 : rightSiderWidth,
                }}
    >
      <MainContent />
    </div>


  </div>
);
SetupLayout.propTypes = {
  rightSiderCollapsed: PropTypes.bool.isRequired,
  rightSiderWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
const mapStateToProps = ({ ui, global }) => {
  const { rightSider } = ui;
  return {
    rightSiderCollapsed: rightSider.collapsed,
    rightSiderWidth: rightSider.width,
    appRoutHash: global.appRoutHash,
  };
};
export default connect(mapStateToProps)(SetupLayout);

