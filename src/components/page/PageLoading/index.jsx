import React from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './index.less';


const cx = classNames.bind(styles);


/* if you want to using this component and recustomize the width ,Please using add  this.props.settingRightSider({ width: 300 }); in your componentDidMount method */
class PageLoading extends React.Component {
  render() {
    const {
      isShow, pageLoadingClass, spinConfig,
    } = this.props;
    return (
      <div className={classNames(pageLoadingClass, isShow ? cx('page-loading') : cx('page-loading-hide'))} >
        <Spin {...spinConfig} className={cx('page-loading-spin')} />
      </div>
    );
  }
}

const mapStateToProps = ({ ui }) => {
  const { pageLoading } = ui;
  const {
    isShow, pageLoadingClass, spinConfig,
  } = pageLoading;
  return {
    pageLoadingClass,
    isShow,
    spinConfig,
  };
};

export default connect(mapStateToProps)(PageLoading);

