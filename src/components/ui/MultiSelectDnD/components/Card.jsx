import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { Icon } from 'antd';
import classNames from 'classnames/bind';
import styles from '../index.less';
const cx = classNames.bind(styles);

import ItemTypes from './ItemTypes';

const cardSource = {
	canDrag({ isSelected }) {
		return isSelected;
	},
	
	beginDrag({ id, index, setDragging }) {
		// make all selected in dragging status when one of them is dragging
		setDragging();
		return { id, index };
	},

	endDrag({ clearDragging }) {
		clearDragging();
	}
};

const cardTarget = {
	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return;
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

		// Determine mouse position
		const clientOffset = monitor.getClientOffset();

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return;
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return;
		}

		// Time to actually perform the action
		props.moveCard(dragIndex, hoverIndex);

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex;
	},
};

const defaultProps = {
	canEdit: true,
	canDelete: true,
	canDeactivate: true,
};
const propTypes = {
	canEdit: PropTypes.bool.isRequired,
	canDelete: PropTypes.bool.isRequired,
	canDeactivate: PropTypes.bool.isRequired,
	connectDragSource: PropTypes.func.isRequired,
	connectDropTarget: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	isDragging: PropTypes.bool.isRequired,
	id: PropTypes.any.isRequired,
	text: PropTypes.string.isRequired,
	moveCard: PropTypes.func.isRequired,
};

class Card extends Component {
	render() {
		const {
			text,
			isDragging,
			connectDragSource,
			connectDropTarget,
			id,
      index,
			isSelected,
			isOtherDragging,
			theme,
			canEdit,
			canDelete,
			canDeactivate,
			onIconClick,
    } = this.props;
    
    const draggingCls = isDragging || (isOtherDragging && isSelected) ? cx('dragging') : '';
		const selectedCls = isSelected ? cx('selected') : '';
		const themeCls = theme ? cx(theme) : '';
		return connectDragSource(
			connectDropTarget(
        <div
					className={`${cx('card')} ${selectedCls} ${draggingCls} ${themeCls}`}
					data-index={index}
					data-id={id}
					onClick={onIconClick}
        >
					{text}
					<div style={{ float: 'right' }}>
						{canEdit && <Icon className={cx('editBtn')} size="small" type="edit" data-type="edit"/>}
						{canDelete && <Icon size="small" type="delete" data-type="remove"/>}
						{canDeactivate && <Icon className={cx('deactivateBtn')} size="small" type="close-square" data-type="deactivate"/>}
					</div>
        </div>),
		);
	}
}

Card.defaultProps = defaultProps;
Card.propTypes = propTypes;
export default _.flow(
  DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget(ItemTypes.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  }))
)(Card);