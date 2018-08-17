import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Select, Input } from 'antd';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';

const { Option } = Select;
const { TextArea } = Input;

const propTypes = {
  intl: intlShape.isRequired,
};

class NewAttachment extends Component {
  handleTypeChange = (newTypeId) => {}
  handleCommentChange = () => {}

  render() {
    const { intl, categories } = this.props;
    const { formatMessage } = intl;
    const i18n = 'page.Attachment';

    return (
      <Fragment>
        <div className="mb-md">
          <label>{formatMessage({ id: `${i18n}.category` })}</label>
          <Select
            className="full-width"
            onChange={this.handleTypeChange}
            size="small"
          >
            {categories.map(t => <Option key={t.id} value={t.id}>{t.display_value}</Option>)}
          </Select>
        </div>
        <div className="mb-md"></div>
        <div className="mb-xlg">
          <label>{formatMessage({ id: `${i18n}.comment` })}</label>
          <TextArea
            autosize={{
              minRows: 6,
              maxRows: 20,
            }}
            onChange={this.handleCommentChange}
            value={''}
          />
        </div>
      </Fragment>
    );
  }
}


const mapStateToProps = ({ global }) => ({
  categories: global.settings.categories,
});
const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(NewAttachment));
