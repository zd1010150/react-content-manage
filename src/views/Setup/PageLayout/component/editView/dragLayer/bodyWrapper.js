/* eslint-disable no-mixed-operators,no-plusplus */


import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../../../flow/edit/itemType';

const bodyWrapperTarget = {
  canDrop(props) {
    return false;
  },

};
const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
});

class bodyWrapper extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.isOver && (!this.props.isOver)) { // 进入
      this.props.setCanDrop(false);
    }
  }
  render() {
    const { connectDropTarget, isOver } = this.props;
    return connectDropTarget(
        <div className="drag-body-wrapper">
          {this.props.children}
        </div>
    );
  }
}


bodyWrapper.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  setCanDrop: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
};


export default DropTarget([...ItemTypes], bodyWrapperTarget, collect)(bodyWrapper);
