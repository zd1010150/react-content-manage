/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DragSource } from 'react-dnd';
import classNames from 'classnames/bind';
import { ItemTypes } from '../../../../flow/edit/itemType';
import styles from '../../../../index.less';

const cx = classNames.bind(styles);

const singleSource = {
  beginDrag(props) {
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
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }
  render() {
    const {
      connectDragSource, isDragging, label, isLayoutRequired, isSelected,
    } = this.props;
    return connectDragSource(<div
      className={classNames('sider-field', (isLayoutRequired || isSelected) ? 'disabled' : '', 'mt-sm', isDragging ? cx('field-btn-dragging') : '')}
    >
      {label}
                                  </div>);
  }
}

singleField.defaultProps = {
  isLayoutRequired: false,
  isSelected: false,
};
singleField.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  isLayoutRequired: PropTypes.bool,
  isSelected: PropTypes.bool,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};


export default DragSource(ItemTypes.SECTION_FIELD, singleSource, collect)(singleField);
