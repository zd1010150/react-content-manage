/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import classNames from 'classnames/bind';
import { ItemTypes } from './itemType';
import styles from '../DD-demo.less';

const cx = classNames.bind(styles);


const fieldSource = {
  beginDrag(props) {
    return {
      fieldId: props.id,
      sourceSectionCode: props.sectionCode,
      isLayoutRequired: props.isLayoutRequired,
    };
  },
};
const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});


class field extends React.Component {
  render() {
    const {
      id, label, isLayoutRequired, connectDragSource, isDragging,
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
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isLayoutRequired: PropTypes.bool,
  sectionCode: PropTypes.string.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
};


export default DragSource(ItemTypes.FIELD, fieldSource, collect)(field);
