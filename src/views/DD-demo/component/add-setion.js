/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { DragSource } from 'react-dnd';
import classNames from 'classnames/bind';
import { ItemTypes } from './itemType';
import styles from '../DD-demo.less';

const cx = classNames.bind(styles);

const addSectionSource = {
  beginDrag() {
    return {
      sourceSectionCode: '',
    };
  },

};
const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});


class addSection extends React.Component {
  render() {
    const {
      connectDragSource, isDragging,
    } = this.props;
    return connectDragSource(<div className={classNames('field', isDragging ? cx('field-btn-dragging') : '')}> <Button > 新增 Section </Button></div>);
  }
}


addSection.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};


export default DragSource(ItemTypes.SECTION, addSectionSource, collect)(addSection);
