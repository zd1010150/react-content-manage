import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import {NavLink} from 'react-router-dom';
import {Row, Col, Button, Icon, Radio, Tabs, Table, Popconfirm, Modal} from 'antd';
import { Permission, Unauthentication } from 'components/page/index';
import PERMISSIONS from 'config/app-permission.config';
import classNames from 'classnames/bind';
import styles from '../emailTemplates.less';
const cx = classNames.bind(styles);

const Templates = ({templates, pagination, columns, formatMessage, isSharedByVisible, isCurrentUser, selectedUser, setPermissionSettingVisible, fetchNewTemplateData}) => (
    <Fragment>
        {!isSharedByVisible && isCurrentUser() &&
        <Permission permission={PERMISSIONS.SETUP_EMAILCOMMUNICATIONS_EMAILTEMPLATES_ADD}>
            <div style={{textAlign: 'right', height: 30, margin: '10px 15px'}}>
                <NavLink to='/setup/email/templates-creation'>
                    <Button className="btn-ellipse email-theme-btn" size="small" onClick={() => {
                        fetchNewTemplateData(()=>{
                            setPermissionSettingVisible(false)
                        });
                    }}><Icon type="plus"/>
                        { formatMessage({id: 'page.emailTemplates.addTemplate'}) }
                    </Button>
                </NavLink>

            </div>
        </Permission>
        }
        <Table dataSource={templates} columns={columns} pagination={pagination} rowKey="id"/>
    </Fragment>
)

export default Templates