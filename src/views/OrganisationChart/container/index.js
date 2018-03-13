/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { Panel } from 'components/ui/index';
import { fetchTeams } from 'store/global/action';
import AddDepartment from '../component/add';
import Department from '../component/department';
import User from '../component/user';
import DemoTree from '../component/demotree';
import { setTeams } from 'store/global/action';

class organizationChartIndexView extends React.Component {
  componentDidMount() {
    // this.props.fetchTeams();
  }
  render() {
    const { teams, setTeams } = this.props;
    return (
      <Panel panelTitle="Organisational Chart" contentClasses="pl-lg pr-lg pt-lg">
        <AddDepartment />
        <Row className="pt-lg">
          <Col className="gutter-row field-label" span={12}>
            <Department teams={teams} setTeams={setTeams} />
          </Col>
          <Col className="gutter-row field-value" span={12}><User /></Col>
        </Row>
        <DemoTree />
      </Panel>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  teams: global.settings.teams,
});
const mapDispatchToProps = {
  fetchTeams,
  setTeams,
};

export default connect(mapStateToProps, mapDispatchToProps)(organizationChartIndexView);

