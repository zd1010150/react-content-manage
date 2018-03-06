import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);

const defaultProps = {
  labelText: 'Default Label',
  withSearch: false,
};
const propTypes = {
  labelText: PropTypes.string.isRequired,
  labelColor: PropTypes.string,
  placeholder: PropTypes.string,
  syncWithRedux: PropTypes.func,
  withSearch: PropTypes.bool.isRequired,
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
    const { value } = e.target;
    this.setState({
      isEmpty: value.length === 0,
      value: value,
    });
  }

  onSearch = value => {
    // Exposure to redux actions
    const { syncWithRedux } = this.props;
    if (syncWithRedux && typeof syncWithRedux === 'function') {
      syncWithRedux(value);
    }
  }

  onPressEnter = e => {
    this.onSearch(e.target.value);
  }

  render() {
    const { isEmpty, isFocused, value } = this.state;
    const { labelText, labelColor, placeholder , withSearch } = this.props;
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
        <div className={cx('placeholder') + (shouldShowPlaceholder ? ` ${cx('show')}` : '')}>
          {placeholder}
        </div>
        {withSearch ? (
          <Input.Search
            value={value}
            onBlur={this.onBlur}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onPressEnter={this.onPressEnter}
            onSearch={this.onSearch}
            enterButton
          />
        ) : (
          <Input
            value={value}
            onBlur={this.onBlur}
            onChange={this.onChange}
            onFocus={this.onFocus}
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