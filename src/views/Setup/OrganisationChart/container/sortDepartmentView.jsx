/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { Permission, Unauthentication } from 'components/page/index';
import PERMISSIONS from 'config/app-permission.config';
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
      <Permission permission={PERMISSIONS.SETUP_COMPANYPROFILE_ORGANISATIONALCHART_UPDATE} errorComponent={<Unauthentication />}>
        <Panel panelTitle="Organisational Chart" contentClasses="pl-lg pr-lg pt-lg pb-lg">
          <Row>
            <Col className="gutter-row field-label pb-md" span={24}>
              <TeamTree draggable teams={sortingTeams} setTeams={setSortingTeam} />
            </Col>
            <Col className="gutter-row field-value" span={24}>
              <Button type="danger" size="small" onClick={() => { sortDepartment(sortingTeams, () => { setSortableViewVisible(false); }); }}>
                <Icon type="save" />{ formatMessage({ id: 'global.ui.button.save' }) }
              </Button>
              <Button className="ml-lg" size="small" onClick={() => { setSortableViewVisible(false); }}>
                <Icon type="close" />{ formatMessage({ id: 'global.ui.button.cancel' }) }
              </Button>
            </Col>
          </Row>
        </Panel>
      </Permission>
    );
  }
}

SortView.propTypes = {
  intl: intlShape.isRequired,
};

const mapStateToProps = ({ setup }) => ({
  sortingTeams: setup.orgChart.sortingTeams,
});
const mapDispatchToProps = {
  setSortableViewVisible,
  sortDepartment,
  setSortingTeam,
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(SortView));

