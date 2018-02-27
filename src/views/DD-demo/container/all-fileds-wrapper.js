/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteFromSection, setCanDrop } from '../flow/action';
import AllFields from '../component/fields/allFields';
import AddSection from '../component/actions/add-setion';

class allFieldsWrapper extends React.Component {
  render() {
    const { allFields, deleteFromSection, setCanDrop } = this.props;
    return (
      <div>
        <AddSection />
        <AllFields fields={allFields} deleteFromSection={deleteFromSection} setCanDrop={setCanDrop} />
      </div>);
  }
}

allFieldsWrapper.defaultProps = {
  allFields: [],
};
allFieldsWrapper.propTypes = {
  allFields: PropTypes.array,
  deleteFromSection: PropTypes.func.isRequired,
  setCanDrop: PropTypes.func.isRequired,
};
const mapStateToProps = ({ ddDemo }) => ({
  allFields: ddDemo.fields,
  sections: ddDemo.sections,
});
const mapDispatchToProp = {
  deleteFromSection,
  setCanDrop,
};

const AllFieldsWrapper = connect(mapStateToProps, mapDispatchToProp)(allFieldsWrapper);
export default AllFieldsWrapper;
