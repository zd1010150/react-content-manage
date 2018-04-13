/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { ItemTypes } from './itemType';

const fieldSource = {
  beginDrag(props) {
    props.setCanDrop(false);
    return {
      title: props.title,
      isLayoutRequired: props.isLayoutRequired,
    };
  },
};
const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
});


class field extends React.Component {
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
      connectDragSource, isDragging, title, isLayoutRequired,
    } = this.props;
    return connectDragSource(<button>{title}</button>);
  }
}


field.propTypes = {
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  isLayoutRequired: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  setCanDrop: PropTypes.func.isRequired,
};


export default DragSource(ItemTypes.FIELD, fieldSource, collect)(field);
