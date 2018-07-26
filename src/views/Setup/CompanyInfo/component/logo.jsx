/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Permission } from 'components/page/index';
import PERMISSIONS from 'config/app-permission.config';
import { baseUrl } from 'config/env.config';
import { Modal, Button, notification, Icon, Upload } from 'antd';
import { Panel } from 'components/ui/index';
import { intlShape, injectIntl } from 'react-intl';
import { MAX_UPLOAD_FILE_SIZE, UNAUTHENTICATION } from 'config/app.config';

const maxSize = MAX_UPLOAD_FILE_SIZE.COMPANY_LOGO;
class logo extends React.Component {
    state = {
      visible: false,
      isMaxSizeError: false,
      isShowMaxSizeTip: true,
      fileList: [],
    }
    showUploadDialog() {
      this.setState({
        visible: true,
        fileListe: [],
        isShowMaxSizeTip: true,
        isMaxSizeError: false,
      });
    }
    onOk() {
      this.setState({
        visible: false,
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
          isShowMaxSizeTip: false,
        });
        return false;
      }
      return true;
    }
    onChange = ({ file, fileList }) => {
      const { tryLogout } = this.props;
      this.setState({ fileList: fileList[0] && fileList[0].size < maxSize ? fileList : [] });
      if (file.status === 'done') {
        this.setState({
          visible: false,
          fileList: [],
        });
        const img = fileList[0].response.logo;
        this.props.setLogo(img);
      }
      if (file.status === 'error') {
        if (fileList[0].error.status === UNAUTHENTICATION.CODE) {
          tryLogout();
        } else {
          notification.error(fileList[0].response[0].error);
        }
      }
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
        action: `${baseUrl}/admin/files/company_logo`,
        accept: 'image/png',
        withCredentials: true,
        beforeUpload: this.beforeUpload,
        onChange: this.onChange,
        fileList: this.state.fileList,
      };
      return (
        <Panel panelTitle={formatMessage({ id: 'page.comInfo.logo' })} actionsRight={rightActions} contentClasses="pt-lg pr-lg pb-lg pl-lg">
          <p className="error-msg">* {formatMessage({ id: 'page.comInfo.logoTip' })}</p>
          <img
            alt=""
            src={companyLogo}
            style={{
              maxWidth: '400px', maxHeight: '250px', backgroundColor: '#000', padding: '10px',
            }}
          />
          <Modal
            title={formatMessage({ id: 'page.comInfo.uploadCompanyLogo' })}
            visible={this.state.visible}
            onOk={() => this.onOk()}
            onCancel={() => this.onCancel()}
          >
            <Upload {...uploadProps}>
              <Button>
                <Icon type="upload" /> {formatMessage({ id: 'page.comInfo.clickToUpload' })}
              </Button>
            </Upload>
            { this.state.isMaxSizeError ? <p className="error-msg"> {formatMessage({ id: 'global.ui.upload.errorMax' }, { size })} </p> : '' }
            { this.state.isShowMaxSizeTip ? <p className="error-msg"> {formatMessage({ id: 'global.ui.upload.maxSize' }, { size })} </p> : '' }
          </Modal>
        </Panel>
      );
    }
}

logo.propTypes = {
  intl: intlShape.isRequired,
  companyLogo: PropTypes.string.isRequired,
  setLogo: PropTypes.func.isRequired,
  tryLogout: PropTypes.func.isRequired,
};

export default injectIntl(logo);
