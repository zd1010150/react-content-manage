import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTimeSetting } from 'utils/dateTimeUtils';
import Enums from 'utils/EnumsManager';
import { setField, tryFetchAutoNumber } from '../../flow/invoiceInfo/actions';
import InvoiceInfoForm from './InvoiceInfoForm';

const { PhantomId } = Enums;


const defaultProps = {
  setInvoiceField: null,
  tryFetchAutoNumber: null,
};
const propTypes = {
  setInvoiceField: PropTypes.func,
  tryFetchAutoNumber: PropTypes.func,
};


class InvoiceInfo extends Component {
  handleFieldChange = field => this.props.setField(field)
  handleReloadNumClick = () => this.props.tryFetchAutoNumber()

  render() {
    const { form, match } = this.props;
    const { invoiceId } = match.params;
    const setting = getTimeSetting();

    return (
      <InvoiceInfoForm
        format={setting.format}
        onChange={this.handleFieldChange}
        onNumReload={this.handleReloadNumClick}
        invoiceNumReadOnly={invoiceId !== PhantomId}
        {...form}
      />
    );
  }
}


InvoiceInfo.defaultProps = defaultProps;
InvoiceInfo.propTypes = propTypes;
const mapStateToProps = ({ invoice }) => ({
  form: invoice.invoiceInfo,
});
const mapDispatchToProps = {
  setField,
  tryFetchAutoNumber,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(InvoiceInfo));
