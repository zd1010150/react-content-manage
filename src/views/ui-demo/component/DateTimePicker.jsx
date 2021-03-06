import React, { Component, Fragment } from 'react';
import { Select, Input, DatePicker } from 'antd';
import { toUtc, toTimezone } from 'utils/dateTimeUtils';

class DateTimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datestr: '2018-03-06 20:00',
      offset: '+1100',
      format: 'YYYY-MM-DD HH:mm:ss',
      revdatestr: '2018-03-06 20:00',
      revoffset: '+1100',
      revformat: 'YYYY-MM-DD HH:mm:ss',
    };
    this.offsets = ['-1200', '-0930', '-0500', '-0100', '+0000', '+0800', '+1100', '+1245', '+1400'];
  }

  onOffsetChange = value => {
    this.setState({ offset: value });
  }

  onRevOffsetChange = value => {
    this.setState({ revoffset: value });
  }

  onInputChange = e => {
    const { value } = e.target;
    this.setState({ datestr: value });
  }

  onRevInputChange = e => {
    const { value } = e.target;
    this.setState({ revdatestr: value });
  }

  render() {
    const { datestr, offset, format, revdatestr, revoffset, revformat } = this.state;
    const options = this.offsets.map((offset, index) => <Select.Option key={index} value={offset}>{offset}</Select.Option>);

    return (
      <Fragment>
        <h4>Conversion from utc to a specific timezone time</h4>
        <label>date string:</label>
        <p style={{ color: 'red' }}>Attention: only date time string needs the conversion, so the string pattern must be 'YYYY-MM-DD HH:mm' or 'YYYY-MM-DD HH:mm:ss'. otherwise the util function will return 'invalid date'</p>
        <Input value={datestr} onChange={this.onInputChange} />
        <p>offset:
          <Select onChange={this.onOffsetChange} value={offset}>
            {options}
          </Select>
        </p>
        <p>target format: {format}</p>
        <p>result: {toTimezone(datestr, offset, format)}</p>
        <br /><br />
        <h4>Reverse conversion: Conversion from a specific timezone time to utc</h4>
        <label>date string:</label>
        <p style={{ color: 'red' }}>Attention: only date time string needs the conversion, so the string pattern must be 'YYYY-MM-DD HH:mm' or 'YYYY-MM-DD HH:mm:ss'. otherwise the util function will return 'invalid date'</p>
        <Input value={revdatestr} onChange={this.onRevInputChange} />
        <p>offset:
          <Select onChange={this.onRevOffsetChange} value={revoffset}>
            {options}
          </Select>
        </p>
        <p>target format: {revoffset}</p>
        <p>result: {toUtc(revdatestr, revoffset, revformat)}</p>
        {/* <DatePicker onChange={onChange} /> */}
      </Fragment>
    );
  }
}

export default DateTimePicker;