import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { Link } from 'react-router-dom';
import { Icon, Col, Input } from 'antd';
import classNames from 'classnames/bind';
import styles from '../emailTemplates.less';
const cx = classNames.bind(styles);

import ItemTypes from './ItemTypes';
import Enums from 'utils/EnumsManager';

const defaultProps = {
    canEdit: true,
    canDelete: true,
    canDeactivate: true,
    isDragging: false,
    isSelected: false,
};
const propTypes = {
    canEdit: PropTypes.bool.isRequired,
    canDelete: PropTypes.bool.isRequired,
    canDeactivate: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    moveCard: PropTypes.func.isRequired,
    isOtherDragging: PropTypes.bool.isRequired,
    clearDragging: PropTypes.func.isRequired,
    setDragging: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    editFolderName: PropTypes.func.isRequired
};

const cardSource = {
    canDrag({ isSelected }) {
        return isSelected;
    },

    beginDrag({ id, index, setDragging }) {
        // set all selected cards in dragging status when one of them is dragging
        setDragging();
        return { id, index };
    },

    endDrag({ clearDragging }) {
        clearDragging();
    }
};

const cardTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // // Dragging downwards
        // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        //     return;
        // }
        //
        // // Dragging upwards
        // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        //     return;
        // }

        // Time to actually perform the action
        props.moveCard(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    },
};

class Card extends Component {
    render() {
        const {
            isDragging,
            isOver,
            connectDragSource,
            connectDropTarget,
            id,
            index,
            isSelected,
            isOtherDragging,
            theme,
            canEdit,
            canDelete,
            canDeactivate,
            onIconClick,
            item,
            deleteEditFolderData,
            editFolderName
        } = this.props;

        const { Edit, Delete, Deactivate } = Enums.FieldOperationTypes;
        return connectDragSource(
            connectDropTarget(
                <div>
                    {/*<div onClick={()=>{deleteEditFolderData(item.id)}}>*/}
                    <div>
                        <Icon
                            data-index={index}
                            data-id={id}
                            className={cx(['folder-icon', 'folder-move'])}
                            type="folder"
                        />
                        <span onClick={()=>{deleteEditFolderData(item.id)}} className="pl-sm"><Icon className={cx('delete-icon')} type="delete"/></span>
                    </div>
                    {isOver &&
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 5,
                        height: '90%',
                        width: '3px',
                        zIndex: 1,
                        opacity: 1,
                        backgroundColor: '#FB8C00',
                    }} />
                    }
                    <Input onChange={(e)=>{editFolderName(e, item)}} size="small" disabled={!canEdit} addonAfter={!canEdit && <Icon onClick={() => {setEditFolderData(item)}} type="edit" />} defaultValue={item.name} />
                </div>),
        );
    }
}

/**
 *
 * @param setSelectedFolderData
 * @param selectedFolder
 * @param userFolders
 * @param sharedFolders
 * @param isSharedByVisible
 * @returns {XML}
 * @constructor
 */
export const Folders = ({formatMessage, setSelectedFolderData, selectedFolder, userFolders, sharedFolders, isSharedByVisible, queryByPaging}) => {
    const folders = isSharedByVisible ? sharedFolders : userFolders;
    return <div className={cx('folders')}>
        {folders.map((item, index) =>
            <div key={index} className={cx('folder')} style={{marginLeft: index > 0 ? 40 : 10}}>
                <input onChange={() => {
                    setSelectedFolderData(item);
                    queryByPaging({folderId: item.id})
                }} checked={selectedFolder && selectedFolder.id === item.id} id={index} value={item} type="radio"
                       style={{visibility: 'hidden'}}/>
                <label htmlFor={index}>
                    <div>
                        {selectedFolder && selectedFolder.id === item.id ?
                            <Icon className={cx('folder-icon')} type="folder-open"/> :
                            <Icon className={cx('folder-icon')} type="folder"/>}
                        {item.shared_to_users && item.shared_to_teams && !isSharedByVisible && (item.shared_to_users.length > 0 || item.shared_to_teams.length > 0) &&
                        <Icon type="export"/>}
                    </div>
                    <div>{item.name}</div>
                    {isSharedByVisible && item.belonged_user &&
                    <div>{formatMessage({id: 'page.emailTemplates.by'}) + item.belonged_user.name}</div>}
                </label>
            </div>
        )}
    </div>
}

Card.defaultProps = defaultProps;
Card.propTypes = propTypes;
export default _.flow(
    DragSource(ItemTypes.FOLDER, cardSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    })),
    DropTarget(ItemTypes.FOLDER, cardTarget, (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }))
)(Card);