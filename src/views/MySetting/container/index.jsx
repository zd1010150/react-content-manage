/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import Avator from '../component/avator';
import ChangePwd from '../component/changePwd';
import classNames from 'classnames/bind';
import { setAvator, updatePwd } from '../flow/action';


import styles from '../index.less';


const cx = classNames.bind(styles);

class GlobalSearch extends React.Component {
  render() {
    const { updatePwd, setAvator, userInfo } = this.props;
    return (<div className={cx('my-setting-wrapper')}>
      <div className={classNames(cx('avatar-wrapper'), 'pr-lg')}>
        <Avator userInfo={userInfo} setUserAvator={setAvator} />
      </div>
      <div className={cx('changepwd-wrapper')}>
        <ChangePwd submit={updatePwd} />
      </div>
            </div>);
  }
}
const mapStateToProps = ({ loginUser }) => ({
  userInfo: loginUser,
});
const mapDispatchToProps = {
  updatePwd,
  setAvator,
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalSearch);
