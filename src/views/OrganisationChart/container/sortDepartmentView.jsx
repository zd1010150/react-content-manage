/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setTeams } from 'store/global/action';
import { intlShape, injectIntl } from 'react-intl';
import { Button, Row, Col, Icon } from 'antd';
import { Panel } from 'components/ui/index';
import { TeamTree } from 'components/page/index';
import { setSortableViewVisible, sortDepartment } from '../flow/action';

class SortView extends React.Component {
  render() {
    const { sortDepartment, setSortableViewVisible } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <Panel panelTitle="Organisational Chart" contentClasses="pl-lg pr-lg pt-lg">
        <Row>
          <Col className="gutter-row field-label" span={24}>
            <TeamTree draggable />
          </Col>
          <Col className="gutter-row field-value" offset={2} span={24}>
            <Button type="danger" onClick={() => { sortDepartment(() => { setSortableViewVisible(false); }); }}>
              <Icon type="save" />{ formatMessage({ id: 'global.ui.button.save' }) }
            </Button>
            <Button className="ml-lg" onClick={() => { setSortableViewVisible(false); }}>
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

const mapStateToProps = ({ global }) => ({
  teams: global.settings.teams,
});
const mapDispatchToProps = {
  setSortableViewVisible,
  sortDepartment,
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(SortView));

