import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const defaultProps = {
  size: 'small',
  message: 'The input is not valid E-mail',
};
const propTypes = {
  id: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

const isEmailValid = value => {
  // The following regex refer to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#Validation
  const emailReg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailReg.test(value);
}

const EmailInput = ({
  id,
  size,
  message,
  onChange,
  ...others
}) => {

  const isValid = isEmailValid(others.value);
  return (
    <div className={isValid ? '' : 'has-error'}>
      <Input
        onChange={e => onChange(id, e.target.value)}
        size={size}
        {...others}
      />
      {!isValid && <div className="ant-form-explain">{message}</div>}
    </div>
  );
};

EmailInput.defaultProps = defaultProps;
EmailInput.propTypes = propTypes;
export default EmailInput;