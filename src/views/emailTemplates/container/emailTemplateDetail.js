/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import { Row, Col, Button, Icon, Radio, Table } from 'antd';
import { Panel } from 'components/ui/index';
import { setTeams } from 'store/global/action';
import { updateUsers } from 'views/Setup/Users/flow/action';
import classNames from 'classnames/bind';
import AddDepartment from '../component/add';
import Department from '../component/department';
import User from '../component/user';
import {
    setEditFolderViewVisible,
    setPermissionSettingVisible,
    queryByPaging
} from '../flow/action';
import { getTeamUsers, getSelectedTeamName } from '../flow/reselect';
import { Tabs } from 'antd';
import styles from '../emailTemplates.less';
const cx = classNames.bind(styles);
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;

const folders = [{name: 'Private Template'}, {name: 'Shared Folder'}, {name: 'Genaral Folder'}, {name: 'd'}, {name: 'e'}, {name: 'f'}, {name: 'g'}, {name: 'h'}, {name: 'h'}, {name: 'h'}, {name: 'h'},];


const Radios = ({ onChange }) => (
    <RadioGroup defaultValue={1} onChange={onChange}>
        <Radio className="email-theme-radio" value={1}>J's Folder</Radio>
        <Radio className="email-theme-radio" value={2}>Shared By</Radio>
    </RadioGroup>
);

const Folders = () => (
    <div className={cx('folders')}>{folders.map((item, index)=>
        <div key={index} className={cx('folder')} style={{marginLeft: index > 0 ? 40 : 10}}>
            <div><Icon className={cx('folder-icon')} type="folder" /></div>
            <div>{item.name}</div>
        </div>
    )}
    </div>
)

const TabSwitcher = ({formatMessage, setPermissionSettingVisible, isPermissionSettingVisible}) => (
    <Row className="pt-lg">
        <Col className="gutter-row field-label" span={12}>
            <button onClick={()=>{setPermissionSettingVisible(false)}} className={!isPermissionSettingVisible ? cx('tab-button-active') : cx('tab-button')} style={{width: '100%'}}>{ formatMessage({ id: 'page.emailTemplates.templates' }) }</button>
        </Col>
        <Col className="gutter-row field-value" span={12}>
            <button onClick={()=>{setPermissionSettingVisible(true)}} className={isPermissionSettingVisible ? cx('tab-button-active') : cx('tab-button')}>{ formatMessage({ id: 'page.emailTemplates.permissionSetting' }) }</button>
        </Col>
    </Row>
)

const Templates = ({templates, pagination, columns}) => (
    <Table dataSource={templates} columns={columns} pagination={pagination} className="mt-lg" rowKey="id" />
)

const TemplatePermission = () => (
    null
)

class EmailTemplateDetail extends React.Component {
    componentDidMount() {
        //TODO This will move to onclick of folder
        this.props.queryByPaging();
    }
    render() {
        const { formatMessage } = this.props.intl;
        const {setEditFolderViewVisible, setPermissionSettingVisible, isPermissionSettingVisible, templates, templatesDataTablePagination, queryByPaging} = this.props;
        console.log('templates', templates)
        const actionsLeft = <div><Radios/></div>;
        const actionsRight = <div><Button className="btn-ellipse" size="small" onClick={() => {setEditFolderViewVisible(true)}}><Icon type="edit" />{ formatMessage({ id: 'page.emailTemplates.editFolders' }) }</Button></div>;
        const pagination = {
            defaultCurrent: templatesDataTablePagination.currentPage,
            current: templatesDataTablePagination.currentPage,
            defaultPageSize: templatesDataTablePagination.perPage,
            pageSize: templatesDataTablePagination.perPage,
            total: templatesDataTablePagination.total,
            size: 'small',
            onChange(page, pageSize) {
                queryByPaging(pageSize, page);
            },
        };
        const columns = [
            {
                title: formatMessage({ id: 'global.ui.table.action' }),
                key: 'id',
                render: record => (
                    <span>
            <Icon type="edit" onClick={() => this.edit(record.id)} />
            <Icon type="delete" className="danger pl-lg" onClick={() => this.delete(record.id)} />
          </span>
                ),
            }, {
                title: formatMessage({ id: 'page.emailTemplates.templateName' }),
                dataIndex: 'name',
                key: 'name',
            }, {
                title: formatMessage({ id: 'page.emailTemplates.templateCreatedDate' }),
                dataIndex: 'join_date',
                key: 'join_date',
            }, {
                title: formatMessage({ id: 'page.emailTemplates.templateModifiedDate' }),
                dataIndex: 'team.name',
            }, {
                title: formatMessage({ id: 'page.emailTemplates.templateCreatedBy' }),
                dataIndex: 'page_layouts.data.leads.name',
            }, {
                title: formatMessage({ id: 'page.emailTemplates.templateDescription' }),
                dataIndex: 'page_layouts.data.accounts.name',
            }
        ];
        return (
            <Panel actionsLeft={actionsLeft} contentClasses={`pl-lg pr-lg pt-lg pb-lg ${cx('email-panel-content')}`} actionsRight={actionsRight}>
                <Folders/>
                <TabSwitcher
                    setPermissionSettingVisible={setPermissionSettingVisible}
                    isPermissionSettingVisible={isPermissionSettingVisible}
                    formatMessage={formatMessage}
                />
                {
                    !isPermissionSettingVisible ? <Templates templates={templates} pagination={pagination} columns={columns}/> : <TemplatePermission />
                }
            </Panel>
        );
    }
}

EmailTemplateDetail.propTypes = {
    intl: intlShape.isRequired,
};


const mapStateToProps = ({ global, setup }) => {
    const { emailTemplates } = setup;
    return {
        teams: global.settings.teams,
        teamUsers: getTeamUsers({ emailTemplates }),
        isEditFolderViewVisible: emailTemplates.ui.isEditFolderViewVisible,
        isPermissionSettingVisible: emailTemplates.ui.isPermissionSettingVisible,
        templates: emailTemplates.templates.templates,
        templatesDataTablePagination: emailTemplates.templatesDataTablePagination
    };
};

const mapDispatchToProps = {
    setTeams,
    updateUsers,
    setEditFolderViewVisible,
    setPermissionSettingVisible,
    queryByPaging
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(EmailTemplateDetail));

