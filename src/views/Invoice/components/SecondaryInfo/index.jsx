import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Select, Input } from 'antd';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import RelatedTo from './RelatedTo';
import { setStatus, setDescription } from '../../flow/secondaryInfo/actions';

const colLayout = {
  xs: 24,
  sm: 6,
};
const titleStyle = {
  className: 'mb-sm ant-form-item-label',
  style: { lineHeight: 1.5 },
};
const { TextArea } = Input;
const { Option } = Select;


const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
  // TODO: extract to a common check for { id, display_value }
  statuses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    display_value: PropTypes.string.isRequired,
  })).isRequired,
  status: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  lastModifiedAt: PropTypes.string.isRequired,
  lastModifiedBy: PropTypes.string.isRequired,
};

class SecondaryInfo extends Component {
  handleDescriptionChange = e => this.props.setDescription(e.target.value)
  handleStatusChange = newStatus => this.props.setStatus(newStatus)

  render() {
    const { intl, statuses, status, lastModifiedAt, lastModifiedBy } = this.props;
    const { formatMessage } = intl;
    const i18n = 'global.ui.table';

    return (
      <Fragment>
        <Row gutter={16}>
          <Col {...colLayout}>
            <div {...titleStyle}>{formatMessage({ id: `${i18n}.status` })}</div>
            <Select
              className="full-width"
              size="small"
              onChange={this.handleStatusChange}
              value={status}
            >
              {statuses.map(s => <Option key={s.id} value={s.id}>{s.display_value}</Option>)}
            </Select>
          </Col>
          <Col {...colLayout}><RelatedTo /></Col>
          <Col {...colLayout}>
            <div {...titleStyle}>{formatMessage({ id: `${i18n}.lastModifiedAt` })}</div>
            <Input className="readOnly" readOnly size="small" value={lastModifiedAt} />
          </Col>
          <Col {...colLayout}>
            <div {...titleStyle}>{formatMessage({ id: `${i18n}.modifiedBy` })}</div>
            <Input className="readOnly" readOnly size="small" value={lastModifiedBy} />
          </Col>
        </Row>
        <Row className="mt-lg">
          <div {...titleStyle}>{formatMessage({ id: `${i18n}.descriptionOfInvoice` })}</div>
          <TextArea
            autosize={{ minRows: 6, maxRows: 10 }}
            onChange={this.handleDescriptionChange}
          />
        </Row>
      </Fragment>
    );
  }
}

SecondaryInfo.defaultProps = defaultProps;
SecondaryInfo.propTypes = propTypes;
const mapStateToProps = ({ global, invoice }) => ({
  language: global.language,
  statuses: global.settings.invoice.statuses,
  status: invoice.secondaryInfo.status,
  description: invoice.secondaryInfo.description,
  lastModifiedAt: invoice.secondaryInfo.lastModifiedAt,
  lastModifiedBy: invoice.secondaryInfo.lastModifiedBy,
});
const mapDispatchToProps = {
  setStatus,
  setDescription,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(SecondaryInfo));
