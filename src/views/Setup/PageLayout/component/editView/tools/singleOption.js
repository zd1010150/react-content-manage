/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DragSource } from 'react-dnd';
import classNames from 'classnames/bind';
import { ItemTypes } from '../../../flow/edit/itemType';
import styles from '../../../index.less';

const cx = classNames.bind(styles);

const singleSource = {
  beginDrag(props) {
    return {
      code: props.code,
    };
  },

};
const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
});


class singleOption extends React.Component {
  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }
  render() {
    const {
      connectDragSource, isDragging, code, isSelected,
    } = this.props;
    const { formatMessage } = this.props.intl;
    return connectDragSource(<div><Button
      size="small"
      className={classNames('btn-ellipse', 'mt-sm', cx('field-btn'), isDragging ? cx('field-btn-dragging') : '')}
      disabled={isSelected}
    >
      {formatMessage({ id: `global.ui.detailTools.${code}` })}
                             </Button></div>);
  }
}


singleOption.propTypes = {
  intl: intlShape.isRequired,
  code: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};


export default DragSource(ItemTypes.TOOL, singleSource, collect)(injectIntl(singleOption));
