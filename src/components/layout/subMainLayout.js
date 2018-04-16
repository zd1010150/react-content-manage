import React from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  MainContent,
} from '../page/index';
import styles from './layout.less';

const cx = classNames.bind(styles);

const SubMainLayout = ({ rightSiderCollapsed, rightSiderWidth }) => (

  <div
    className={cx('content-wrapper')}
    style={{ padding: '10px 15px',
          margin: 0,
          overflow: 'auto',
          transition: 'margin-right 0.5s',
          marginRight: rightSiderCollapsed ? 0 : rightSiderWidth,
            }}
  >
    <MainContent />
  </div>

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

