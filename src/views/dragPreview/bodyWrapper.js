/* eslint-disable no-mixed-operators,no-plusplus */


import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './itemType';
import styles from '../DD-demo/DD-demo.less';

const cx = classNames.bind(styles);

const bodyWrapperTarget = {
  canDrop(props) {
    return false;
  },
  hover(props) {
    props.setCanDrop(false);
  },
};
const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
});

class bodyWrapper extends React.Component {
  render() {
    const { connectDropTarget, isOver } = this.props;
    return connectDropTarget(
      <div style={{backgroundColor: isOver? 'rgba(200,200,200,.5)' : '#ffff', padding: '50px'}}>
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


export default DropTarget(ItemTypes.FIELD, bodyWrapperTarget, collect)(bodyWrapper);
