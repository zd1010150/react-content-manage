/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Avatar } from 'antd';
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
  render() {
    const { formatMessage } = this.props.intl;
    const { email, name, avatar } = this.props.userInfo;
    const uploadProps = {
      name: 'document',
      action: '/admin/files/company_logo',
      accept: 'image/png',
      withCredentials: true,
    };
    return (<Panel>
      <Upload
        uploadConfig={uploadProps}
        onAllDone={(response, error) => this.onAllDone(response, error)}
        key={Math.random()}
      >
        <Avatar src={avatar} alt="" />
      </Upload>
      <h1>hello, {name}</h1>
      <p>{email}</p>
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
