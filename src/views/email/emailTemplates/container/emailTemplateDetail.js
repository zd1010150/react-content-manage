/* eslint-disable react/prop-types,no-shadow */
import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {intlShape, injectIntl} from 'react-intl';
import {Row, Col, Button, Icon, Radio, Table, Popconfirm} from 'antd';
import {Panel} from 'components/ui/index';
import {setTeams} from 'store/global/action';
import {updateUsers} from 'views/Setup/Users/flow/action';
import classNames from 'classnames/bind';
import {NavLink} from 'react-router-dom';
import AddDepartment from '../component/add';
import Department from '../component/department';
import User from '../component/user';
import {
    setEditFolderViewVisible,
    setPermissionSettingVisible,
    setSharedByVisible,
    queryByPaging,
    setSelectedFolderData,
    deleteTemplate,
    fetchTemplateData
} from '../../flow/action';
import {getTeamUsers, getSelectedTeamName} from '../../flow/reselect';
import {Tabs} from 'antd';
import { withRouter } from "react-router";
import styles from '../emailTemplates.less';
const cx = classNames.bind(styles);
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;

const Radios = ({selectedUser, setSharedByVisible}) => (
    <RadioGroup defaultValue={1} onChange={e => {
        e.target.value === 1 ? setSharedByVisible(false) : setSharedByVisible(true)
    }}>
        <Radio className="email-theme-radio" value={1}>{selectedUser.name}</Radio>
        <Radio className="email-theme-radio" value={2}>Shared By</Radio>
    </RadioGroup>
);


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
const Folders = ({formatMessage, setSelectedFolderData, selectedFolder, userFolders, sharedFolders, isSharedByVisible, queryByPaging}) => {
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
                    <div>{formatMessage({id: 'page.emailTemplates.sharedBy'}) + item.belonged_user.name}</div>}
                </label>
            </div>
        )}
    </div>
}

