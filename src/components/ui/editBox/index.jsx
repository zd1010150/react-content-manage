import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from 'antd';
import _ from 'lodash';

const { Option } = Select;
class EditBox extends React.Component {
    state={
      value: this.props.value,
      isEdting: false,
    }

    onChange(value) {
      console.log('change inner', value);
      this.setState({ value });
      this.props.onChange(value);
    }
    onEditing() {
      if (!this.props.isDisabled) {
        this.setState({ isEdting: true });
      }
      this.props.onEditing(this.state.value);
    }
    onBlur() {
      this.setState({ isEdting: false });
      this.props.onBlur(this.state.value);
    }
    buildElm() {
      const { type, options } = this.props;

      switch (type) {
        case 'select':
          return <Select value={this.state.value} size="small" onChange={val => this.onChange(val)} onBlur={() => this.onBlur()}>{ options.map((op, index) => <Option value={op.value} key={op.value}>{ op.text }</Option>) }</Select>;
        case 'input':
        default:
          return <Input size="small" value={this.state.value} onBlur={() => this.onBlur()} onPressEnter={e => this.onBlur(e.target.value)} onChange={(e) => { this.onChange(e.target.value); }} />;
      }
    }

    render() {
    // TODO: Skip the login if in dev mode
    // const isDevMode = process.env.NODE_ENV === 'development' ? true : false;
      return (
        <span onDoubleClick={() => this.onEditing()}>
          { this.state.isEdting ? this.buildElm() : this.state.value }
        </span>
      );
    }
}
EditBox.defaultProps = {
  isDisabled: false,
  onChange: (val) => { console.log('change', val); },
  onBlur: (val) => { console.log('blur', val); },
  onEditing: (val) => { console.log('editing', val); },
  value: '',
  options: [],
};

EditBox.propTypes = {
  type: PropTypes.oneOf(['input', 'select']).isRequired,
  isDisabled: PropTypes.bool,
  onBlur: PropTypes.func,
  onEditing: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.array,
};


export default EditBox;

