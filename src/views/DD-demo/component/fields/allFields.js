/* eslint-disable no-mixed-operators,no-plusplus */


import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import SingleField from './singleField';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../../flow/itemType';
import styles from '../../DD-demo.less';

const cx = classNames.bind(styles);
const allFieldsTarget = {
  canDrop(props, monitor) {
    const { isLayoutRequired } = monitor.getItem();
    return !isLayoutRequired;
  },
  // hover(props, monitor) {
  //      // props.setCanDrop(!monitor.getItem().isLayoutRequired);
  //     if(monitor.isOver({shallow: true})){
  //
  //     }
  //     let self = this;
  //     window.requestAnimationFrame(() => props.setCanDrop(!monitor.getItem().isLayoutRequired));
  // },
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

class allFields extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.isOver && (!this.props.isOver)) { // 进入
      this.props.setCanDrop(nextProps.canDrop);
    }
  }
  buildTable(fields, setCanDrop) {
    const trs = [];
    let tds = [];
    let f;
    let pause = false;
    const cols = 6;
    const rows = Math.ceil(fields.length / cols);
    for (let i = 0; i < rows; i++) {
      if (pause) break;
      tds = [];

      for (let j = 0; j < cols; j++) {
        f = fields[cols * i + j];
        if (!f) {
          pause = true;
          break;
        }
        tds.push(<td key={f.id}> <SingleField setCanDrop={setCanDrop} id={f.id} label={f.label} isSelected={f.isSelected} isLayoutRequired={f.is_layout_required} /></td>);
      }
      trs.push(<tr key={i}>{tds}</tr>);
    }
    return <table><tbody>{trs}</tbody></table>;
  }
  render() {
    const {
      fields, connectDropTarget, canDrop, isOver, setCanDrop,
    } = this.props;
    const table = this.buildTable(fields, setCanDrop);
    return connectDropTarget(<div className={classNames(cx('fields'), isOver ? (canDrop ? cx('field-can-drop') : cx('field-cant-drop')) : '')}>
      { table }
                             </div>);
  }
}

allFields.defaultProps = {
  fields: [],
};
allFields.propTypes = {
  fields: PropTypes.array,
  deleteFromSection: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  setCanDrop: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
};


export default DropTarget(ItemTypes.FIELD, allFieldsTarget, collect)(allFields);
