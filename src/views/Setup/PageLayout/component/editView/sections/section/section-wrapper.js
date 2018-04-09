/* eslint-disable no-mixed-operators,no-plusplus */


import React from 'react';
import _ from 'lodash';
import { PAGE_ACTION } from 'config/app.config';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../../../../flow/edit/itemType';
import styles from '../../../../index.less';


const cx = classNames.bind(styles);
const sectionWrapperTarget = {
  drop(props, monitor) {
    const { sourceSectionCode } = monitor.getItem();
    const { sequence, toggleSectionAddEditDialog, moveSection } = props;
    if (_.isEmpty(sourceSectionCode)) { // 如果为空就是增加
      toggleSectionAddEditDialog({
        isShow: true, sequence, operate: PAGE_ACTION.ADD, code: '', label: '', cols: 2,
      });
    } else { // 否则就是移动
      moveSection({ sourceSectionCode, sequence });
    }
  },
};
const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
});

class sectionWrapper extends React.Component {
  render() {
    const {
      connectDropTarget, isOver, classes, theme,
    } = this.props;
    return connectDropTarget(<div className={classNames(cx('section-wrapper'), isOver ? cx(`${theme}-section-wrapper-hover`) : '', classes)} >
      { this.props.children }
    </div>);
  }
}
sectionWrapper.defaultProps = {
  classes: '',
};

sectionWrapper.propTypes = {
  isOver: PropTypes.bool.isRequired,
  theme: PropTypes.string.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  sequence: PropTypes.number.isRequired,
  toggleSectionAddEditDialog: PropTypes.func.isRequired,
  moveSection: PropTypes.func.isRequired,
  classes: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};


export default DropTarget(ItemTypes.SECTION, sectionWrapperTarget, collect)(sectionWrapper);
