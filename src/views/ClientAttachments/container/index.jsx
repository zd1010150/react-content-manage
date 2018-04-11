import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { Upload, Button, Icon, message, Row, Col, Select } from 'antd';
const { Option } = Select;

import { Panel } from 'components/ui/index';
import { getThemeByType } from 'utils/common';


const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
};

class ClientAttachments extends Component {
  state = {
    fileList: [],
    uploading: false,
  }

  handleCancel = $ => this.props.history.goBack();

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });

    this.setState({ uploading: true });

    // // You can use any AJAX library you like
    // reqwest({
    //   url: '//jsonplaceholder.typicode.com/posts/',
    //   method: 'post',
    //   processData: false,
    //   data: formData,
    //   success: () => {
    //     this.setState({
    //       fileList: [],
    //       uploading: false,
    //     });
    //     message.success('upload successfully.');
    //   },
    //   error: () => {
    //     this.setState({
    //       uploading: false,
    //     });
    //     message.error('upload failed.');
    //   },
    // });
  }

  render() {
    const { uploading } = this.state;
    const { intl, match } = this.props;
    const { objectId, objectType } = match.params;
    const theme = getThemeByType(objectType);

    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList,
    };

    const { formatMessage } = intl;
    const i18n = 'page.attachments';
    const i18nGlobal = 'global.ui.button';

    return (
      <Panel
        panelTitle={formatMessage({ id: `${i18n}.title` })}
        panelClasses={`${theme}-theme-panel`}
      >
        <Row style={{ margin: '10px 15px' }}>
          <Col>{formatMessage({ id: `${i18n}.type` })}</Col>
          <Col>
            <Select style={{ width: '100%' }}>
            </Select>
          </Col>
        </Row>
        <Row style={{ margin: '10px 15px' }}>
          <Col xs={24} sm={8}>
            <Upload {...props}>
              <Button size="small" disabled={this.state.fileList.length !== 0}>
                <Icon size="small" type="upload" />
                {formatMessage({ id: `${i18nGlobal}.selectFile` })}
              </Button>
            </Upload>
          </Col>
        </Row>
        <Row style={{ margin: '10px 15px' }}>
          <Button
            onClick={this.handleUpload}
            disabled={this.state.fileList.length === 0}
            loading={uploading}
          >
            {!uploading && <Icon type="save" />}
            {uploading
              ? formatMessage({ id: `${i18nGlobal}.uploading` })
              : formatMessage({ id: `${i18nGlobal}.upload` })
            }
          </Button>
          <Button className="ml-sm" type="danger" onClick={this.handleCancel}>
            <Icon type="close" />
            {formatMessage({ id: `${i18nGlobal}.cancel` })}
          </Button>
        </Row>
      </Panel>
    );
  }
}


ClientAttachments.defaultProps = defaultProps;
ClientAttachments.propTypes = propTypes;
export default withRouter(injectIntl(ClientAttachments));