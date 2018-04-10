/* eslint-disable no-shadow */
import React from 'react';
import _ from 'lodash';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { DropTarget } from 'react-dnd';

import styles from '../../../index.less';
import { ItemTypes } from '../../../flow/edit/itemType';

const cx = classNames.bind(styles);

const moduleWrapperTarget = {
  drop(props, monitor) {
    const { code, sourceCode } = monitor.getItem();
    const shallow = monitor.isOver({ shallow: true });
    const { addModule, selectedModules } = props;
    if (shallow && _.isEmpty(sourceCode)) { // 新增
      addModule({ code, sequence: selectedModules.length });
    }
  },
};
const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
});
class ModulesWrapper extends React.Component {
  render() {
    const {
      isOver,
      connectDropTarget,
    } = this.props;
    return connectDropTarget(<div className={classNames(cx('modules-wrapper'), isOver ? cx('modules-wrapper-hover') : '')}>
      {
                this.props.children
            }

                             </div>);
  }
}
ModulesWrapper.propTypes = {
  selectedModules: PropTypes.array.isRequired,
  addModule: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};


export default DropTarget(ItemTypes.MODULE, moduleWrapperTarget, collect)(ModulesWrapper);
