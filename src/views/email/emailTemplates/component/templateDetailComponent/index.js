/* eslint-disable react/prop-types,no-shadow */
import React, {Fragment} from "react";
import {intlShape, injectIntl} from "react-intl";
import {Row, Col, Button, Icon, Radio, Input, Modal, Popconfirm} from "antd";
import {Panel} from "components/ui/index";
import classNames from "classnames/bind";
import Folder from "../folder";
import styles from "../../emailTemplates.less";
import {
    Folders,
    Radios,
    TabSwitcher,
    Templates,
    EmailTemplateButton,
    EmailTemplateIcon
} from "../../component";
import { Permission, Unauthentication } from 'components/page/index';
import PERMISSIONS from 'config/app-permission.config';
const cx = classNames.bind(styles);

const TemplateDetail = ({
                            setEditFolderViewVisible,
                            setPermissionSettingVisible,
                            isPermissionSettingVisible,
                            isSharedByVisible,
                            templates,
                            templatesDataTablePagination,
                            queryByPaging,
                            setSharedByVisible,
                            setSelectedFolderData,
                            selectedFolder,
                            userFolders,
                            sharedFolders,
                            selectedUser,
                            deleteTemplate,
                            fetchTemplateData,
                            fetchNewTemplateData,
                            history,
                            editTemplate,
                            formatMessage,
                            isCurrentUser,
                            showModal,
                            visible,
                            handleOk,
                            handleCancel,
                            EmailTemplatePermission
                        }) => {
    const actionsLeft = (
        <Radios
            queryByPaging={queryByPaging}
            setSelectedFolderData={setSelectedFolderData}
            selectedUser={selectedUser}
            setSharedByVisible={setSharedByVisible}
            formatMessage={formatMessage}
        />
    );
    const actionsRight = (
        <Permission permission={PERMISSIONS.SETUP_EMAILCOMMUNICATIONS_EMAILTEMPLATES_EDITMYFOLDERS}>
            <EmailTemplateButton
                className="btn-ellipse email-theme-btn"
                size="small"
                onClick={() => {
                    setEditFolderViewVisible(true);
                }}
            >
                <EmailTemplateIcon type="edit"/>
                {formatMessage({id: "page.emailTemplates.editFolders"})}
            </EmailTemplateButton>
        </Permission>
    );
    const pagination = {
        defaultCurrent: templatesDataTablePagination.currentPage,
        current: templatesDataTablePagination.currentPage,
        defaultPageSize: templatesDataTablePagination.perPage,
        pageSize: templatesDataTablePagination.perPage,
        total: templatesDataTablePagination.total,
        size: "small",
        onChange(page, pageSize) {
            queryByPaging({pageSize, page});
        }
    };

    // 如果是当前用户，并且是在自己的文件夹的tab下，则可以编辑删除；
    // 如果是当前用户，并且是分享的文件夹tab下，则可以看
    // 其他情况，一律不能编辑，也不能看
    const columns = [
        {
            key: "id",
            render: record =>
                <span>
          {isCurrentUser() && !isSharedByVisible &&
          <Permission permission={PERMISSIONS.SETUP_EMAILCOMMUNICATIONS_EMAILTEMPLATES_UPDATE}>
              <EmailTemplateIcon
                  type="edit"
                  onClick={() => {
                      fetchTemplateData({
                          templateId: record.id,
                          cb: history.push("template-edit/" + record.id)
                      });
                  }}
              />
          </Permission>}
                {(isCurrentUser() && isSharedByVisible) &&
                <Permission permission={PERMISSIONS.SETUP_EMAILCOMMUNICATIONS_EMAILTEMPLATES_VIEW}>
                    <EmailTemplateIcon
                        type="eye-o"
                        onClick={() => {
                            fetchTemplateData({
                                templateId: record.id,
                                cb: () => showModal(),
                                cbErr: () => alert("no access")
                            });
                        }}
                    />
                </Permission>}

                {isCurrentUser() && !isSharedByVisible &&
                <Permission permission={PERMISSIONS.SETUP_EMAILCOMMUNICATIONS_EMAILTEMPLATES_DELETE}>
                    <Popconfirm
                        title="Are you sure to delete it?"
                        onConfirm={() =>
                            deleteTemplate({
                                templateId: record.id,
                                folderId: selectedFolder.id
                            })}
                    >
                        <EmailTemplateIcon type="delete" className="danger pl-lg"/>
                    </Popconfirm>
                </Permission>}
        </span>
        },
        {
            title: formatMessage({id: "page.emailTemplates.templateName"}),
            dataIndex: "name",
            key: "name"
        },
        {
            title: formatMessage({id: "page.emailTemplates.createdDate"}),
            dataIndex: "created_at",
            key: "created_at"
        },
        {
            title: formatMessage({id: "page.emailTemplates.templateModifiedDate"}),
            dataIndex: "updated_at"
        },
        {
            title: formatMessage({id: "page.emailTemplates.createdBy"}),
            dataIndex: "folder_created_by_user.name"
        },
        {
            title: formatMessage({id: "page.emailTemplates.templateDescription"}),
            dataIndex: "description"
        }
    ];

    let TemplatesTitleBar;
    let TemplatesInFolder;
    if(!isSharedByVisible && isCurrentUser()){
        TemplatesTitleBar = <TabSwitcher
            setPermissionSettingVisible={setPermissionSettingVisible}
            isPermissionSettingVisible={isPermissionSettingVisible}
            formatMessage={formatMessage}
        />
    }else{
        TemplatesTitleBar =  <Row className="pt-lg">
            <Col className="gutter-row field-label" span={24}>
                <div className={cx('template-title')}>{ formatMessage({id: 'page.emailTemplates.templates'}) }</div>
            </Col>
        </Row>
    }
    if(isSharedByVisible || !isPermissionSettingVisible || !isCurrentUser()){
        TemplatesInFolder = <Templates
            fetchNewTemplateData={fetchNewTemplateData}
            templates={templates}
            pagination={pagination}
            columns={columns}
            setPermissionSettingVisible={setPermissionSettingVisible}
            formatMessage={formatMessage}
            isSharedByVisible={isSharedByVisible}
            isCurrentUser={isCurrentUser}
            selectedUser={selectedUser}
        />
    }else{
        TemplatesInFolder = <EmailTemplatePermission
            isCurrentUser={isCurrentUser}
            selectedFolder={selectedFolder}
        />
    }


    return (
        <Panel
            panelClasses="email-theme-panel"
            actionsLeft={actionsLeft}
            actionsRight={isSharedByVisible || !isCurrentUser() ? null : actionsRight}
        >
            <Modal
                title={editTemplate.name}
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="mb-md">
                    {editTemplate.attachments && editTemplate.attachments.map((attachment)=>{
                        return <span className="mr-sm">
                            <Icon type="paper-clip" />
                            <a href={attachment.url} target="_blank">{attachment.file_name}</a>
                        </span>
                    })}
                </div>
                <div dangerouslySetInnerHTML={{__html: editTemplate.content}}/>
            </Modal>
            <Folders
                formatMessage={formatMessage}
                setSelectedFolderData={setSelectedFolderData}
                selectedFolder={selectedFolder}
                userFolders={userFolders}
                sharedFolders={sharedFolders}
                isSharedByVisible={isSharedByVisible}
                queryByPaging={queryByPaging}
            />
            {TemplatesTitleBar}

            {TemplatesInFolder}
        </Panel>
    );
};

export default TemplateDetail;
