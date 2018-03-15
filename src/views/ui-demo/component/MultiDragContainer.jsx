import React, { Component } from 'react';
import Container from 'components/ui/MultiSelectDnD/Container';
import { Input, Button, Radio } from 'antd';
const RadioGroup = Radio.Group;

class MultiDnDWrapper extends Component {
  constructor(props) {
		super(props);
		this.state = {
			themes: [
        {
          id: 1,
          value: 'default',
        },
        {
          id: 2,
          value: 'lead',
        },
        {
          id: 3,
          value: 'account',
        },
        {
          id: 4,
          value: 'opport',
        },
        {
          id: 5,
          value: 'report',
        },
      ],
      activeTheme: 'default',
		};
	}

  onChange = result => {
    console.log('====ordered array====');
    console.log(result);
  }

  onRadioChange = e => {
    const { themes } = this.state;
    const theme = themes.find(theme => theme.id == e.target.value);
    if (theme) {
      this.setState({ activeTheme: theme.value });
    }
  }

  render() {
    const data = [
      {
        id: 1,
        text: 'A',
      },
      {
        id: 2,
        text: 'B',
      },
      {
        id: 3,
        text: 'C',
      },
      {
        id: 4,
        text: 'D',
      },
      {
        id: 5,
        text: 'E',
      },
      {
        id: 6,
        text: 'F',
      },
      {
        id: 7,
        text: 'G',
      },
    ];
    const { activeTheme } = this.state;
    return (
      <div>
        <RadioGroup style={{width: '100%'}} defaultValue={1} onChange={this.onRadioChange}>
          <Radio value={1}>Default</Radio>
          <Radio className="lead-theme-radio" value={2}>Lead</Radio>
          <Radio className="account-theme-radio" value={3}>Account</Radio>
          <Radio className="opport-theme-radio" value={4}>Opport</Radio>
          <Radio className="report-theme-radio" value={5}>Report</Radio>
        </RadioGroup>
        <Input size="small" style={{ width: 200, margin: '10px 0' }} laceholder="new value"/>
        <Button size="small">Add new value</Button>
        <Container theme={activeTheme} data={data} onOrderChange={this.onChange}/>
      </div>
    );
  }
}

export default MultiDnDWrapper;