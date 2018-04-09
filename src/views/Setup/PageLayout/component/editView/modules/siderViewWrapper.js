import React from 'react';
import _ from 'lodash';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../../../flow/edit/itemType';
import styles from '../../../index.less';

const cx = classNames.bind(styles);

const moduleFieldsTarget = {
  drop(props, monitor) {
    console.log('module drop, source code:', monitor.getItem().sourceCode);
    const { deleteModule } = props;
    const { sourceCode } = monitor.getItem();
    if (!_.isEmpty(sourceCode)) {
      deleteModule({ code: sourceCode });
    }
  },
};
const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
});

class moduleSiderViewWrapper extends React.Component {
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
moduleSiderViewWrapper.propTypes = {
  deleteModule: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
};


export default DropTarget(ItemTypes.MODULE, moduleFieldsTarget, collect)(moduleSiderViewWrapper);
