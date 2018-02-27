import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../../flow/itemType';
import styles from '../../DD-demo.less';

const cx = classNames.bind(styles);

const fieldTarget = {
  // hover(props) {
  //   // props.setCanDrop(true);
  //   window.requestAnimationFrame(() => props.setCanDrop(true));
  // // },
  drop(props, monitor) {
    const {
      x, y, sectionCode, moveBetweenSection, addFieldToSection, allFields,
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
      moveBetweenSection({ // move between sections
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
      cx('square-over-mask'),
      isOver ? cx('square-over-mask-overing-ok') : '',
    );
    if (isOver) {
      return <div className={maskClasses} />;
    }
    return '';
  }
  render() {
    const { connectDropTarget, classes } = this.props;
    return connectDropTarget(<td className={classNames(cx(classes), cx('square'))} >
      <div>
        { this.props.children }
      </div>
      { this.renderOverLay() }
                             </td>);
  }
}
sectionTD.defaultProps = {
  classes: '',
};
sectionTD.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  allFields: PropTypes.array.isRequired,
  sectionCode: PropTypes.string.isRequired,
  moveBetweenSection: PropTypes.func.isRequired,
  addFieldToSection: PropTypes.func.isRequired,
  classes: PropTypes.string,
  setCanDrop: PropTypes.func.isRequired,
};
export default DropTarget(ItemTypes.FIELD, fieldTarget, collect)(sectionTD);
