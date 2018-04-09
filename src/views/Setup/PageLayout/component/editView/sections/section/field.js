/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DragSource } from 'react-dnd';
import classNames from 'classnames/bind';
import { ItemTypes } from '../../../../flow/edit/itemType';
import styles from '../../../../index.less';

const cx = classNames.bind(styles);
const fieldSource = {
  beginDrag(props) {
    return {
      label: props.label,
      fieldId: props.id,
      sourceSectionCode: props.sectionCode,
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
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }
  render() {
    const {
      id,
      label,
      isLayoutRequired,
      pageRequired,
      pageReadonly,
      isSystem,
      connectDragSource,
      isDragging,
    } = this.props;
    return connectDragSource(<div className={classNames('field', isDragging ? cx('field-btn-dragging') : '')} id={id}>
      {isLayoutRequired ? <span>*</span> : '' }
      {label}
    </div>);
  }
}

field.defaultProps = {
  isLayoutRequired: false,
};
field.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  isSystem: PropTypes.bool.isRequired,
  isLayoutRequired: PropTypes.bool,
  pageRequired: PropTypes.bool,
  pageReadonly: PropTypes.bool,
  sectionCode: PropTypes.string.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
};


export default DragSource(ItemTypes.FIELD, fieldSource, collect)(field);
