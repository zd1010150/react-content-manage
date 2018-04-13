import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { Input } from 'antd';
// presets
const isEmailValid = value => {
  // The following regex refer to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#Validation
  const emailReg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailReg.test(value);
}

const propTypes = {
  intl: intlShape.isRequired,
  id: PropTypes.number.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  size: PropTypes.string.isRequired,
  value: PropTypes.string,
};


const EmailInput = ({
  intl,
  id,
  onBlur,
  onChange,
  size,
  value,
}) => {

  const _onBlur = $ => {
    if (_.isFunction(onBlur)) {
      onBlur();
    }
  };

  const _onChange = e => {
    if (_.isFunction(onChange)) {
      onChange(id, e.target.value);
    }
  };

  const isValid = isEmailValid(value);
  const message = intl.formatMessage({ id: 'page.customField.message' });
  return (
    <div className={isValid ? '' : 'has-error'}>
      <Input
        size={size}
        value={value}
        onBlur={_onBlur}
        onChange={_onChange}
      />
      {!isValid && message && <div className="ant-form-explain">{message}</div>}
    </div>
  );
};


EmailInput.propTypes = propTypes;
export default injectIntl(EmailInput);