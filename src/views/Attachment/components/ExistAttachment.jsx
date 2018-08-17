import { Icon, Input, Select } from 'antd';
import React, { Component, Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setFieldValue } from '../flow/actions';

const { Option } = Select;
const { TextArea } = Input;


const propTypes = {
  intl: intlShape.isRequired,
};

class ExistAttachment extends Component {
  handleCategoryChange = newValue => this.props.setFieldValue('category', newValue)
  handleCommentChange = e => this.props.setFieldValue('comment', e.target.value)

  render() {
    const { intl, attachment, categories } = this.props;
    const { formatMessage } = intl;
    const i18n = 'page.Attachment';
    const { url, category, comment } = attachment;

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
        <div className="mb-md">
          <label>{formatMessage({ id: `${i18n}.preview` })}</label>
          {url ? (
            <Link target="_blank" to={url}>
              <Icon
                style={{
                  fontWeight: 400,
                  fontSize: '16px',
                }}
                className="ml-md cursor-pointer"
                type="eye"
              />
            </Link>
          ) : 'Preview is impossible due to wrong url.'}
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

ExistAttachment.propTypes = propTypes;
const mapStateToProps = ({ global, attachment }) => ({
  attachment,
  categories: global.settings.categories,
});
const mapDispatchToProps = {
  setFieldValue,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(ExistAttachment));
