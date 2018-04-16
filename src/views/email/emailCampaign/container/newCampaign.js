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
import CampaignInformation from '../component/campaignInfomation';
const cx = classNames.bind(styles);
const TabPane = Tabs.TabPane;


class NewCampaign extends React.Component {
    componentDidMount() {
    }

    render() {
        const {formatMessage} = this.props.intl;
        const {

        } = this.props;
        return (
            <CampaignInformation formatMessage={formatMessage}/>
        );
    }
}

NewCampaign.propTypes = {
    intl: intlShape.isRequired,
};


const mapStateToProps = ({global, setup, loginUser}) => {
    const {emailCampaign} = setup;
    return {
        campaigns: emailCampaign.campaigns,

    };
};

const mapDispatchToProps = {

};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(NewCampaign));

