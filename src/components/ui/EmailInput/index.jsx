import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const defaultProps = {};
const propTypes = {
  message: '',
};

class EmailInput extends Component {
  state = {
    isInvalid: false,
  }

  render() {
    return (
      <Fragment>
        <Input />
        {isInvalid && <span>{message}</span>}
      </Fragment>
    );
  }
}

EmailInput.defaultProps = defaultProps;
EmailInput.propTypes = propTypes;
export default EmailInput;