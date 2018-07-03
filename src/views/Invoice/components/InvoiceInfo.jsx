import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setInvoiceField, tryFetchAutoInvoiceId } from '../flow/actions';
import InvoiceInfoForm from './InvoiceInfoForm';

const defaultProps = {};
const propTypes = {
  setInvoiceField: PropTypes.func.isRequired,
};


class InvoiceInfo extends Component {
  componentDidMount() {
    this.props.tryFetchAutoInvoiceId();
  }

  handleFieldsChange = fields => this.props.setInvoiceField(fields)

  render() {
    const { form, format } = this.props;
    return (
      <InvoiceInfoForm
        format={format}
        onChange={this.handleFieldsChange}
        {...form}
      />
    );
  }
}


InvoiceInfo.defaultProps = defaultProps;
InvoiceInfo.propTypes = propTypes;
const mapStateToProps = ({ global, invoice }) => ({
  format: global.timeZoneSetting.dateFormat,
  form: invoice.invoiceInfo,
});
const mapDispatchToProps = {
  setInvoiceField,
  tryFetchAutoInvoiceId,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InvoiceInfo);
