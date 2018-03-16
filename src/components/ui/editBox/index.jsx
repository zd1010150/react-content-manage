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
    componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value) {
        this.setState({
          value: nextProps.value,
        });
      }
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
    filterSelectText(val) {
      const option = this.props.options.filter(item => item.value === val);
      return _.isEmpty(option) ? '' : option[0].text;
    }
    buildElm() {
      const { type, options, inputClasses } = this.props;

      switch (type) {
        case 'select':
          return <Select className={inputClasses} value={this.state.value} size="small" onChange={val => this.onChange(val)} onBlur={() => this.onBlur()}>{ options.map((op, index) => <Option value={op.value} key={op.value}>{ op.text }</Option>) }</Select>;
        case 'input':
        default:
          return <Input className={inputClasses} size="small" value={this.state.value} onBlur={() => this.onBlur()} onPressEnter={e => this.onBlur(e.target.value)} onChange={(e) => { this.onChange(e.target.value); }} />;
      }
    }
    buildValue() {
      const { type } = this.props;
      if (type === 'select') {
        return this.filterSelectText(this.state.value);
      }
      return this.state.value;
    }

    render() {
      const { spanClasses, type, onClick } = this.props;
      return (
        <span
          onDoubleClick={(e) => {
            e.stopPropagation();
            this.onEditing();
            }}
          className={spanClasses}
          onClick={e => onClick(e)}
        >
          { this.state.isEdting ? this.buildElm() : this.buildValue() }
        </span>
      );
    }
}
EditBox.defaultProps = {
  isDisabled: false,
  onChange: (val) => { console.log('change', val); },
  onBlur: (val) => { console.log('blur', val); },
  onEditing: (val) => { console.log('editing', val); },
  onClick: () => {},
  value: '',
  options: [],
};

EditBox.propTypes = {
  type: PropTypes.oneOf(['input', 'select']).isRequired,
  isDisabled: PropTypes.bool,
  onBlur: PropTypes.func,
  onEditing: PropTypes.func,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.array,
  inputClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  spanClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};


export default EditBox;

