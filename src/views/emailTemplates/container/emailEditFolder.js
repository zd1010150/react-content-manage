/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import { Row, Col, Button, Icon, Radio } from 'antd';
import { Panel } from 'components/ui/index';
import { setTeams } from 'store/global/action';
import { updateUsers } from 'views/Setup/Users/flow/action';

import {

} from '../flow/action';
import { getTeamUsers, getSelectedTeamName } from '../flow/reselect';

class EmailTemplateDetail extends React.Component {
    componentDidMount() {
    }
    render() {
        const { formatMessage } = this.props.intl;
        const {} = this.props;
        const actionsRight = <div><Button className="btn-ellipse email-theme-btn" size="small" onClick={() => {}}><Icon type="edit" />{ formatMessage({ id: 'page.emailTemplates.newFolder' }) }</Button></div>;
        return (
            <Panel panelTitle={formatMessage({ id: 'page.emailTemplates.editFolderTitle' })} contentClasses="pl-lg pr-lg pt-lg pb-lg" actionsRight={actionsRight}>
                <Row className="pt-lg">
                    <Col className="gutter-row field-label" span={12}>

                    </Col>
                    <Col className="gutter-row field-value" span={12}>

                    </Col>
                </Row>
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
    updateUsers
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(EmailTemplateDetail));

