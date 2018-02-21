/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteFromSection } from '../flow/action';
import AllFields from '../component/allFields';
import AddSection from '../component/add-setion';

class allFieldsWrapper extends React.Component {
  render() {
    const { allFields, deleteFromSection } = this.props;
    return (
      <div>
        <AddSection />
        <AllFields fields={allFields} deleteFromSection={deleteFromSection} />
      </div>);
  }
}

allFieldsWrapper.defaultProps = {
  allFields: [],
};
allFieldsWrapper.propTypes = {
  allFields: PropTypes.array,
  deleteFromSection: PropTypes.func.isRequired,
};
const mapStateToProps = ({ ddDemo }) => ({
  allFields: ddDemo.fields,
  sections: ddDemo.sections,
});
const mapDispatchToProp = {
  deleteFromSection,
};

const AllFieldsWrapper = connect(mapStateToProps, mapDispatchToProp)(allFieldsWrapper);
export default AllFieldsWrapper;
