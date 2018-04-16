import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../../../../flow/edit/itemType';
import styles from '../../../../index.less';

const cx = classNames.bind(styles);

const fieldTarget = {
  drop(props, monitor) {
    const {
      x, y, sectionCode, moveFieldsBetweenSection, addFieldToSection, allFields,
    } = props;
    const { fieldId, sourceSectionCode } = monitor.getItem();
    if (_.isEmpty(sourceSectionCode)) { // drag from allfields to these td
      addFieldToSection({
        allFields,
        fieldId,
        sectionCode,
        position: [x, y],
      });
    } else {
      moveFieldsBetweenSection({ // move between sections
        fieldId, allFields, sourceSectionCode, targetSectionCode: sectionCode, position: [x, y],
      });
    }
  },
};
const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
});

class sectionTD extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.isOver && (!this.props.isOver)) { // 进入
      this.props.setCanDrop(true);
    }
  }
  renderOverLay() {
    const { isOver } = this.props;
    const maskClasses = classNames(
      cx('section-field-over-mask'),
      isOver ? cx('section-field-over-mask-overing-ok') : '',
    );
    if (isOver) {
      return <div className={maskClasses} />;
    }
    return '';
  }
  render() {
    const {
      connectDropTarget, classes, isOver, theme,
    } = this.props;
    return connectDropTarget(<td className={cx(classes)}>
      <div className={classNames(isOver ? `${theme}-section-field-hover` : '')}>
        { this.props.children }
      </div>
                             </td>);
  }
}
sectionTD.defaultProps = {
  classes: '',
};
sectionTD.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  theme: PropTypes.string.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  allFields: PropTypes.array.isRequired,
  sectionCode: PropTypes.string.isRequired,
  moveFieldsBetweenSection: PropTypes.func.isRequired,
  addFieldToSection: PropTypes.func.isRequired,
  classes: PropTypes.string,
  setCanDrop: PropTypes.func.isRequired,
};
export default DropTarget(ItemTypes.SECTION_FIELD, fieldTarget, collect)(sectionTD);
