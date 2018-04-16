/* eslint-disable react/prop-types,no-shadow */
import React, { Fragment } from "react";
import { intlShape, injectIntl } from "react-intl";
import { Row, Col, Button, Icon, Radio, Input, Modal, Popconfirm } from "antd";
import {Panel, SelectionPool, SearchPool} from 'components/ui/index';
import classNames from "classnames/bind";
import Enums from 'utils/EnumsManager';
import styles from "../../emailTemplates.less";
import {
    Department, User
} from "../../component";
const cx = classNames.bind(styles);

const DepartmentComponent = ({
                                 teams,
                                 setSelectedTeam,
                                 setTeams,
                                 teamUsers,
                                 isSelectTeamDialogVisible,
                                 selectedUser,
                                 getUserFolderData,
                                 getAllUser,
                                 updateUsers,
                                 selectedTeamName,
                                 isDepartmentVisible,
                                 setDepartmentVisible,
                                 setSelectedUser,
                                 formatMessage
                            }) => {
    const actionsRight = <div><Button className="btn-ellipse email-theme-btn" size="small" onClick={() => {
        setDepartmentVisible(!isDepartmentVisible)
    }}><Icon type="edit"/>{ formatMessage({id: 'page.emailTemplates.hideDepartments'}) }</Button></div>;
    return (
        <Panel panelTitle={formatMessage({id: 'page.emailTemplates.emailTemplates'})}
               panelClasses="email-theme-panel" contentClasses="pl-lg pr-lg" actionsRight={actionsRight}>
            {
                isDepartmentVisible && <Row className="pt-lg pb-lg">
                    <Col className="gutter-row field-label" span={12}>
                        <Department
                            teams={teams}
                            setTeams={setTeams}
                            setSelectedTeam={setSelectedTeam}
                        />
                    </Col>
                    <Col className="gutter-row field-value" span={12}>
                        <User
                            teamUsers={teamUsers}
                            isSelectTeamDialogVisible={isSelectTeamDialogVisible}
                            teams={teams}
                            selectedUser={selectedUser}
                            getUserFolderData={getUserFolderData}
                            getAllUser={getAllUser}
                            updateUsers={updateUsers}
                            selectedTeamName={selectedTeamName}
                            setSelectedUser={setSelectedUser}
                        />
                    </Col>
                </Row>
            }
        </Panel>
    );
};

export default DepartmentComponent;
