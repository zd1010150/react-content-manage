import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';
import { ItemTypes } from './itemType';
import BoxDragPreview from './BoxDragPreview';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};
function getItemStyles(props) {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  let { x, y } = currentOffset;

  if (props.snapToGrid) {
    x -= initialOffset.x;
    y -= initialOffset.y;
    x += initialOffset.x;
    y += initialOffset.y;
  }

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}
const collect = monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  isDragging: monitor.isDragging(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
});
class CustomDragLayer extends Component {
  renderItem(type, item, canDrop) {
    switch (type) {
      case ItemTypes.FIELD:
        return <BoxDragPreview title={item.title} canDrop={canDrop} />;
      default:
        return null;
    }
  }
  render() {
    const {
      item, itemType, isDragging, canDrop,
    } = this.props;

    if (!isDragging) {
      return null;
    }
    console.log(canDrop, 'test1 ------');
    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {this.renderItem(itemType, item, canDrop)}
        </div>
      </div>
    );
  }
}
CustomDragLayer.propTypes = {
  item: PropTypes.object,
  itemType: PropTypes.string,
  isDragging: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool,
  initialOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  currentOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
};
export default DragLayer(collect)(CustomDragLayer);