const TabSwitcher = ({formatMessage, setPermissionSettingVisible, isPermissionSettingVisible}) => (
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

const Templates = ({templates, pagination, columns, formatMessage, isSharedByVisible, loginUser, selectedUser}) => (
    <Fragment>
        {!isSharedByVisible && loginUser.id === selectedUser.id &&
        <div style={{textAlign: 'right', height: 30, margin: '10px 15px'}}>
            <NavLink to='/setup/email/templates-creation'>
                <Button className="btn-ellipse email-theme-btn" size="small" onClick={() => {
                    setPermissionSettingVisible(false)
                }}><Icon type="plus"/>
                    { formatMessage({id: 'page.emailTemplates.addTemplate'}) }
                </Button>
            </NavLink>

        </div>
        }
        <Table dataSource={templates} columns={columns} pagination={pagination} className="mt-lg" rowKey="id"/>
    </Fragment>
)

const TemplatePermission = () => (
    null
)

class EmailTemplateDetail extends React.Component {
    componentDidMount() {
    }

    render() {
        const {formatMessage} = this.props.intl;
        const {
            setEditFolderViewVisible, setPermissionSettingVisible, isPermissionSettingVisible,
            isSharedByVisible, templates, templatesDataTablePagination, queryByPaging, setSharedByVisible,
            setSelectedFolderData, selectedFolder, userFolders, sharedFolders, selectedUser, loginUser, deleteTemplate, fetchTemplateData, history
        } = this.props;
        const actionsLeft = <div><Radios selectedUser={selectedUser} setSharedByVisible={setSharedByVisible}/></div>;
        const actionsRight = <div><Button className="btn-ellipse email-theme-btn" size="small" onClick={() => {
            setEditFolderViewVisible(true)
        }}><Icon type="edit"/>{ formatMessage({id: 'page.emailTemplates.editFolders'}) }</Button></div>;
        const pagination = {
            defaultCurrent: templatesDataTablePagination.currentPage,
            current: templatesDataTablePagination.currentPage,
            defaultPageSize: templatesDataTablePagination.perPage,
            pageSize: templatesDataTablePagination.perPage,
            total: templatesDataTablePagination.total,
            size: 'small',
            onChange(page, pageSize) {
                queryByPaging({pageSize, page});
            },
        };
        const columns = [
            {
                key: 'id',
                render: record => (
                    <span>
            <Icon type="edit" onClick={() => {
                fetchTemplateData({templateId: record.id, cb: history.push('template-edit/' + record.id)});

            }}/>
            <Popconfirm
                title='Are you sure to delete it?'
                onConfirm={() => deleteTemplate({templateId: record.id, folderId: selectedFolder.id})}
            >
                <Icon type="delete" className="danger pl-lg"/>
            </Popconfirm>

          </span>
                ),
            }, {
                title: formatMessage({id: 'page.emailTemplates.templateName'}),
                dataIndex: 'name',
                key: 'name',
            }, {
                title: formatMessage({id: 'page.emailTemplates.createdDate'}),
                dataIndex: 'created_at',
                key: 'created_at',
            }, {
                title: formatMessage({id: 'page.emailTemplates.templateModifiedDate'}),
                dataIndex: 'updated_at',
            }, {
                title: formatMessage({id: 'page.emailTemplates.createdBy'}),
                dataIndex: 'folder_created_by_user.name',
            }, {
                title: formatMessage({id: 'page.emailTemplates.templateDescription'}),
                dataIndex: 'description',
            }
        ];
        return (
            <Panel panelClasses="email-theme-panel" actionsLeft={actionsLeft}
                   actionsRight={(isSharedByVisible || loginUser.id !== selectedUser.id) ? null : actionsRight}>
                <Folders
                    formatMessage={formatMessage}
                    setSelectedFolderData={setSelectedFolderData}
                    selectedFolder={selectedFolder}
                    userFolders={userFolders}
                    sharedFolders={sharedFolders}
                    isSharedByVisible={isSharedByVisible}
                    queryByPaging={queryByPaging}/>
                <TabSwitcher
                    setPermissionSettingVisible={setPermissionSettingVisible}
                    isPermissionSettingVisible={isPermissionSettingVisible}
                    formatMessage={formatMessage}
                />
                {
                    !isPermissionSettingVisible ?
                        <Templates templates={templates}
                                   pagination={pagination}
                                   columns={columns}
                                   formatMessage={formatMessage}
                                   isSharedByVisible={isSharedByVisible}
                                   loginUser={loginUser}
                                   selectedUser={selectedUser}/> :
                        <TemplatePermission />
                }
            </Panel>
        );
    }
}

EmailTemplateDetail.propTypes = {
    intl: intlShape.isRequired,
};


const mapStateToProps = ({global, setup, loginUser}) => {
    const {emailTemplates} = setup;
    return {
        teams: global.settings.teams,
        teamUsers: getTeamUsers({emailTemplates}),
        loginUser: loginUser,
        isEditFolderViewVisible: emailTemplates.ui.isEditFolderViewVisible,
        isPermissionSettingVisible: emailTemplates.ui.isPermissionSettingVisible,
        isSharedByVisible: emailTemplates.ui.isSharedByVisible,
        templates: emailTemplates.templates.templates,
        templatesDataTablePagination: emailTemplates.templatesDataTablePagination,
        userFolders: emailTemplates.userFolders,
        sharedFolders: emailTemplates.sharedFolders,
        selectedFolder: emailTemplates.selectedFolder,
        selectedUser: emailTemplates.selectedUser,
    };
};

const mapDispatchToProps = {
    setTeams,
    updateUsers,
    setEditFolderViewVisible,
    setPermissionSettingVisible,
    setSharedByVisible,
    queryByPaging,
    setSelectedFolderData,
    deleteTemplate,
    fetchTemplateData
};

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(EmailTemplateDetail)));

