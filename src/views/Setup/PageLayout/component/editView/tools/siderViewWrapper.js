import React from 'react';
import _ from 'lodash';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../../../flow/edit/itemType';
import styles from '../../../index.less';

const cx = classNames.bind(styles);

const toolFieldsTarget = {
  drop(props, monitor) {
    const { deleteTool } = props;
    const { sourceCode } = monitor.getItem();
    if (!_.isEmpty(sourceCode)) {
      deleteTool({ code: sourceCode });
    }
  },
};
const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
});

class ToolSiderViewWrapper extends React.Component {
  render() {
    const {
      isOver, connectDropTarget, theme,
    } = this.props;
    return connectDropTarget(<div className={classNames(cx('fields'), 'pl-lg', 'pr-lg', 'pt-lg', 'pb-lg', isOver ? `${theme}-sider-view-can-drop` : '')}>
      {
            this.props.children
        }
                             </div>);
  }
}
ToolSiderViewWrapper.propTypes = {
  deleteTool: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  theme: PropTypes.string.isRequired,
};


export default DropTarget(ItemTypes.TOOL, toolFieldsTarget, collect)(ToolSiderViewWrapper);
