/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { Button } from 'antd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DragSource } from 'react-dnd';
import classNames from 'classnames/bind';
import { ItemTypes } from '../../../flow/edit/itemType';
import styles from '../../../index.less';

const cx = classNames.bind(styles);

const spec = {
  beginDrag(props) {
    return {
      code: props.code,
      sourceCode: props.code,
    };
  },
};
const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
});


class Tool extends React.Component {
  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }
  render() {
    const {
      connectDragSource, isDragging, intl, code, theme,
    } = this.props;
    const { formatMessage } = intl;
    return connectDragSource(<div className="module-panel">
      <Button size="small" className={classNames('mr-sm', isDragging ? cx('field-btn-dragging') : '')}>

        {formatMessage({ id: `global.ui.detailTools.${code}` })}
      </Button>
    </div>);
  }
}


Tool.propTypes = {
  intl: intlShape.isRequired,
  theme: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};


export default DragSource(ItemTypes.TOOL, spec, collect)(injectIntl(Tool));

