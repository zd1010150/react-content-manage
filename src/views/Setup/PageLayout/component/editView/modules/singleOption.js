/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
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
    return connectDragSource(<div className={classNames('sider-field', (isSelected) ? 'disabled' : '', 'mt-sm', isDragging ? cx('field-btn-dragging') : '')}>
      {formatMessage({ id: `global.ui.detailModules.${code}` })}
                             </div>);
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


export default DragSource(ItemTypes.MODULE, singleSource, collect)(injectIntl(singleOption));
