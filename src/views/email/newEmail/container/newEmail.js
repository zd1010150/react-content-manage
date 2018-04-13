import React, {Fragment} from 'react';
import _ from 'lodash';
import {intlShape, injectIntl} from 'react-intl';
import {Row, Col, Input, Button, Icon, Radio, Table} from 'antd';
import {fetchTeams} from 'store/global/action';
import {connect} from 'react-redux';
import {Panel} from 'components/ui/index';
import classNames from 'classnames/bind';
import NewEmailContent from './newEmailContent';
import { FloatingLabelInput } from 'components/ui/index';
import styles from '../newEmail.less';
const cx = classNames.bind(styles);

const InputComponent = ({label}) => {
    return <Row className={`pt-lg ${cx('new-email-input-row')}`}>
        <Col className="gutter-row field-label mt-sm" span={2}>
            {label}
        </Col>
        <Col className={`gutter-row field-value ${cx('new-email-input')}`} span={22}>
            <FloatingLabelInput
                noLabel={true}
                handleChange={this.handleTextInputChange}
                value={''}
            />
        </Col>
    </Row>
}
const BasicInfo = ({formatMessage}) => {
    return <Fragment>
        <InputComponent label={formatMessage({id: 'page.emailTemplates.to'})}/>
        <InputComponent label={formatMessage({id: 'page.emailTemplates.cc'})}/>
        <InputComponent label={formatMessage({id: 'page.emailTemplates.bcc'})}/>
        <InputComponent label={formatMessage({id: 'page.emailTemplates.subject'})}/>
    </Fragment>
}

class NewEmail extends React.Component {
    componentDidMount() {

    }

    render() {
        const {formatMessage} = this.props.intl;
        const SendButton = <Button className="email-theme-btn" size="small" onClick={() => {}}><Icon type="right-square" />{ formatMessage({ id: 'page.emailTemplates.send' }) }</Button>;
        const DiscardButton = <Button className="ml-md" size="small" onClick={() => {}}><Icon type="delete" />{ formatMessage({ id: 'page.emailTemplates.discard' }) }</Button>
        const actionsRight = <div>{SendButton}{DiscardButton}</div>;
        return (
            <Panel panelTitle={formatMessage({id: 'page.emailTemplates.newEmail'})}
                   contentClasses={`pl-lg pr-lg pt-lg pb-lg ${cx('new-email-panel-content')}`}
                   actionsRight={actionsRight}>
                <BasicInfo formatMessage={formatMessage}/>
                <NewEmailContent />
            </Panel>

        );
    }
}

const mapStateToProps = ({global}) => ({});
const mapDispatchToProps = {};


export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(NewEmail));


