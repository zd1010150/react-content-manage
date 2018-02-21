/* eslint-disable no-shadow */
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Card, Button, Modal } from 'antd';
import { DragSource } from 'react-dnd';
import { ItemTypes } from './itemType';
import Field from './field';
import SectionTd from './section-td';
import styles from '../DD-demo.less';
import { EDIT } from "../flow/operateType";

const { confirm } = Modal;
const cx = classNames.bind(styles);
const sectionSource = {
  beginDrag(props) {
    return {
      sourceSectionCode: props.code,
    };
  },
};
const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

class Section extends React.Component {
  buildTable(props) {
    const {
      allFields, rows, cols, fields, moveBetweenSection, addFieldToSection, code,
    } = props;
    let trs = [],
      table = [];
    for (let i = 0; i < rows; i++) {
      table.push([]);
    }
    _.forEach(fields, (value, key) => {
      const columnIndex = Number(key);
      const rowLenght = value.length;
      for (let i = 0; i < rowLenght; i++) {
        const f = value[i];
        table[i][columnIndex] = (<SectionTd classes={`section-table-col-${cols}`} key={f.id} x={i} y={columnIndex} allFields={allFields} sectionCode={code} moveBetweenSection={moveBetweenSection} addFieldToSection={addFieldToSection}>
          <Field id={f.id} label={f.label} isLayoutRequired={f.is_layout_required} sectionCode={code} />
                                 </SectionTd>);
      }
      for (let j = rowLenght; j < rows; j++) {
        table[j][columnIndex] = <SectionTd classes={`section-table-col-${cols}`} key={j} x={j} y={columnIndex} allFields={allFields} sectionCode={code} moveBetweenSection={moveBetweenSection} addFieldToSection={addFieldToSection} />;
      }
    });
    for (let i = 0; i < rows; i++) {
      trs.push(<tr key={i}>{table[i]}</tr>);
    }

    return <table className={cx('section-table')}><tbody>{trs}</tbody></table>;
  }
  deleteSection() {
    const { deleteSection, code } = this.props;
    confirm({
      title: 'Do you Want to delete this section?',
      content: '',
      onOk() {
        console.log(code);
        debugger;
         deleteSection(code );
      },
    });
  }
  editSection() {
    const { code, label, sequence } = this.props;
    this.props.toggleSectionAddEditDialog({
      isShow: true, code, label, sequence, operate: EDIT,
    });
  }
  render() {
    const {
      label, connectDragSource, isDragging,
    } = this.props;
    const table = this.buildTable(this.props);
    const deleteBtn = <Button type="primary" shape="circle" icon="delete" onClick={this.deleteSection.bind(this)} />;
    const editBtn = <Button type="primary" shape="circle" icon="edit" onClick={this.editSection.bind(this)} />;
    const operation = <div>{deleteBtn}{editBtn}</div>;
    return connectDragSource(<div className={cx('card-wrapper')}><Card title={label} extra={operation} style={{ width: '100%' }} className={classNames(isDragging ? cx('section-dragging') : '')}>
      { table }
    </Card></div>);
  }
}

Section.defaultProps = {
  label: 'Default',
  fields: {},
  rows: 0,
  cols: 0,
  allFields: [],
};
Section.propTypes = {
  code: PropTypes.string.isRequired,
  sequence: PropTypes.number.isRequired,
  rows: PropTypes.number,
  cols: PropTypes.number,
  label: PropTypes.string,
  fields: PropTypes.object,
  moveBetweenSection: PropTypes.func.isRequired,
  addFieldToSection: PropTypes.func.isRequired,
  allFields: PropTypes.array,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  toggleSectionAddEditDialog: PropTypes.func.isRequired,
  deleteSection: PropTypes.func.isRequired,
};


export default DragSource(ItemTypes.SECTION, sectionSource, collect)(Section);
