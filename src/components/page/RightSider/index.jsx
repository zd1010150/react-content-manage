import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { toggleRightSider } from './flow/action';
import styles from './index.less';


const cx = classNames.bind(styles);

/* if you want to using this component and recustomize the width ,Please using add  this.props.settingRightSider({ width: 300 }); in your componentDidMount method */
class RightSider extends React.Component {
  componentWillUnmount() {
    this.props.toggleRightSider(true);
  }
  render() {
    const {
      collapsed, width,
    } = this.props;
    return (
      <div style={{ width: collapsed ? 0 : width }} className={classNames(cx('right-sider'), collapsed ? cx('right-sider-collapsed') : cx('right-sider-open'))} >
        { this.props.children }
      </div>
    );
  }
}

const mapStateToProps = ({ ui }) => {
  const { rightSider } = ui;
  const {
    collapsed, width,
  } = rightSider;
  return {
    collapsed,
    width,
  };
};
const mapDispatchToProps = {
  toggleRightSider,
};
export default connect(mapStateToProps, mapDispatchToProps)(RightSider);

