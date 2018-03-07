import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ListTopButtons } from 'components/ui/index';

class ButtonsWrapper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ListTopButtons />
    );
  }
}

const mapStateToProps = ({ global }) => ({
  language: global.language,
});
const mapDispatchToProp = {
};
export default connect(mapStateToProps)(ButtonsWrapper);