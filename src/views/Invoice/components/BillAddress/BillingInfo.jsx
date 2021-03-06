import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setBIField } from '../../flow/biForm/actions';
import BIForm from './BIForm';

const defaultProps = {};
const propTypes = {
  setBIField: PropTypes.func.isRequired,
};


class BillingInfo extends Component {
  handleFieldsChange = fields => this.props.setBIField(fields)

  render() {
    const { form, countries } = this.props;
    return (
      <BIForm
        countries={countries}
        onChange={this.handleFieldsChange}
        {...form}
      />
    );
  }
}


BillingInfo.defaultProps = defaultProps;
BillingInfo.propTypes = propTypes;
const mapStateToProps = ({ global, invoice }) => ({
  countries: global.settings.countries,
  form: invoice.biForm,
});
const mapDispatchToProps = {
  setBIField,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BillingInfo);
