import { Button, Col, Icon, Input, Row, Select, Upload } from 'antd';
import { Panel } from 'components/ui/index';
import { baseUrl } from 'config/env.config';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getAuthorization, getThemeByType } from 'utils/common';
import Enums from 'utils/EnumsManager';
import { tryFetchAttachmentInfo, tryUpdateAttachmentInfo, setFieldValue, reset } from '../flow/actions';

const { PhantomId } = Enums;
const { TextArea } = Input;
const { Option } = Select;


const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
};

class ClientAttachments extends Component {
  constructor(props) {
    super(props);
    const { match } = props;
    const { objectId, objectType, attachmentId } = match.params;
    this.state = {
      fileList: [],
      objectId,
      objectType,
      attachmentId,
    };
  }

  componentDidMount() {
    if (this.state.attachmentId !== PhantomId) {
      this.props.tryFetchAttachmentInfo(this.state.attachmentId);
    }
  }

  componentWillUnmount() {
    this.props.reset();
  }

  handleCancel = () => this.props.history.goBack();

  handleCategoryChange = value => this.props.setFieldValue('category', value)

  handleCommentChange = e => this.props.setFieldValue('comment', e.target.value)

  handleSaveClick = () => {
    const { attachmentId } = this.state;
    const { attachment, tryUpdateAttachmentInfo } = this.props;
    const { category, comment } = attachment;
    tryUpdateAttachmentInfo(attachmentId, category, comment, this);
  }

  render() {
    const {
      objectId,
      objectType,
      attachmentId,
    } = this.state;
    const theme = getThemeByType(objectType);
    const { intl, categories, attachment } = this.props;

    const { category, comment } = attachment;

    const attachmentExists = attachmentId !== PhantomId;

    const uploadProps = {
      data: file => ({
        category,
        document: file,
        ownerId: objectId,
        ownerType: objectType,
        comment,
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
              value={category}
            >
              {categories.map(c => <Option key={c.id} value={c.id}>{c.display_value}</Option>)}
            </Select>
          </Col>
        </Row>
        <Row className="mt-md mb-md">
          <Col>{formatMessage({ id: 'global.ui.table.comment' })}</Col>
          <Col>
            <TextArea rows={6} onChange={this.handleCommentChange} value={attachmentExists ? attachment.comment : comment} />
          </Col>
        </Row>
        {attachmentExists ? (
          <Row className="mt-md mb-md">
            <Col>
              {formatMessage({ id: `${i18n}.preview` })}
              <Link target="_blank" to={attachment.url ? attachment.url : ''}>
                <Icon style={{ fontWeight: 400, fontSize: '16px', verticalAlign: 'top' }} className="ml-md cursor-pointer" type="eye" />
              </Link>
            </Col>
          </Row>
        ) : null}
        <Row>
          <Col xs={24} sm={8}>
            {attachmentExists ? (
              <Button className="lead-theme-btn" onClick={this.handleSaveClick}>
                <Icon size="small" type="save" />
                {formatMessage({ id: `${i18nGlobal}.save` })}
              </Button>
            ) : (
              <Upload {...uploadProps} showUploadList={false}>
                <Button disabled={category === ''}>
                  <Icon size="small" type="upload" />
                  {formatMessage({ id: `${i18nGlobal}.selectFileAndUpload` })}
                </Button>
              </Upload>
            )}
            <Button className="ml-sm" type="danger" onClick={this.handleCancel}>
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
const mapStateToProps = ({ global, attachment }) => ({
  categories: global.settings.categories,
  attachment,
});
const mapDispatchToProps = {
  tryFetchAttachmentInfo,
  tryUpdateAttachmentInfo,
  setFieldValue,
  reset,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(injectIntl(ClientAttachments)));
