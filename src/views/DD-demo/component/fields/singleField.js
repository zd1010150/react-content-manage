/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DragSource } from 'react-dnd';
import classNames from 'classnames/bind';
import { ItemTypes } from '../../flow/itemType';
import styles from '../../DD-demo.less';

const cx = classNames.bind(styles);

const singleSource = {
  beginDrag(props) {
    props.setCanDrop(false);
    return {
      label: props.label,
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
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
});


class singleField extends React.Component {
  componentDidMount() {
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true,
    });
  }
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
  connectDragPreview: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  setCanDrop: PropTypes.func.isRequired,
};


export default DragSource(ItemTypes.FIELD, singleSource, collect)(singleField);
