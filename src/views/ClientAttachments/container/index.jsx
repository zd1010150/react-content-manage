import { Button, Col, Icon, Row, Select, Upload } from 'antd';
import { Panel } from 'components/ui/index';
import { baseUrl } from 'config/env.config';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getAuthorization, getThemeByType } from 'utils/common';

const { Option } = Select;


const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
};

class ClientAttachments extends Component {
  constructor(props) {
    super(props);
    const { match } = props;
    const { objectId, objectType } = match.params;
    this.state = {
      fileList: [],
      categoryId: '',
      objectId,
      objectType,
    };
  }

  handleCancel = () => this.props.history.goBack();

  handleCategoryChange = value => this.setState({ categoryId: value })

  render() {
    const {
      categoryId,
      objectId,
      objectType,
    } = this.state;
    const theme = getThemeByType(objectType);
    const { intl, categories } = this.props;

    const uploadProps = {
      data: file => ({
        category: categoryId,
        document: file,
        ownerId: objectId,
        ownerType: objectType,
      }),
      headers: {
        'Authorization': getAuthorization(),
      },
      action: `${baseUrl}/admin/files/asset`,
      withCredentials: true,
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
      onSuccess: () => this.props.history.goBack(),
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return true;
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
        contentClasses="pl-lg pr-lg pt-md pb-md"
      >
        <Row>
          <Col>{formatMessage({ id: `${i18n}.type` })}</Col>
          <Col>
            <Select
              className="full-width"
              onChange={this.handleCategoryChange}
              value={categoryId}
            >
              {categories.map(category => <Option key={category.id} value={category.id}>{category.display_value}</Option>)}
            </Select>
          </Col>
        </Row>
        <Row className="mt-md mb-md">
          <Col xs={24} sm={8}>
            <Upload {...uploadProps} showUploadList={false}>
              <Button size="small" disabled={categoryId === ''}>
                <Icon size="small" type="upload" />
                {formatMessage({ id: `${i18nGlobal}.selectFileAndUpload` })}
              </Button>
            </Upload>
            <Button className="ml-sm" size="small" type="danger" onClick={this.handleCancel}>
              <Icon type="close" />
              {formatMessage({ id: `${i18nGlobal}.cancel` })}
            </Button>
          </Col>
        </Row>
      </Panel>
    );
  }
}


ClientAttachments.defaultProps = defaultProps;
ClientAttachments.propTypes = propTypes;
const mapStateToProps = ({ global }) => ({
  categories: global.settings.categories,
});
export default connect(mapStateToProps)(withRouter(injectIntl(ClientAttachments)));
