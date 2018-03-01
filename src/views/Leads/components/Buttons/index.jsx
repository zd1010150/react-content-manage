import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ButtonsWrapper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button>abc</button>
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
export default ButtonsWrapper;