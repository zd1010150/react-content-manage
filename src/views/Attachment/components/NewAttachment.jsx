import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Select, Input, Upload, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { setFieldValue } from '../flow/actions';

const { Option } = Select;
const { TextArea } = Input;

const propTypes = {
  intl: intlShape.isRequired,
};

class NewAttachment extends Component {
  handleCategoryChange = newValue => this.props.setFieldValue('category', newValue)
  handleCommentChange = e => this.props.setFieldValue('comment', e.target.value)

  render() {
    const { intl, categories, attachment } = this.props;
    const { category, comment, file } = attachment;
    const { formatMessage } = intl;
    const i18n = 'page.Attachment';

    const shouldDisabled = file !== null;
    const uploadProps = {
      beforeUpload: (newFile) => {
        this.props.setFieldValue('file', newFile);
        return false;
      },
      fileList: file !== null ? [{
        uid: file.uid,
        name: file.name,
        status: 'done', // options：uploading, done, error, removed
      }] : [],
      onRemove: () => this.props.setFieldValue('file', null),
      disabled: shouldDisabled,
    };

    return (
      <Fragment>
        <div className="mb-md">
          <label>{formatMessage({ id: `${i18n}.category` })}</label>
          <Select
            className="full-width"
            onChange={this.handleCategoryChange}
            size="small"
            value={category}
          >
            {categories.map(t => <Option key={t.id} value={t.id}>{t.display_value}</Option>)}
          </Select>
        </div>
        <div className="mb-md" style={{ maxWidth: 500 }}>
          <Upload {...uploadProps}>
            <Button disabled={shouldDisabled}>
              <Icon type="upload" className="font-sm icon-thinner" />
              <label className="ml-sm cursor-pointer">
                {formatMessage({ id: `${i18n}.upload` })}
              </label>
            </Button>
          </Upload>
        </div>
        <div className="mb-xlg">
          <label>{formatMessage({ id: `${i18n}.comment` })}</label>
          <TextArea
            autosize={{
              minRows: 6,
              maxRows: 20,
            }}
            onChange={this.handleCommentChange}
            value={comment}
          />
        </div>
      </Fragment>
    );
  }
}


const mapStateToProps = ({ global, attachment }) => ({
  categories: global.settings.categories,
  attachment,
});
const mapDispatchToProps = {
  setFieldValue,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(NewAttachment));
