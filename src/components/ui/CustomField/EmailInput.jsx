import { Input } from 'antd';
import { ErrorText } from 'components/ui/index';
import PropTypes from 'prop-types';
import React from 'react';

const isEmailValid = (value) => {
  // The following regex refer to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#Validation
  const emailReg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailReg.test(value);
};


const defaultProps = {
  onBlur: null,
  onChange: null,
  value: '',
};
const propTypes = {
  id: PropTypes.number.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  size: PropTypes.string.isRequired,
  value: PropTypes.string,
};


const EmailInput = ({
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

  return (
    <div className={isValid ? '' : 'has-error'}>
      <Input
        size={size}
        value={value}
        onBlur={_onBlur}
        onChange={_onChange}
      />
      {!isValid && <ErrorText intlId="page.customField.message" />}
    </div>
  );
};


EmailInput.defaultProps = defaultProps;
EmailInput.propTypes = propTypes;
export default EmailInput;
