/* eslint-disable no-mixed-operators,no-plusplus */


import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../../../flow/edit/itemType';
import styles from '../../../index.less';

const cx = classNames.bind(styles);
const moduleWrapperTarget = {
  drop(props, monitor) {
    const { code, sourceCode } = monitor.getItem();
    const { addModule, sortModules, sequence } = props;
    if (_.isEmpty(sourceCode)) { // 新增
      addModule({ code, sequence });
    } else { // 移动
      sortModules({ code: sourceCode, sequence });
    }
  },
};
const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
});

class ModuleWrapper extends React.Component {
  render() {
    const {
      connectDropTarget, isOver, classes, theme,
    } = this.props;
    return connectDropTarget(<div className={classNames(cx('module-wrapper'), isOver ? `${theme}-theme-panel-hover` : '', classes)} >
      { this.props.children }
                             </div>);
  }
}
ModuleWrapper.defaultProps = {
  classes: '',
};

ModuleWrapper.propTypes = {
  isOver: PropTypes.bool.isRequired,
  theme: PropTypes.string.isRequired,
  sequence: PropTypes.number.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  sortModules: PropTypes.func.isRequired,
  addModule: PropTypes.func.isRequired,
  classes: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};


export default DropTarget(ItemTypes.MODULE, moduleWrapperTarget, collect)(ModuleWrapper);
