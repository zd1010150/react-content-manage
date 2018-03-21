/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import { Row, Col, Button, Icon, Radio } from 'antd';
import { Panel } from 'components/ui/index';
import { setTeams } from 'store/global/action';
import { updateUsers } from 'views/Setup/Users/flow/action';
import classNames from 'classnames/bind';
import AddDepartment from '../component/add';
import Department from '../component/department';
import User from '../component/user';
import {
    setEditFolderViewVisible,
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

const Templates = ({formatMessage}) => (


        <Row className="pt-lg">
            <Tabs type="line" tabBarStyle={{width: '100%'}}>
                <TabPane tab="Tab Title 1" key="1">
                    <p>Content of Tab Pane 1</p>
                    <p>Content of Tab Pane 1</p>
                    <p>Content of Tab Pane 1</p>
                </TabPane>
                <TabPane tab="Tab Title 1" key="2">
                    <p>Content of Tab Pane 1</p>
                    <p>Content of Tab Pane 1</p>
                    <p>Content of Tab Pane 1</p>
                </TabPane>
            </Tabs>
        </Row>



    // <Row className="pt-lg">
    //     <Col className="gutter-row field-label" span={12}>
    //         { formatMessage({ id: 'page.emailTemplates.templates' }) }
    //     </Col>
    //     <Col className="gutter-row field-value" span={12}>
    //         { formatMessage({ id: 'page.emailTemplates.permissionSetting' }) }
    //     </Col>
    // </Row>
)

class EmailTemplateDetail extends React.Component {
    componentDidMount() {
    }
    render() {
        const { formatMessage } = this.props.intl;
        const {setEditFolderViewVisible} = this.props;
        const actionsLeft = <div><Radios/></div>;
        const actionsRight = <div><Button className="btn-ellipse" size="small" onClick={() => {setEditFolderViewVisible(true)}}><Icon type="edit" />{ formatMessage({ id: 'page.emailTemplates.editFolders' }) }</Button></div>;
        return (
            <Panel actionsLeft={actionsLeft} contentClasses={`pl-lg pr-lg pt-lg pb-lg ${cx('email-panel-content')}`} actionsRight={actionsRight}>
                <Folders/>
                <Templates formatMessage={formatMessage}/>
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
    };
};

const mapDispatchToProps = {
    setTeams,
    updateUsers,
    setEditFolderViewVisible
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(EmailTemplateDetail));

