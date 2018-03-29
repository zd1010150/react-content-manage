import React, {Fragment} from 'react';
import {Row, Col, Button, Icon, Radio, Table} from 'antd';
import {Panel} from 'components/ui/index';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {Tabs, Input, Select} from 'antd';
import styles from '../emailCampaign.less';
const cx = classNames.bind(styles);
const Option = Select.Option;
const { TextArea } = Input;
const Banner = ({children}) => {
    return <div className={`pt-sm pl-lg pb-sm ${cx('email-campaign-banner')}`}>{children}</div>
}
const InputComponent = ({type, optional, label}) => {
    let inputArea = null;
    if(type === 'text'){
        inputArea = <Input type="text"/>
    }else if(type === 'textarea'){
        inputArea = <TextArea />
    }else if(type === 'date'){
        inputArea = <Input type="date"/>
    }
    return <Row className={`pt-lg ${cx('email-campaign-input-row')}`}>
        <Col className="gutter-row field-label" offset={6} span={3}>
            {label}{!optional && <span className={`${cx('email-campaign-red-color')}`}>*</span>}
        </Col>
        <Col className="gutter-row field-value" span={9}>
            {inputArea}
        </Col>
    </Row>
}

const SelectComponent = ({itemList, selectedItem, label, onChange}) => {
    let defaultFolderName;
    if(selectedItem.name){
        defaultFolderName = selectedItem.name;
    }else{
        defaultFolderName = '';
    }
    return <Row className={`pt-lg ${cx('email-campaign-input-row')}`}>
        <Col className="gutter-row field-label" offset={6} span={3}>
            {label}
        </Col>
        <Col className="gutter-row field-value" span={9}>
            <Select onChange={onChange} defaultValue={defaultFolderName} className="full-width">
                {itemList && itemList.map((item) =>
                    <Option key={item.id} value={item.id}>{item.name}</Option>
                )}
            </Select>
        </Col>
    </Row>
}

const StepOne = ({emailTemplates, selectedTemplate, formatMessage}) => {
    return <Fragment>
        <InputComponent type="text" label={formatMessage({id: 'page.emailTemplates.campaignName'})}/>
        {/*<SelectComponent itemList={emailTemplates} selectedItem={selectedTemplate} label={formatMessage({id: 'page.emailTemplates.folder'})}/>*/}
        {/*<SelectComponent userFolders={userFolders} selectedFolder={selectedFolder} label={formatMessage({id: 'page.emailTemplates.folder'})}/>*/}
        {/*<SelectComponent userFolders={userFolders} selectedFolder={selectedFolder} label={formatMessage({id: 'page.emailTemplates.folder'})}/>*/}
        <InputComponent optional={true} type="textarea" label={formatMessage({id: 'page.emailTemplates.description'})}/>
    </Fragment>
}

const StepTwo = ({userFolders, selectedFolder, formatMessage}) => {
    return <Fragment>
        <InputComponent type="date" label={formatMessage({id: 'page.emailTemplates.startDate'})}/>
        <InputComponent optional={true} type="date" label={formatMessage({id: 'page.emailTemplates.endDate'})}/>
        {/*<SelectComponent userFolders={userFolders} selectedFolder={selectedFolder} label={formatMessage({id: 'page.emailTemplates.folder'})}/>*/}
    </Fragment>
}

class CampaignInformation extends React.Component {
    componentDidMount() {
    }

    render() {
        const {
            formatMessage,
        } = this.props;
        return (
            <Panel panelTitle={formatMessage({id: 'page.emailTemplates.newEmailCampaign'})} panelClasses="email-theme-panel"
                   contentClasses={` pb-lg ${cx('email-panel-content')}`}
            >
                <Banner>{formatMessage({id: 'page.emailTemplates.stepOne'})}</Banner>
                <StepOne formatMessage={formatMessage}/>
                <Banner>{formatMessage({id: 'page.emailTemplates.stepTwo'})}<span className={`ml-sm ${cx('email-campaign-orange-color')}`}>{formatMessage({id: 'page.emailTemplates.schedulesDescription'})}</span></Banner>
                <StepTwo formatMessage={formatMessage}/>
            </Panel>
        );
    }
}

CampaignInformation.propTypes = {
    formatMessage: PropTypes.func.isRequired,
};



export default CampaignInformation;