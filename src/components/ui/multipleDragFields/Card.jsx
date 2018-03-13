import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'

const style = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white',
	cursor: 'move',
}

const cardSource = {
	beginDrag(props) {
		return {
			id: props.id,
      index: props.index,
      start: props.startIndex,
      end: props.endIndex,
		}
	},
}

const cardTarget = {
	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const start = props.startIndex;
    const end = props.endIndex;

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

		// Determine mouse position
		const clientOffset = monitor.getClientOffset()

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return
		}

		// Time to actually perform the action
		props.moveCard(dragIndex, hoverIndex, start, end);

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex;
  },
  
  drop(props, monitor, component) {
    props.clearDragging();
  },

}

class Card extends Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		index: PropTypes.number.isRequired,
		isDragging: PropTypes.bool.isRequired,
		id: PropTypes.any.isRequired,
		text: PropTypes.string.isRequired,
		moveCard: PropTypes.func.isRequired,
	}

	render() {
		const {
			text,
			isDragging,
			connectDragSource,
      connectDropTarget,
      index,
      startIndex,
      endIndex,
      isOtherDragging
    } = this.props;
    
    const draggingTogether = isOtherDragging && (index <= endIndex && index >= startIndex) ? true : false;
    const opacity = isDragging || draggingTogether ? .5 : 1;
    const backgroundColor = (index <= endIndex && index >= startIndex) ? '#09c' : 'white';
    console.log(index);
		return connectDragSource(
			connectDropTarget(
        <div
          data-id={index}
          style={{ ...style, opacity, backgroundColor }}>
          {text}
        </div>),
		);
	}
}

//
// const isDraggingWithOthers = monitor => {
//   if (monitor.getItem() === null) {
//     return false;
//   }
//   const { index, start, end } = monitor.getItem();
//   if (index >= start && index <= end) {
//     return true;
//   }
//   return false;
// };

export default _.flow(
  DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget(ItemTypes.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  }))
)(Card);