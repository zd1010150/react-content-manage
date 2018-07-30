/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import fetch from 'isomorphic-fetch';
import { Permission } from 'components/page/index';
import PERMISSIONS from 'config/app-permission.config';
import { baseUrl } from 'config/env.config';
import { Modal, Button, notification, Icon, Upload } from 'antd';
import { Panel } from 'components/ui/index';
import { intlShape, injectIntl } from 'react-intl';
import { MAX_UPLOAD_FILE_SIZE } from 'config/app.config';

const maxSize = MAX_UPLOAD_FILE_SIZE.COMPANY_LOGO;
const imgStyle = {
  maxWidth: '400px',
  maxHeight: '250px',
  backgroundColor: '#000',
  padding: '10px',
};
class logo extends React.Component {
    state = {
      visible: false,
      isMaxSizeError: false,
      fileList: [],
      disabled: false,
    }
    showUploadDialog() {
      this.setState({
        visible: true,
        isMaxSizeError: false,
        disabled: true,
        fileList: [],
      });
    }
    onResponse = (data) => {
      const { setLogo, settingPageloading } = this.props;
      if (data.hasOwnProperty('logo')) {
        setLogo(data.logo);
        this.setState({
          visible: false,
        });
      }
      if (data.hasOwnProperty('error')) {
        notification.error(data.error);
      }
      settingPageloading({ isShow: false });
    }
    onOk() {
      const { fileList } = this.state;
      const { settingPageloading } = this.props;
      const formData = new FormData();
      settingPageloading({ isShow: true });
      formData.append('document', fileList[0]);
      fetch(`${baseUrl}/admin/files/company_logo`, {
        credentials: 'include',
        method: 'POST',
        body: formData,
      }).then((response) => {
        response.json().then((data) => {
          this.onResponse(data);
        });
      });
    }
    onCancel() {
      this.setState({
        visible: false,
      });
    }
    beforeUpload = (file, fileList) => {
      if (fileList[0] && fileList[0].size > maxSize) {
        this.setState({
          isMaxSizeError: true,
          fileList,
          disabled: true,
        });
        return false;
      }
      this.setState({
        disabled: false,
        fileList: fileList.slice(-1),
        isMaxSizeError: false,
      });
      return false;
    }
    render() {
      const { companyLogo } = this.props;
      const { formatMessage } = this.props.intl;
      const size = _.round(maxSize / 1024 / 1024, 2);
      const rightActions = (
        <Permission permission={PERMISSIONS.SETUP_COMPANYPROFILE_COMPANYINFORMATION_UPDATELOGO}>
          <Button className="btn-ellipse ml-sm" size="small" icon="edit" onClick={() => this.showUploadDialog()}>{ formatMessage({ id: 'global.ui.button.update' })}</Button>
        </Permission>);
      const uploadProps = {
        name: 'document',
        accept: 'image/png',
        withCredentials: true,
        beforeUpload: this.beforeUpload,
        fileList: this.state.fileList,
      };
      return (
        <Panel panelTitle={formatMessage({ id: 'page.comInfo.logo' })} actionsRight={rightActions} contentClasses="pt-lg pr-lg pb-lg pl-lg">
          <p className="error-msg">* {formatMessage({ id: 'page.comInfo.logoTip' })}</p>
          <img
            alt=""
            src={companyLogo}
            style={imgStyle}
          />
          <Modal
            title={formatMessage({ id: 'page.comInfo.uploadCompanyLogo' })}
            visible={this.state.visible}
            footer={[
              <Button key="cancel" onClick={() => this.onCancel()}>{formatMessage({ id: 'global.ui.button.cancel' })}</Button>,
              <Button key="ok" onClick={() => this.onOk()} disabled={this.state.disabled}>{formatMessage({ id: 'global.ui.button.ok' })}</Button>,
            ]}
          >
            <Upload {...uploadProps}>
              <Button>
                <Icon type="upload" /> {formatMessage({ id: 'page.comInfo.clickToUpload' })}
              </Button>
            </Upload>
            {
              this.state.isMaxSizeError ?
                <p className="error-msg"> {formatMessage({ id: 'global.ui.upload.errorMax' }, { size })} </p>
                : <p className="error-msg"> {formatMessage({ id: 'global.ui.upload.maxSize' }, { size })} </p>
            }
          </Modal>
        </Panel>
      );
    }
}

logo.propTypes = {
  intl: intlShape.isRequired,
  companyLogo: PropTypes.string,
  setLogo: PropTypes.func.isRequired,
  settingPageloading: PropTypes.func,
};

export default injectIntl(logo);
