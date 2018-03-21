import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import classNames from 'classnames/bind';
import styles from './index.less';

const cx = classNames.bind(styles);

const defaultProps = {
  labelText: 'Default Label',
  withSearch: false,
  handleChange: () => {},
  handleFocus: () => {},
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
};

class FloatingLabelInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmpty: true,
      isFocused: false,
    };
  }

  onBlur = e => this.setState({ isFocused: false })
  onFocus = (e) => {
    debugger;
    e.stopPropagation();
    this.setState({ isFocused: true });
    this.props.handleFocus();
  }
  onPressEnter = (e) => {
    this.props.handleSearch(e.target.value);
  }

  onChange = (e) => {
    const { value } = e.target;
    this.setState({
      isEmpty: value.length === 0,
    });
    this.props.handleChange(value);
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
    } = this.props;
    const shouldLabelUp = !(!isFocused && isEmpty);
    const shouldShowPlaceholder = isFocused && isEmpty;

    return (
      <div className={classNames(cx('floatingInputWrapper'), 'floatingInputWrapper')}>
        <label
          className={shouldLabelUp ? cx('toTop') : ''}
          style={{ color: labelColor }}
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
            enterButton
          />
        ) : (
          <Input
            defaultValue={value}
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
      </div>
    );
  }
}

FloatingLabelInput.defaultProps = defaultProps;
FloatingLabelInput.propTypes = propTypes;
export default FloatingLabelInput;
