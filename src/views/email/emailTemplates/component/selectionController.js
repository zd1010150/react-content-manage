import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { Link } from 'react-router-dom';
import {Row, Col, Button, Icon, Radio, Tabs, Table, Popconfirm, Modal} from 'antd';
import classNames from 'classnames/bind';
import styles from '../emailTemplates.less';
const cx = classNames.bind(styles);

import ItemTypes from './ItemTypes';
import Enums from 'utils/EnumsManager';
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
export const Radios = ({queryByPaging, setSelectedFolderData, selectedUser, setSharedByVisible, formatMessage}) => (
    <RadioGroup defaultValue={1} onChange={e => {
        //to empty select folder and templates
        setSelectedFolderData({});
        queryByPaging({folderId: undefined});
        e.target.value === 1 ? setSharedByVisible(false) : setSharedByVisible(true)
    }}>
        <Radio className="email-theme-radio" value={1}>{selectedUser.name}</Radio>
        <Radio className="email-theme-radio" value={2}>{ formatMessage({id: 'page.emailTemplates.sharedBy'}) }</Radio>
    </RadioGroup>
);




export const TabSwitcher = ({formatMessage, setPermissionSettingVisible, isPermissionSettingVisible}) => (
    <Row className="pt-lg">
        <Col className="gutter-row field-label" span={12}>
            <button onClick={() => {
                setPermissionSettingVisible(false)
            }} className={!isPermissionSettingVisible ? cx('tab-button-active') : cx('tab-button')}
                    style={{width: '100%'}}>{ formatMessage({id: 'page.emailTemplates.templates'}) }</button>
        </Col>
        <Col className="gutter-row field-value" span={12}>
            <button onClick={() => {
                setPermissionSettingVisible(true)
            }}
                    className={isPermissionSettingVisible ? cx('tab-button-active') : cx('tab-button')}>{ formatMessage({id: 'page.emailTemplates.permissionSetting'}) }</button>
        </Col>
    </Row>
)