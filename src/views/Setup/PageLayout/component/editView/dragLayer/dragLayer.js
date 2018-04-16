import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';
import { ItemTypes } from '../../../flow/edit/itemType';
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

  const transform = `translate(${x}px, ${y + 2}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}
const collect = monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  isDragging: monitor.isDragging(),
  initialOffset: monitor.getInitialClientOffset(),
  currentOffset: monitor.getClientOffset(),
});
class CustomDragLayer extends Component {
  renderItem(type, item, canDrop, theme, intl) {
    const { formatMessage } = intl;
    switch (type) {
      case ItemTypes.MODULE:
        return <BoxDragPreview title={formatMessage({ id: `global.ui.detailModules.${item.code}` })} canDrop={canDrop} type={ItemTypes.MODULE} theme={theme} />;
      case ItemTypes.SECTION_FIELD:
        return <BoxDragPreview title={item.label} canDrop={canDrop} type={ItemTypes.SECTION_FIELD} theme={theme} />;
      case ItemTypes.TOOL:
        return <BoxDragPreview title={formatMessage({ id: `global.ui.detailTools.${item.code}` })} canDrop={canDrop} type={ItemTypes.TOOL} theme={theme} />;
      default:
        return null;
    }
  }
  render() {
    const {
      item, itemType, isDragging, canDrop, theme, intl,
    } = this.props;

    if (!isDragging) {
      return null;
    }
    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {this.renderItem(itemType, item, canDrop, theme, intl)}
        </div>
      </div>
    );
  }
}
CustomDragLayer.propTypes = {
  item: PropTypes.object,
  itemType: PropTypes.string,
  theme: PropTypes.string,
  intl: PropTypes.object.isRequired,
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
