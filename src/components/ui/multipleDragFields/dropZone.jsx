import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import Card from './index';

const defaultProps = {
  data: [
    {
      id: 1,
      value: 'card1',
    },
    {
      id: 2,
      value: 'card2',
    },
    {
      id: 3,
      value: 'card3',
    },
  ],
};
/**
* Specifies which props to inject into your component.
*/
/**
* Specifies the drag source contract.
* Only `beginDrag` function is required.
*/
let gPos = {};
const dropContract = {
  drop(props, monitor, component) {
    console.log(`on drop -> `);
    console.dir(props);
    // set global offset of current target drop pos in order to compute the order of data later
    gPos = monitor.getDifferenceFromInitialOffset();
  }
};

function collect(connect, monitor) {
  console.log(gPos);
  // reorder 
  return {
    connectDropTarget: connect.dropTarget(),
    isOverInstance: monitor.isOver(),
  };
}

class DropZone extends Component {
  render() {
    const { isOverInstance, connectDropTarget, data } = this.props;
    return connectDropTarget(
      <div style={{ height: 250, width: 250, background: '#09c' }}>
        {isOverInstance ? <span>Hovering</span> : null}

        {data ? data.map(card => {
          return <Card key={card.id} record={card} />
        }) : null}

      </div>
    );
  }
}

DropZone.defaultProps = defaultProps;
export default DropTarget('card', dropContract, collect, {test:'abc'})(DropZone);