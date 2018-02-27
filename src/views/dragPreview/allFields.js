/* eslint-disable no-mixed-operators,no-plusplus */


import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './itemType';
import styles from '../DD-demo/DD-demo.less';

const cx = classNames.bind(styles);
const allFieldsTarget = {
  canDrop(props, monitor) {
    return !monitor.getItem().isLayoutRequired;
  },
  hover(props, monitor) {
    props.setCanDrop(!monitor.getItem().isLayoutRequired);
  },
};
const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
});

class allFields extends React.Component {
  render() {
    const { connectDropTarget, canDrop, isOver } = this.props;
    return connectDropTarget(<div className={classNames(cx('fields'), isOver ? (canDrop ? cx('field-can-drop') : cx('field-cant-drop')) : '')}>
      this is test allfields
                             </div>);
  }
}


allFields.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  setCanDrop: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool,
};


export default DropTarget(ItemTypes.FIELD, allFieldsTarget, collect)(allFields);
