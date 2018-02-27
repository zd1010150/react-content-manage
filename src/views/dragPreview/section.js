/* eslint-disable no-mixed-operators,no-plusplus */


import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './itemType';
import styles from '../DD-demo/DD-demo.less';

const cx = classNames.bind(styles);
const sectionTarget = {
  canDrop() {
    return true;
  },
  hover(props) {
    props.setCanDrop(true);
  },
};
const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
});

class section extends React.Component {
  render() {
    const { connectDropTarget, canDrop, isOver } = this.props;
    return connectDropTarget(<div className={classNames(cx('fields'), isOver ? (canDrop ? cx('field-can-drop') : cx('field-cant-drop')) : '')}>
            this is section
                             </div>);
  }
}
section.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  setCanDrop: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
};


export default DropTarget(ItemTypes.FIELD, sectionTarget, collect)(section);
