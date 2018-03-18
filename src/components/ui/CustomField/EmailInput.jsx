import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const defaultProps = {
  size: 'small'
};
const propTypes = {
  size: PropTypes.string.isRequired,
  label: PropTypes.string,
  message: PropTypes.string,
};

class EmailInput extends Component {
  state = {
    isInvalid: true,
  }

  handleChange = e => {
    console.log(e.target.value);
  }

  render() {
    const { isInvalid } = this.state;
    const { size, message } = this.props;
    return (
      <div className={isInvalid ? 'has-error' : ''}>
        <Input size={size} onChange={this.handleChange}/>
        {isInvalid && <div className="ant-form-explain">{message}</div>}
      </div>
    );
  }
}

EmailInput.defaultProps = defaultProps;
EmailInput.propTypes = propTypes;
export default EmailInput;