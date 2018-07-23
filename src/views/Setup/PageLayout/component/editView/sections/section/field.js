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
    console.log('dandan section field is dragging', props.id);
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
      const {
        id,
        label,
        pageRequired,
        pageReadonly,
        sectionCode,
        isLayoutRequired,
        isSystem,
        setEditField,
      } = this.props;
      const requiredDisable = isSystem || isLayoutRequired;
      const readOnlyDisable = isSystem || isLayoutRequired;
      let optionShowValue = [];
      if (pageReadonly === false && pageRequired === false) {
        optionShowValue = [];
      } else {
        optionShowValue = pageReadonly ? ['readOnly'] : ['required'];
      }
      setEditField({
        isShow: true,
        fieldLabel: label,
        fieldId: id,
        sectionCode,
        requiredDisable,
        readOnlyDisable,
        showValue: optionShowValue,
      });
    }
    render() {
      const {
        id,
        label,
        theme,
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
          { isSystem ? <Icon type="star-o" className={`${theme}-theme-icon pr-sm`} /> : ''}
          { pageReadonly ? <Icon type="lock" className="read-only pr-sm" /> : '' }
          {pageRequired ? <span className="error-msg pr-sm">*</span> : '' }

          {label} :
        </span>
        <span className={classNames(cx('field-sample-value'), 'pl-sm')}>
          Sample {label}
          { this.state.isShowActions ? <div className={cx('field-action')}>{pageRequired ? '' : deleteBtn}{editBtn}</div> : ''}
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
  pageRequired: PropTypes.bool.isRequired,
  pageReadonly: PropTypes.bool.isRequired,
  sectionCode: PropTypes.string.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  deleteFromSection: PropTypes.func.isRequired,
  setEditField: PropTypes.func.isRequired,
};


export default DragSource(ItemTypes.SECTION_FIELD, fieldSource, collect)(field);
