import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import classNames from 'classnames/bind';
import styles from './index.less';

const cx = classNames.bind(styles);

const defaultProps = {
  labelText: 'Default Label',
  withSearch: false,
  enterButton: true,
};
const propTypes = {
  labelText: PropTypes.string.isRequired,
  labelColor: PropTypes.string,
  placeholder: PropTypes.string,
  addonAfter: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  withSearch: PropTypes.bool,
  handleChange: PropTypes.func,
  handleSearch: PropTypes.func,
  handleFocus: PropTypes.func,
  enterButton: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
};

class FloatingLabelInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmpty: true,
      isFocused: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      this.setState({ isEmpty: nextProps.value.length === 0 });
    }
  }

  onBlur = e => this.setState({ isFocused: false })

  onFocus = (e) => {
    e.stopPropagation();
    this.setState({ isFocused: true });

    const { handleFocus } = this.props;
    if (_.isFunction(handleFocus)) {
      handleFocus(e.target.value);
    }
  }

  onPressEnter = (e) => {
    const { handleSearch } = this.props;
    if (_.isFunction(handleSearch)) {
      handleSearch(e.target.value);
    }
  }

  onChange = (e) => {
    const { value } = e.target;
    this.setState({ isEmpty: value.length === 0 });

    const { handleChange } = this.props;
    if (_.isFunction(handleChange)) {
      handleChange(value);
    }
  }

  render() {
    const { isEmpty, isFocused } = this.state;
    const {
      labelText,
      labelColor,
      placeholder,
      withSearch,
      value,
      addonAfter,
      handleChange,
      handleSearch,
      message,
      required,
      noLabel,
      enterButton,
    } = this.props;
    const shouldLabelUp = !(!isFocused && isEmpty);
    const shouldShowPlaceholder = isFocused && isEmpty;

    const hasError = required && value === '';
    return (
      <div className={classNames(cx('floatingInputWrapper'), 'floatingInputWrapper') + (hasError ? ' has-error' : '')}>
        <label
          className={shouldLabelUp ? cx('toTop') : ''}
          style={{ color: labelColor, display: noLabel ? 'none' : '' }}
        >
          {labelText}
        </label>
        <div className={cx('placeholder') + (shouldShowPlaceholder ? ` ${cx('show')}` : '')}>
          {placeholder}
        </div>
        {withSearch ? (
          <Input.Search
            defaultValue={value}
            onBlur={this.onBlur}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onPressEnter={this.onPressEnter}
            onSearch={value => handleSearch(value)}
            enterButton={enterButton}
          />
        ) : (
          <Input
            value={value}
            onBlur={this.onBlur}
            onChange={this.onChange}
            onFocus={this.onFocus}
            addonAfter={addonAfter}
          />
        )}
        <div>
          <hr />
          <hr className={cx('default') + (isFocused ? ` ${cx('highlighted')}` : '')} />
        </div>
        {hasError && <div className="ant-form-explain">{message}</div>}
      </div>
    );
  }
}

FloatingLabelInput.defaultProps = defaultProps;
FloatingLabelInput.propTypes = propTypes;
export default FloatingLabelInput;
