/* eslint-disable no-shadow */
import React from 'react';
import { Modal, Button, Upload, notification, Icon } from 'antd';
import { Panel } from 'components/ui/index';
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
    render() {
      const { formatMessage } = this.props.intl;
      const rightActions = <Button className="btn-ellipse ml-sm" size="small" icon="edit" onClick={() => this.showUploadDialog()}>{ formatMessage({ id: 'global.ui.button.update' })}</Button>;
      const uploadProps = {
        name: 'file',
        action: '//jsonplaceholder.typicode.com/posts/',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            notification.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            notification.error(`${info.file.name} file upload failed.`);
          }
        },
      };
      return (
        <Panel panelTitle={formatMessage({ id: 'global.properNouns.users' })} actionsRight={rightActions}>
          <img _ngcontent-c23="" alt="" height="250" src="https://www.seoclerk.com/pics/558390-11FO8A1505384509.png" width="250" />
          <Modal
            title="Upload Icon"
            visible={this.state.visible}
            onOk={() => this.onOk()}
            onCancel={() => this.onCancel()}
          >
            <Upload {...uploadProps}>
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
};

export default injectIntl(logo);
