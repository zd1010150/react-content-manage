import React, {Fragment} from 'react';
import _ from 'lodash';
import {intlShape, injectIntl} from 'react-intl';
import {Row, Col, Input, Select, Button, Icon, Radio, Table} from 'antd';
import {connect} from 'react-redux';
import {Panel, RichEditor} from 'components/ui/index';
import classNames from 'classnames/bind';
import styles from '../newEmail.less';
const cx = classNames.bind(styles);

class NewEmailContent extends React.Component {
    constructor(props){
        super(props);

    }
    componentDidMount() {

    }
    render() {
        const { formatMessage } = this.props.intl;
        const selectTemplate = <Button className="email-theme-btn" size="small" onClick={() => {}}><Icon type="download" />{ formatMessage({ id: 'page.emailTemplates.selectTemplate' }) }</Button>;
        const cloudAttachment = <Button className="email-theme-btn ml-sm" size="small" onClick={() => {}}><Icon type="file" />{ formatMessage({ id: 'page.emailTemplates.cloudAttachment' }) }</Button>
        const localAttachment = <Button className="email-theme-btn ml-sm" size="small" onClick={() => {}}><Icon type="link" />{ formatMessage({ id: 'page.emailTemplates.localAttachment' }) }</Button>
        const additionalCtrl = <Fragment>{selectTemplate}{cloudAttachment}{localAttachment}</Fragment>
        return (
            <RichEditor additionalCtrl={additionalCtrl}/>
        );
    }
}

const mapStateToProps = ({ global }) => ({

});
const mapDispatchToProps = {

};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(NewEmailContent));

