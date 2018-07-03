import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setItemInfoField } from '../../flow/actions';
import ItemInfoForm from './ItemInfoForm';

const defaultProps = {};
const propTypes = {
  setItemInfoField: PropTypes.func.isRequired,
};


class ItemInfo extends Component {
  componentDidMount() {

  }

  handleFieldsChange = fields => this.props.setItemInfoField(fields)

  render() {
    const { form, statuses, relatedOptions } = this.props;
    return (
      <ItemInfoForm
        statuses={statuses}
        relatedOptions={relatedOptions}
        onChange={this.handleFieldsChange}
        {...form}
      />
    );
  }
}


ItemInfo.defaultProps = defaultProps;
ItemInfo.propTypes = propTypes;
const mapStateToProps = ({ global, invoice }) => ({
  form: invoice.itemDetails,
  statuses: global.settings.invoice.statuses,
  relatedOptions: {
    accounts: [
      {
        "invoice_able_type": "accounts",
        "invoice_able_id": 3405,
        "name": "666 666",
        id: 'A3405',
      },
    ],
    opportunities: [
      {
        "invoice_able_type": "opportunities",
        "invoice_able_id": 1286,
        "name": "666 666",
        id: 'O1286',
      },
    ],
  },
});
const mapDispatchToProps = {
  setItemInfoField,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemInfo);
