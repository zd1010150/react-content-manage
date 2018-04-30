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
            selectedUser={selectedUser}
            setSharedByVisible={setSharedByVisible}
            formatMessage={formatMessage}
        />
    );
    const actionsRight = (
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
    const columns = [
        {
            key: "id",
            render: record =>
                <span>
          {isCurrentUser() &&
          <EmailTemplateIcon
              type="edit"
              onClick={() => {
                  fetchTemplateData({
                      templateId: record.id,
                      cb: history.push("template-edit/" + record.id)
                  });
              }}
          />}
                    {!isCurrentUser() &&
                    <EmailTemplateIcon
                        type="eye-o"
                        onClick={() => {
                            fetchTemplateData({
                                templateId: record.id,
                                cb: () => showModal(),
                                cbErr: () => alert("no access")
                            });
                        }}
                    />}

                    {isCurrentUser() &&
                    <Popconfirm
                        title="Are you sure to delete it?"
                        onConfirm={() =>
                            deleteTemplate({
                                templateId: record.id,
                                folderId: selectedFolder.id
                            })}
                    >
                        <EmailTemplateIcon type="delete" className="danger pl-lg"/>
                    </Popconfirm>}
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

    return (
        <Panel
            panelClasses="email-theme-panel"
            actionsLeft={actionsLeft}
            actionsRight={isSharedByVisible || !isCurrentUser() ? null : actionsRight}
        >
            <Modal
                title="Basic Modal"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
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
            <TabSwitcher
                setPermissionSettingVisible={setPermissionSettingVisible}
                isPermissionSettingVisible={isPermissionSettingVisible}
                formatMessage={formatMessage}
            />
            {!isPermissionSettingVisible
                ? <Templates
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
                : <EmailTemplatePermission
                    isCurrentUser={isCurrentUser}
                    selectedFolder={selectedFolder}
                />}
        </Panel>
    );
};

export default TemplateDetail;
