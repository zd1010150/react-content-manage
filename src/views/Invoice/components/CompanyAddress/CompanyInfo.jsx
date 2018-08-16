import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCIField } from '../../flow/ciForm/actions';
import CIForm from './CIForm';

const defaultProps = {};
const propTypes = {
  setCIField: PropTypes.func.isRequired,
};


class CompanyInfo extends Component {
  handleFieldsChange = fields => this.props.setCIField(fields)

  render() {
    const { form, countries } = this.props;
    return (
      <CIForm
        countries={countries}
        onChange={this.handleFieldsChange}
        {...form}
      />
    );
  }
}


CompanyInfo.defaultProps = defaultProps;
CompanyInfo.propTypes = propTypes;
const mapStateToProps = ({ global, invoice }) => ({
  countries: global.settings.countries,
  form: invoice.ciForm,
});
const mapDispatchToProps = {
  setCIField,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompanyInfo);
