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
});

class SectionSiderViewWrapper extends React.Component {
  render() {
    const {
      isOver, connectDropTarget,
    } = this.props;
    return connectDropTarget(<div className={classNames(cx('fields'), isOver ? cx('sider-view-can-drop') : '')}>
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
};


export default DropTarget(ItemTypes.SECTION_FIELD, sectionsFieldsTarget, collect)(SectionSiderViewWrapper);
