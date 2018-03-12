/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { Panel } from 'components/ui/index';
import AddDepartment from '../component/add';
import Department from '../component/department';
import User from '../component/user';

const organizationChartIndexView = ({}) => (
  <Panel panelTitle="Organisational Chart" contentClasses="pl-lg pr-lg">
    <AddDepartment />
    <Row className="pt-lg">
      <Col className="gutter-row field-label" span={12}>
        <Department />
      </Col>
      <Col className="gutter-row field-value" span={12}><User /></Col>
    </Row>
  </Panel>
);

const mapStateToProps = ({ }) => ({

});
const mapDispatchToProps = {

};

export default organizationChartIndexView;
