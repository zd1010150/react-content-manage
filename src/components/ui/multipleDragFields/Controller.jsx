import React, { Component } from 'react';
import Container from './Container';
import { Input, Button } from 'antd';
class Controller extends Component {
  onChange = result => {
    console.log('====ordered array====');
    console.log(result);
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
    return (
      <div >
        <Input placeholder="new value"/>
        <Button>Add</Button>
        <Container data={data} onOrderChange={this.onChange}/>
      </div>
    );
  }
}

export default Controller;