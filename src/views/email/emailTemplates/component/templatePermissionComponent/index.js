/* eslint-disable react/prop-types,no-shadow */
import React, { Fragment } from "react";
import { intlShape, injectIntl } from "react-intl";
import { Row, Col, Button, Icon, Radio, Input, Modal, Popconfirm } from "antd";
import {Panel, SelectionPool, SearchPool} from 'components/ui/index';
import classNames from "classnames/bind";
import Enums from 'utils/EnumsManager';
import styles from "../../emailTemplates.less";
import {
    Department,
} from "../../component";
const cx = classNames.bind(styles);

const TemplatePermission = ({
                                teams,
                                setSelectedPermissionTeam,
                                setTeams,
                                teamUsers,
                                isPermissionVisible,
                                setPermissionVisible,
                                addedPermissionDepartment,
                                addedPermissionUser,
                                selectedFolder,
                                isCurrentUser,
                                formatMessage,
                                handleTagClose,
                                save,
                                handleDoubleClickTeam,
                                handleDoubleClickUser
                        }) => {
    return (
        <div className="pl-lg pt-md pb-lg">
            <div>{formatMessage({id: 'page.emailTemplates.permissionTitle'})}</div>
            <SelectionPool
                theme={Enums.ThemeTypes.Email}
                teams={addedPermissionDepartment}
                users={addedPermissionUser}
                onTagClose={handleTagClose}
                closable
                withIcon
            />
            {
                !isPermissionVisible && selectedFolder.id && isCurrentUser() &&
                <Button className="email-theme-btn mt-sm" size="small" onClick={() => {
                    setPermissionVisible(true)
                }}><Icon type="user"/>{ formatMessage({id: 'page.emailTemplates.addNewUser'}) }</Button>
            }
            {
                isPermissionVisible &&
                <Button className="email-theme-btn mt-sm" size="small" onClick={save}><Icon type="save"/>{ formatMessage({id: 'page.emailTemplates.save'}) }</Button>
            }
            {
                isPermissionVisible &&
                <Button className="ml-sm" size="small" onClick={() => {
                    setPermissionVisible(false)
                }}><Icon type="reload"/>{ formatMessage({id: 'page.emailTemplates.cancel'}) }</Button>
            }
            {
                isPermissionVisible && <Row className="pt-lg pb-lg">
                    <Col className="gutter-row field-label" span={12}>
                        <Department
                            canDoubleClick={true}
                            handleDoubleClick={handleDoubleClickTeam}
                            teams={teams}
                            setTeams={setTeams}
                            setSelectedTeam={setSelectedPermissionTeam}
                        />
                    </Col>
                    <Col className="gutter-row field-value" span={12}>
                        <SearchPool
                            theme={Enums.ThemeTypes.Email}
                            title='Click Chart to Choose Department'
                            users={teamUsers}
                            onTagDoubleClick={handleDoubleClickUser}
                        />
                    </Col>
                </Row>
            }
        </div>
    );
};

export default TemplatePermission;
