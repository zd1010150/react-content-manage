/* eslint-disable react/prop-types,no-shadow */
import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import { Row, Col, Button, Icon, Radio, Input } from 'antd';
import { Panel } from 'components/ui/index';
import { setTeams } from 'store/global/action';
import { updateUsers } from 'views/Setup/Users/flow/action';
import classNames from 'classnames/bind';
import styles from '../emailTemplates.less';
import {
    setEditFolderViewVisible,
    setEditFolderData,
    deleteUserFolderData
} from '../flow/action';
import { getTeamUsers, getSelectedTeamName } from '../flow/reselect';
const cx = classNames.bind(styles);
const foldersData = {
    userFolders: [{
        id: 0,
        name: 'genaral folder',
        isShared: true,
        templates: [{
            name: 'market',
            createdAt: '2018-01-02',
            modifiedDate: '2018-03-02',
            createBy: 'Jimmy',
            Description: 'for markdet use'
        }]
    },
        {
            id: 1,
            name: 'private folder',
            isShared: false,
            templates: [{
                name: 'sales',
                createdAt: '2018-01-02',
                modifiedDate: '2018-03-02',
                createBy: 'Jimmy',
                Description: 'for sales use'
            }]
        }],
    sharedFolders: [{
        name: 'ACY folder',
        sharedBy: 'Jimmy',
        templates: [{
            name: 'ACY',
            createdAt: '2018-01-02',
            modifiedDate: '2018-03-02',
            createBy: 'Jimmy',
            Description: 'for ACY use'
        }]
    }]
}
const FolderInput = ({item, editFolders, setEditFolderData, deleteUserFolderData})=>{
    let canEdit = false;
    editFolders.forEach((folder)=>{
        if(folder.id === item.id){
            canEdit = true;
        }
    })
   return <Col className="pl-lg gutter-row field-label" span={6}>
       <div onClick={()=>{deleteUserFolderData(item.id)}}>
           <Icon className={cx('folder-icon')} type="folder" /><span className="pl-sm"><Icon type="delete"/></span>
       </div>
       <Input size="small" disabled={!canEdit} addonAfter={!canEdit && <Icon onClick={() => {setEditFolderData(item)}} type="edit" />} defaultValue={item.name} />
   </Col>
}

const ActionButtonGroup = ({setEditFolderViewVisible, formatMessage}) => {
    return <div className="pt-md pl-md pb-md">
        <Button className="email-theme-btn mr-md" onClick={() => {setEditFolderViewVisible(false)}}><Icon type="save" />{ formatMessage({ id: 'page.emailTemplates.save' }) }</Button>
        <Button onClick={() => {setEditFolderViewVisible(false)}}><Icon type="close" />{ formatMessage({ id: 'page.emailTemplates.cancel' }) }</Button>
    </div>
}

class EmailTemplateEditFolder extends React.Component {
    componentDidMount() {
    }
    render() {
        const { formatMessage } = this.props.intl;
        const {userFolders, editFolders, setEditFolderViewVisible, setEditFolderData, deleteUserFolderData} = this.props;
        const actionsRight = <div><Button className="btn-ellipse email-theme-btn" size="small" onClick={() => {}}><Icon type="plus" />{ formatMessage({ id: 'page.emailTemplates.newFolder' }) }</Button></div>;
        return (
            <Panel panelTitle={formatMessage({ id: 'page.emailTemplates.editFolderTitle' })} contentClasses={`pl-lg pr-lg pt-lg pb-lg ${cx('email-panel-content')}`} actionsRight={actionsRight}>
                <Row className={cx('folders')}>
                    {userFolders.map((item)=>
                        <FolderInput
                            key={item.id}
                            item={item}
                            editFolders={editFolders}
                            setEditFolderData={setEditFolderData}
                            deleteUserFolderData={deleteUserFolderData}/>
                    )}
                </Row>
                <ActionButtonGroup setEditFolderViewVisible={setEditFolderViewVisible} formatMessage={formatMessage}/>
            </Panel>
        );
    }
}

EmailTemplateEditFolder.propTypes = {
    intl: intlShape.isRequired,
};


const mapStateToProps = ({ global, setup }) => {
    const { emailTemplates } = setup;
    return {
        teams: global.settings.teams,
        teamUsers: getTeamUsers({ emailTemplates }),
        isEditFolderViewVisible: emailTemplates.ui.isEditFolderViewVisible,
        editFolders: emailTemplates.editFolders,
        userFolders:emailTemplates.userFolders
    };
};

const mapDispatchToProps = {
    setTeams,
    updateUsers,
    setEditFolderViewVisible,
    setEditFolderData,
    deleteUserFolderData
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(EmailTemplateEditFolder));

