import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);

const defaultProps = {
  labelText: 'Default Label',
  placeholder: 'enter'
};
const propTypes = {
  labelText: PropTypes.string.isRequired,
  labelColor: PropTypes.string,
  placeholder: PropTypes.string,
  underlineColor: PropTypes.shape({
    default: PropTypes.string,
    focused: PropTypes.string,
  }),
  syncWithRedux: PropTypes.func,
};

class FloatingLabelInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmpty: true,
      isFocused: false,
      value: '',
    };
  }

  onFocus = e => {
    this.setState({
      isFocused: true,
    });
  }

  onBlur = e => {
    this.setState({
      isFocused: false,
    });
  }

  onChange = e => {
    const value = e.target.value;
    this.setState({
      isEmpty: value.length === 0,
      value: value,
    });
    // TODO:
    // able to sync with redux
    const { syncWithRedux } = this.props;
    if (syncWithRedux && typeof syncWithRedux === 'function') {
      syncWithRedux(value);
    }
  }

  render() {
    const { isEmpty, isFocused, value } = this.state;
    const { labelText, placeholder, labelColor } = this.props;
    const shouldLabelUp = !(!isFocused && isEmpty);
    const shouldShowPlaceholder = isFocused && isEmpty;

    return (
      <div className={cx('floatingInputWrapper')}>
        <label
          className={shouldLabelUp ? cx('toTop') : '' }
          style={{ color: labelColor }}
        >
          {labelText}
        </label>
        <div className={cx('placeholder') + (shouldShowPlaceholder ? ' ' + cx('show') : '')}>
          {placeholder}
        </div>
        <Input
          value={value}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onFocus={this.onFocus}
        />
        <div>
          <hr />
          <hr className={cx('default') + (isFocused ? ' ' + cx('highlighted') : '')} />
        </div>
      </div>
    );
  }
}

FloatingLabelInput.defaultProps = defaultProps;
FloatingLabelInput.propTypes = propTypes;
export default FloatingLabelInput;