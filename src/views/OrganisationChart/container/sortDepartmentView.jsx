/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { Button, Row, Col, Icon } from 'antd';
import { Panel } from 'components/ui/index';
import { TeamTree } from 'components/page/index';
import { setSortableViewVisible, sortDepartment, setSortingTeam } from '../flow/action';

class SortView extends React.Component {
  render() {
    const {
      sortDepartment, setSortableViewVisible, sortingTeams, setSortingTeam,
    } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <Panel panelTitle="Organisational Chart" contentClasses="pl-lg pr-lg pt-lg pb-lg">
        <Row>
          <Col className="gutter-row field-label" span={24}>
            <TeamTree draggable teams={sortingTeams} setTeams={setSortingTeam} />
          </Col>
          <Col className="gutter-row field-value" offset={2} span={24}>
            <Button type="danger" size="small" onClick={() => { sortDepartment(sortingTeams, () => { setSortableViewVisible(false); }); }}>
              <Icon type="save" />{ formatMessage({ id: 'global.ui.button.save' }) }
            </Button>
            <Button className="ml-lg" size="small" onClick={() => { setSortableViewVisible(false); }}>
              <Icon type="close" />{ formatMessage({ id: 'global.ui.button.cancel' }) }
            </Button>
          </Col>
        </Row>
      </Panel>
    );
  }
}

SortView.propTypes = {
  intl: intlShape.isRequired,
};

const mapStateToProps = ({ setupOrgChart }) => ({
  sortingTeams: setupOrgChart.sortingTeams,
});
const mapDispatchToProps = {
  setSortableViewVisible,
  sortDepartment,
  setSortingTeam,
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(SortView));

