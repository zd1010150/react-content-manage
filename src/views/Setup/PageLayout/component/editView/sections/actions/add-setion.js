/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import { DragSource } from 'react-dnd';
import classNames from 'classnames/bind';
import { ItemTypes } from '../../../../flow/edit/itemType';
import styles from '../../../../index.less';

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
      connectDragSource, isDragging, intl, theme,
    } = this.props;
    const { formatMessage } = intl;
    return connectDragSource(<div className={classNames('sider-field',`${theme}-sider-field`, 'mt-sm', isDragging ? cx('field-btn-dragging') : '')}>

        { formatMessage({ id: 'global.ui.button.addBtn' }, { actionType: formatMessage({ id: 'page.layouts.section'}) })}
    </div>);
  }
}


addSection.propTypes = {
  intl: intlShape.isRequired,
    theme: PropTypes.string.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};


export default DragSource(ItemTypes.SECTION, addSectionSource, collect)(injectIntl(addSection));
