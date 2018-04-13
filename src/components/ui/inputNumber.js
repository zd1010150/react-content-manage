import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Input, Button } from 'antd';
import classNames from 'classnames/bind';
import styles from './inputNumber.less';


const cx = classNames.bind(styles);
class InputNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.value,
      min: this.props.min,
      max: this.props.max,
    };
    this.handleExtraError(this.state.min, this.state.max);
  }
  componentWillReceiveProps(nextProps) {
    const { min, max, value } = nextProps;
    this.handleExtraError(min, max);
    if (value >= min && value <= max) {
      this.setState({
        inputValue: value,
        min,
        max,
      });
    }
  }
  handleExtraError(min, max) {
    if (min > max) {
      throw Error('input number min is bigger than max!');
    }
  }
  plus() {
    let newValue = this.state.inputValue + 1;
    newValue = newValue > this.state.max ? this.state.max : newValue;
    this.setState({
      inputValue: newValue,
    });
    this.props.onChange(newValue);
  }
  minus() {
    let newValue = this.state.inputValue - 1;
    newValue = newValue < this.props.min ? this.state.min : newValue;
    this.setState({
      inputValue: newValue,
    });
    this.props.onChange(newValue);
  }
  handleChange(event) {
    try{
      const value = Number(event.target.value);
      if (value >= this.state.min && value <= this.state.max) {
        this.setState({
          inputValue: value,
        });
        this.props.onChange(value);
      }
      this.setState({
        inputValue: this.state.inputValue,
      });
    }catch(ex){
      this.setState({
        inputValue: this.state.inputValue,
      });
    }
  }
  render() {
    const { disabled } = this.props;
    return (
      <div className={cx('input-number-wrapper')}>
        <Button disabled={disabled} onClick={() => { this.minus(); }} className={classNames(cx('input-number-btn'), cx('input-number-btn-minus'))}><Icon type="minus" /></Button>
        <Input
          disabled={disabled}
          className={cx('input-number-input')}
          size="small"
          defaultValue={this.props.defaultValue}
          value={this.state.inputValue}
          onChange={(event) => { this.handleChange(event); }}
        />
        <Button disabled={disabled} onClick={() => { this.plus(); }} className={classNames(cx('input-number-btn'), cx('input-number-btn-plus'))}><Icon type="plus" /></Button>
      </div>
    );
  }
}

InputNumber.defaultProps = {
  min: 0,
  max: 0,
  value: 0,
  defaultValue: 0,
  disabled: false,
  onChange() {

  },
};
InputNumber.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func,
  defaultValue: PropTypes.number,
  disabled: PropTypes.bool,
};
export default InputNumber;
