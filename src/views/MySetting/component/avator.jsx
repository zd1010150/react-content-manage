/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { notification } from 'antd';
import { MAX_UPLOAD_FILE_SIZE } from 'config/app.config';
import classNames from 'classnames/bind';
import { intlShape, injectIntl } from 'react-intl';
import { Panel, Upload } from 'components/ui/index';
import styles from '../index.less';


const cx = classNames.bind(styles);


class Avator extends React.Component {
  onAllDone(response, error) {
    if (_.isEmpty(error)) {
      const logo = response && response[0].logo;
      this.props.setUserAvator(logo);
    }
  }
  onError(errorType) {
    const { formatMessage } = this.props.intl;
    notification.error({
      message: errorType === 'type' ? formatMessage({ id: 'global.ui.upload.errorType' }, { type: 'image/png,image/jpeg' }) : formatMessage({ id: 'global.ui.upload.errorMax' }, { size: _.round(MAX_UPLOAD_FILE_SIZE.USER_LOGO / 1024 / 1024) }),
    });
  }
  render() {
    const { formatMessage } = this.props.intl;
    const { email, name, avatar } = this.props.userInfo;
    const uploadProps = {
      name: 'document',
      action: '/admin/files/user_avatar',
      accept: 'image/png,image/jpeg',
      withCredentials: true,
      showUploadList: false,
    };
    return (<Panel>
      <Upload
        uploadConfig={uploadProps}
        onAllDone={(response, error) => this.onAllDone(response, error)}
        key={Math.random()}
        isShowMaxSizeTip={false}
        isShowError={false}
        maxSize={MAX_UPLOAD_FILE_SIZE.USER_LOGO}
        onError={(errorType) => { this.onError(errorType); }}
      >
        <div className={classNames(cx('avatar-img-wrapper'), 'mt-lg', 'mb-lg')}>
          <img className={cx('avatar-img')} src={avatar || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} alt="" />
        </div>
      </Upload>
      <h1 className="text-center"> { formatMessage({ id: 'page.mySetting.hello' }, { name })} </h1>
      <p className="text-center">{email}</p>
            </Panel>);
  }
}
Avator.defaultProps = {

};
Avator.propTypes = {
  intl: intlShape.isRequired,
  userInfo: PropTypes.object.isRequired,
  setUserAvator: PropTypes.func.isRequired,
};


export default injectIntl(Avator);
