import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ViewFilter } from 'components/ui/index';

class FilterWrapper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ViewFilter />
      </div>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  user: global.orderUser,
});
const mapDispatchToProp = {
  // setPageTitle,
  // resetUser,
};
export default FilterWrapper;