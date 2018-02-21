/* eslint-disable no-mixed-operators,no-plusplus */


import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import SingleField from './singleField';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './itemType';

const allFieldsTarget = {
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

class allFields extends React.Component {
  buildTable(fields) {
    const trs = [];
    let tds = [];
    let f;
    let pause = false;
    const cols = 10;
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
        tds.push(<td key={f.id}> <SingleField id={f.id} label={f.label} isSelected={f.isSelected} isLayoutRequired={f.is_layout_required} /></td>);
      }
      trs.push(<tr key={i}>{tds}</tr>);
    }
    return <table><tbody>{trs}</tbody></table>;
  }
  render() {
    const { fields, connectDropTarget } = this.props;
    const table = this.buildTable(fields);
    return connectDropTarget(<div className="fields">
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
};


export default DropTarget(ItemTypes.FIELD, allFieldsTarget, collect)(allFields);
