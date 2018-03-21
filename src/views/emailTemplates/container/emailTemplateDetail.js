/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import { Row, Col, Button, Icon, Radio } from 'antd';
import { Panel } from 'components/ui/index';
import { setTeams } from 'store/global/action';
import { updateUsers } from 'views/Users/flow/action';
import AddDepartment from '../component/add';
import Department from '../component/department';
import User from '../component/user';
import {
    setSortableViewVisible,
} from '../flow/action';
import { getTeamUsers, getSelectedTeamName } from '../flow/reselect';
const RadioGroup = Radio.Group;

const Radios = ({ onChange }) => (
    <RadioGroup defaultValue={1} onChange={onChange}>
        <Radio className="email-theme-radio" value={1}>J's Folder</Radio>
        <Radio className="email-theme-radio" value={2}>Shared By</Radio>
    </RadioGroup>
);

class EmailTemplateDetail extends React.Component {
    componentDidMount() {
    }
    render() {


        const { formatMessage } = this.props.intl;
        const actionsLeft = <div><Radios/></div>;
        const actionsRight = <div><Button className="btn-ellipse" size="small" onClick={() => { setSortableViewVisible(true); setSortingTeam(JSON.parse(JSON.stringify(teams))); }}><Icon type="edit" />{ formatMessage({ id: 'page.emailTemplates.hideDepartments' }) }</Button></div>;
        return (
            <Panel actionsLeft={actionsLeft} contentClasses="pl-lg pr-lg pt-lg pb-lg" actionsRight={actionsRight}>
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


const mapStateToProps = ({ global, setupOrgChart }) => ({
    teams: global.settings.teams,
    teamUsers: getTeamUsers({ setupOrgChart })
});
const mapDispatchToProps = {
    setTeams,
    updateUsers
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(EmailTemplateDetail));

