/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Modal, Button, notification, Icon } from 'antd';
import { Panel, Upload } from 'components/ui/index';
import { intlShape, injectIntl } from 'react-intl';


class logo extends React.Component {
    state = {
      visible: false,
    }
    showUploadDialog() {
      this.setState({
        visible: true,
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
    onAllDone(response, error) {
      if (_.isEmpty(error)) {
        this.setState({
          visible: false,
        });
        const logo = response && response[0].logo;
        this.props.setLogo(logo);
      }
    }
    render() {
      const { companyLogo } = this.props;
      const { formatMessage } = this.props.intl;
      const rightActions = <Button className="btn-ellipse ml-sm" size="small" icon="edit" onClick={() => this.showUploadDialog()}>{ formatMessage({ id: 'global.ui.button.update' })}</Button>;
      const uploadProps = {
        name: 'document',
        action: '/admin/files/company_logo',
        withCredentials: true,
      };
      return (
        <Panel panelTitle={formatMessage({ id: 'global.properNouns.users' })} actionsRight={rightActions}>
          <img _ngcontent-c23="" alt="" height="250" src={ companyLogo } width="250" />
          <Modal
            title="Upload Icon"
            visible={this.state.visible}
            onOk={() => this.onOk()}
            onCancel={() => this.onCancel()}
          >
            <Upload uploadConfig={uploadProps} onAllDone={(response, error) => this.onAllDone(response, error)} key={Math.random()}>
              <Button>
                <Icon type="upload" /> Click to Upload
              </Button>
            </Upload>
          </Modal>
        </Panel>
      );
    }
}
logo.propTypes = {
  intl: intlShape.isRequired,
  companyLogo: PropTypes.string,
  setLogo: PropTypes.func.isRequired,
};

export default injectIntl(logo);
