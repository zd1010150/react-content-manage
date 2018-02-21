/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { DragSource } from 'react-dnd';
import classNames from 'classnames/bind';
import { ItemTypes } from './itemType';
import styles from '../DD-demo.less';

const cx = classNames.bind(styles);

const singleSource = {
  beginDrag(props) {
    return {
      fieldId: props.id,
      sourceSectionCode: '',
    };
  },
  canDrag(props) {
    return !(props.isLayoutRequired || props.isSelected);
  },
};
const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});


class singleField extends React.Component {
  render() {
    const {
      connectDragSource, isDragging, id, label, isLayoutRequired, isSelected,
    } = this.props;
    return connectDragSource(<div className={classNames('field', isDragging ? cx('field-btn-dragging') : '')} id={id}> <Button disabled={isLayoutRequired || isSelected} id={id}> {label} </Button></div>);
  }
}

singleField.defaultProps = {
  isLayoutRequired: false,
  isSelected: false,
};
singleField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isLayoutRequired: PropTypes.bool,
  isSelected: PropTypes.bool,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};


export default DragSource(ItemTypes.FIELD, singleSource, collect)(singleField);
