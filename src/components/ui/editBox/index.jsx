import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Icon, DatePicker } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import classNames from 'classnames/bind';
import styles from './index.less';


const cx = classNames.bind(styles);

const { Option } = Select;
class EditBox extends React.Component {
    state={
      originValue: this.props.value,
      value: this.props.value,
      isEdting: false,
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value) {
        this.setState({
          originValue: nextProps.value,
          value: nextProps.value,
        });
      }
    }
    onChange(value) {
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

    reset() {
      this.setState({ value: this.state.originValue });
    }
    filterSelectText(val) {
      const option = this.props.options.filter(item => item.value === val);

      return _.isEmpty(option) ? '' : option[0].text;
    }
    buildElm() {
      const {
        type, options, inputClasses, dateFormat,
      } = this.props;

      switch (type) {
        case 'select':
          return <Select className={classNames(inputClasses, cx('editbox-element'))} value={this.state.value} size="small" onChange={val => this.onChange(val)} onBlur={() => this.onBlur()}>{ options.map((op, index) => <Option value={op.value} key={op.value}>{ op.text }</Option>) }</Select>;
        case 'datePicker':
          return (<DatePicker
            value={moment(this.state.value, dateFormat)}
            size="small"
            className={classNames(inputClasses, cx('editbox-element'))}
            onChange={(moment, date) => {
              this.onChange(date);
              this.onBlur();
          }}
          />);
        case 'input':
        default:
          return <Input className={classNames(inputClasses, cx('editbox-element'))} size="small" value={this.state.value} onBlur={() => this.onBlur()} onPressEnter={e => this.onBlur(e.target.value)} onChange={(e) => { this.onChange(e.target.value); }} />;
      }
    }
    buildValue() {
      const {
        type, isShowStatuLabel, isDisabled, inputClasses,isShowEditIcon
      } = this.props;
      let valueEl;
      let iconEl;
      if (type === 'select') {
        valueEl = this.filterSelectText(this.state.value);
      } else {
        valueEl = this.state.value;
      }

      if (isShowStatuLabel) {
        if (isDisabled) {
          iconEl = <Icon type="lock" className="danger" />;
        } else if (!_.isEqual(`${this.state.originValue}`, `${this.state.value}`)) {
          iconEl = <Icon type="reload" className="ok" onClick={() => this.reset()} />;
        }
      }

      return <div className={cx('editbox-value-wrapper')}><span className={classNames(inputClasses, cx('editbox-value'))}> {valueEl}</span>{iconEl}</div>;
    }

    render() {
      const { spanClasses, type, onClick } = this.props;
      return (
        <div
          onDoubleClick={(e) => {
            e.stopPropagation();
            this.onEditing();
            }}
          className={classNames(spanClasses, cx('editbox-wrapper'))}
          onClick={e => onClick(e)}
        >
          { this.state.isEdting ? this.buildElm() : this.buildValue() }
        </div>
      );
    }
}
EditBox.defaultProps = {
  isDisabled: false,
  isShowStatuLabel: true,
    isShowEditIcon: false,
  onChange: (val) => { console.log('change', val); },
  onBlur: (val) => { console.log('blur', val); },
  onEditing: (val) => { console.log('editing', val); },
  onClick: () => {},
  value: '',
  options: [],
  dateFormat: 'YYYY/MM/DD',
};

EditBox.propTypes = {
  type: PropTypes.oneOf(['input', 'select', 'datePicker']).isRequired,
  isShowStatuLabel: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onBlur: PropTypes.func,
  onEditing: PropTypes.func,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  options: PropTypes.array,
  inputClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  spanClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  dateFormat: PropTypes.string, // moment format string
};


export default EditBox;

