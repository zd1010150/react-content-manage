import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Select, Input } from 'antd';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import RelatedTo from './RelatedTo';

const colLayout = {
  xs: 24,
  sm: 6,
};
const titleStyle = {
  className: 'mb-sm ant-form-item-label',
  style: { lineHeight: 1.5 },
};
const { Option } = Select;


const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
  // TODO: extract to a common check for { id, display_value }
  statuses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    display_value: PropTypes.string.isRequired,
  })).isRequired,
};

class SecondaryInfo extends Component {
  handleStatusChange = () => {}
  render() {
    const { intl, statuses } = this.props;
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
            >
              {statuses.map(s => <Option key={s.id} value={s.id}>{s.display_value}</Option>)}
            </Select>
          </Col>
          <Col {...colLayout}><RelatedTo /></Col>
          <Col {...colLayout}>
            <div {...titleStyle}>{formatMessage({ id: `${i18n}.lastModifiedAt` })}</div>
            <Input readOnly size="small" />
          </Col>
          <Col {...colLayout}>
            <div {...titleStyle}>{formatMessage({ id: `${i18n}.modifiedBy` })}</div>
            <Input readOnly size="small" />
          </Col>
        </Row>
        <Row></Row>
      </Fragment>
    );
  }
}

SecondaryInfo.defaultProps = defaultProps;
SecondaryInfo.propTypes = propTypes;
const mapStateToProps = ({ global, invoice }) => ({
  language: global.language,
  statuses: global.settings.invoice.statuses,
});
const mapDispatchToProps = {
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(SecondaryInfo));
