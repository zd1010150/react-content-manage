import React from 'react';
import _ from 'lodash';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../../../../flow/edit/itemType';
import styles from '../../../../index.less';

const cx = classNames.bind(styles);

const sectionsFieldsTarget = {
  canDrop(props, monitor) {
    const { isLayoutRequired } = monitor.getItem();
    return !isLayoutRequired;
  },
  drop(props, monitor) {
    const { deleteFromSection } = props;
    const { fieldId, sourceSectionCode } = monitor.getItem();
    if (!_.isEmpty(sourceSectionCode)) {
      deleteFromSection({ fieldId, sectionCode: sourceSectionCode });
    }
  },
};
const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
});

class SectionSiderViewWrapper extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.isOver && (!this.props.isOver)) { // 进入
      this.props.setCanDrop(nextProps.canDrop);
    }
    if ((!nextProps.isOver) && (this.props.isOver)) { // 退出
      this.props.setCanDrop(true);
    }
  }
  render() {
    const {
      isOver, connectDropTarget, canDrop, theme,
    } = this.props;
    return connectDropTarget(<div className={classNames(cx('fields'), 'pl-lg', 'pr-lg', isOver ? (canDrop ? `${theme}-sider-view-can-drop` : 'sider-view-cant-drop') : '')}>
      {
            this.props.children
        }
                             </div>);
  }
}
SectionSiderViewWrapper.propTypes = {
  deleteFromSection: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  theme: PropTypes.string.isRequired,
};


export default DropTarget(ItemTypes.SECTION_FIELD, sectionsFieldsTarget, collect)(SectionSiderViewWrapper);
