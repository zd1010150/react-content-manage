import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import {NavLink} from 'react-router-dom';
import {Row, Col, Button, Icon, Radio, Tabs, Table, Popconfirm, Modal} from 'antd';
import classNames from 'classnames/bind';
import styles from '../emailTemplates.less';
const cx = classNames.bind(styles);


export const EmailTemplateButton = ({children, className, size, onClick})=> {
    return <Button className={className} size={size} onClick={onClick}>{children}</Button>
}

export const EmailTemplateIcon = ({className, type, onClick})=> {
    return <Icon type={type} className={className} onClick={onClick}/>
}

export const ActionButtonGroup = ({saveEditFolder, setEditFolderViewVisible, formatMessage}) => {
    return <div className="pt-md pl-md pb-md">
        <Button className="email-theme-btn mr-md" onClick={saveEditFolder}><Icon type="save"/>{ formatMessage({id: 'page.emailTemplates.save'}) }</Button>
        <Button onClick={() => {
            setEditFolderViewVisible(false)
        }}><Icon type="close"/>{ formatMessage({id: 'page.emailTemplates.cancel'}) }</Button>
    </div>
}