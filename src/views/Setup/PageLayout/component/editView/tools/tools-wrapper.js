/* eslint-disable no-shadow */
import React from 'react';
import _ from 'lodash';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { DropTarget } from 'react-dnd';

import styles from '../../../index.less';
import { ItemTypes } from '../../../flow/edit/itemType';

const cx = classNames.bind(styles);

const toolsWrapperTarget = {
  drop(props, monitor) {
    const { code, sourceCode } = monitor.getItem();
    const shallow = monitor.isOver({ shallow: true });
    const { addTool, selectedTools } = props;
    if (shallow && _.isEmpty(sourceCode)) { // 新增
      addTool({ code, sequence: selectedTools.length });
    }
  },
};
const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
});
class ToolsWrapper extends React.Component {
  render() {
    const {
      isOver,
      connectDropTarget,
    } = this.props;
    return connectDropTarget(<div className={classNames(cx('tools-wrapper'), 'pt-lg', 'pl-lg', 'pr-lg', isOver ? cx('tools-wrapper-hover') : '')}>
      { this.props.children }
                             </div>);
  }
}
ToolsWrapper.propTypes = {
  selectedTools: PropTypes.array.isRequired,
  addTool: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};


export default DropTarget(ItemTypes.TOOL, toolsWrapperTarget, collect)(ToolsWrapper);
