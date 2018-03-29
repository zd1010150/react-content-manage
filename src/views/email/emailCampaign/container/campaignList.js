/* eslint-disable react/prop-types,no-shadow */
import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {intlShape, injectIntl} from 'react-intl';
import {Row, Col, Button, Icon, Radio, Table} from 'antd';
import {Panel} from 'components/ui/index';
import {setTeams} from 'store/global/action';
import {updateUsers} from 'views/Setup/Users/flow/action';
import classNames from 'classnames/bind';
import {NavLink} from 'react-router-dom';
import {

} from '../flow/action';
import {Tabs} from 'antd';
import styles from '../emailCampaign.less';
const cx = classNames.bind(styles);
const TabPane = Tabs.TabPane;


class CampaignList extends React.Component {
    componentDidMount() {
    }

    render() {
        const {formatMessage} = this.props.intl;
        const {
            setEditFolderViewVisible,
            isSharedByVisible, campaigns, templatesDataTablePagination, queryByPaging, setSharedByVisible,
            selectedUser, loginUser
        } = this.props;
        const newCampaignBtn = <Button className="btn-ellipse email-theme-btn" size="small" onClick={() => {}}><Icon type="plus"/>{ formatMessage({id: 'page.emailTemplates.newCampaign'}) }</Button>
        const subscriberListBtn = <Button className="btn-ellipse ml-sm" size="small" onClick={() => {}}><Icon type="edit"/>{ formatMessage({id: 'page.emailTemplates.subscriberLists'}) }</Button>
        const unsubscriberListBtn = <Button className="btn-ellipse ml-sm" size="small" onClick={() => {}}><Icon type="user-delete"/>{ formatMessage({id: 'page.emailTemplates.unsubscriberList'}) }</Button>
        const actionsRight = <div>{newCampaignBtn}{subscriberListBtn}{unsubscriberListBtn}</div>
        // const pagination = {
        //     defaultCurrent: templatesDataTablePagination.currentPage,
        //     current: templatesDataTablePagination.currentPage,
        //     defaultPageSize: templatesDataTablePagination.perPage,
        //     pageSize: templatesDataTablePagination.perPage,
        //     total: templatesDataTablePagination.total,
        //     size: 'small',
        //     onChange(page, pageSize) {
        //         queryByPaging({pageSize, page});
        //     },
        // };
        const columns = [
            {
                key: 'id',
                render: record => (
                    <span>
            <Icon type="edit" onClick={() => this.edit(record.id)}/>
            <Icon type="delete" className="danger pl-lg" onClick={() => this.delete(record.id)}/>
          </span>
                ),
            }, {
                title: formatMessage({id: 'page.emailTemplates.campaignName'}),
                dataIndex: 'name',
                key: 'name',
            }, {
                title: formatMessage({id: 'page.emailTemplates.subscriberList'}),
                dataIndex: 'subscriberList.name',
                key: 'subscriberList.id',
            }, {
                title: formatMessage({id: 'page.emailTemplates.type'}),
                dataIndex: 'type',
            }, {
                title: formatMessage({id: 'page.emailTemplates.createdDate'}),
                dataIndex: 'createdDate',
            }, {
                title: formatMessage({id: 'page.emailTemplates.startDate'}),
                dataIndex: 'startDate',
            }, {
                title: formatMessage({id: 'page.emailTemplates.endDate'}),
                dataIndex: 'endDate',
            }, {
                title: formatMessage({id: 'page.emailTemplates.createdBy'}),
                dataIndex: 'createdBy',
            }, {
                title: formatMessage({id: 'page.emailTemplates.status'}),
                dataIndex: 'status',
            }, {
                title: formatMessage({id: 'page.emailTemplates.campaignDescription'}),
                dataIndex: 'description',
            }
        ];
        return (
            <Panel panelTitle={formatMessage({id: 'page.emailTemplates.emailCampaign'})} panelClasses="email-theme-panel"
                   contentClasses={` pb-lg ${cx('email-panel-content')}`} actionsRight={actionsRight}
                   >

                <Table dataSource={campaigns} columns={columns} rowKey="id" pagination={false}/>
            </Panel>
        );
    }
}

CampaignList.propTypes = {
    intl: intlShape.isRequired,
};


const mapStateToProps = ({global, setup, loginUser}) => {
    const {emailCampaign} = setup;
    return {
        campaigns: emailCampaign.campaigns,

    };
};

const mapDispatchToProps = {
    setTeams,
    updateUsers
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(CampaignList));

