/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DragSource } from 'react-dnd';
import { Icon, Modal, Checkbox } from 'antd';
import classNames from 'classnames/bind';
import { ItemTypes } from '../../../../flow/edit/itemType';
import styles from '../../../../index.less';

const cx = classNames.bind(styles);
const fieldSource = {
  beginDrag(props) {
    return {
      label: props.label,
      fieldId: props.id,
      sourceSectionCode: props.sectionCode,
      isLayoutRequired: props.isLayoutRequired,
    };
  },
};
const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
});


class field extends React.Component {
  state={
    isShowActions: false,
  }
  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }
    onMouseOver=() => {
      this.setState({
        isShowActions: true,
      });
    }
    onMouseLeave=() => {
      this.setState({
        isShowActions: false,
      });
    }
    deleteField=() => {
      const { deleteFromSection, id, sectionCode } = this.props;
      deleteFromSection({
        fieldId: id,
        sectionCode,
      });
    }
    editField=() => {

    }
    render() {
      const {
        id,
        label,
        theme,
        isLayoutRequired,
        pageRequired,
        pageReadonly,
        isSystem,
        connectDragSource,
        isDragging,
      } = this.props;
      const deleteBtn = <Icon type="delete" onClick={this.deleteField} />;
      const editBtn = <Icon className={`${theme}-theme-icon ml-sm`} type="edit" onClick={this.editField} />;
      return connectDragSource(<div className={classNames(cx('field'), isDragging ? cx('field-btn-dragging') : '')} id={id} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}>

        <span className={classNames(cx('field-label'))}>
          { pageReadonly ? <Icon type="lock" className="read-only" /> : '' }
          {pageRequired ? <span className="error-msg">*</span> : '' }
          {label} :
        </span>
        <span className={classNames(cx('field-sample-value'), 'pl-sm')}>
          Sample {label}
          { this.state.isShowActions ? <div className={cx('field-action')}>{deleteBtn}{editBtn}</div> : ''}
        </span>
      </div>);
    }
}

field.defaultProps = {
  isLayoutRequired: false,
};
field.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  isSystem: PropTypes.bool.isRequired,
  isLayoutRequired: PropTypes.bool,
  theme: PropTypes.string.isRequired,
  pageRequired: PropTypes.bool,
  pageReadonly: PropTypes.bool,
  sectionCode: PropTypes.string.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  deleteFromSection: PropTypes.func.isRequired,
};


export default DragSource(ItemTypes.SECTION_FIELD, fieldSource, collect)(field);
