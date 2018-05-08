/* eslint-disable jsx-a11y/label-has-for */
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
  labelText: PropTypes.string,
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

  getHrCls = (hasError) => {
    const { isFocused } = this.state;
    let hrCls = cx('default');
    if (isFocused) {
      hrCls += ` ${cx('highlighted')}`;
    }
    if (hasError) {
      hrCls += ` ${cx('hasError')}`;
    }
    return hrCls;
  }

  getLabelCls = () => {
    let labelCls = '';
    const { isEmpty, isFocused } = this.state;
    const shouldLabelRise = !(!isFocused && isEmpty);
    if (shouldLabelRise) {
      labelCls += ` ${cx('toTop')}`;
    }

    if (this.props.required) {
      labelCls += ` ${cx('required')}`;
    }

    return labelCls;
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

    const shouldShowPlaceholder = isFocused && isEmpty;

    const hasError = required && value === '';

    return (
      <div className={classNames(cx('floatingInputWrapper'), 'floatingInputWrapper') + (hasError ? ' has-error' : '')}>
        <label
          className={this.getLabelCls()}
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
            onSearch={searchText => handleSearch(searchText)}
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
          <hr className={hasError ? cx('hasError') : ''} />
          <hr className={this.getHrCls(hasError)} />
        </div>
        {hasError && <div className="ant-form-explain inheritedFromAntd">{message}</div>}
      </div>
    );
  }
}

FloatingLabelInput.defaultProps = defaultProps;
FloatingLabelInput.propTypes = propTypes;
export default FloatingLabelInput;
