/* eslint-disable no-shadow */
import React from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Select, Tree, Button, Row, Col, Icon } from 'antd';
import { Panel } from 'components/ui/index';
import { intlShape, injectIntl } from 'react-intl';
import { fetchTeams } from 'store/global/action';
import { objTypeAndClassTypeMap } from 'config/app.config';
import { saveAssigment, fetchAllLayouts, setLayoutTeam } from '../flow/action';
import styles from '../index.less';
import { getTeamIds } from '../flow/reselect';

const { TreeNode } = Tree;
const cx = classNames.bind(styles);
const { Option } = Select;

class AssignDepartmentContainer extends React.Component {
  onSubmit() {
    const { teamLayouts, objectType, saveAssigment } = this.props;
    saveAssigment(objectType, teamLayouts, () => {
      this.onCancel();
    });
  }
  onCancel() {
    const { history, objectType } = this.props;
    history.push(`/setup/${objectType}/pageLayout`);
  }
  componentDidMount() {
    const {
      fetchTeams, fetchAllLayouts, teams, teamLayouts, objectType,
    } = this.props;
    if (_.isEmpty(teamLayouts)) {
      fetchAllLayouts(objectType);
    }
    if (_.isEmpty(teams)) {
      fetchTeams();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      nextProps.fetchAllLayouts(nextProps.objectType);
    }
  }
  onExpand(expandedKeys) {
    console.log(expandedKeys);
  }
  renderTreeNodes(teams, teamLayouts, allLayout) {
    return teams.map((item) => {
      const treeEl = (
        <div className={cx('tree-node-wrapper')}>
          <span className={cx('tree-title-wrapper')}>
            <span className={cx('tree-title')}>{item.name}</span>
          </span>
          <div className={cx('tree-action')}>
            <Select size="small" value={_.isEmpty(teamLayouts[`${item.id}`]) ? '' : teamLayouts[`${item.id}`]} onChange={value => this.props.setLayoutTeam(`${item.id}`, value)}>
              <Option value=""> Please select a Layout</Option>
              {
                      allLayout.map(l => <Option value={`${l.id}`} key={l.id}>{ l.name }</Option>)
                  }
            </Select>
          </div>
        </div>
      );
      if (!_.isEmpty(item.child_team_rec)) {
        return (
          <TreeNode className={cx('tree-node-line')} title={treeEl} key={item.id}>
            {this.renderTreeNodes(item.child_team_rec, teamLayouts, allLayout)}
          </TreeNode>
        );
      }
      return <TreeNode className={cx('tree-node-line')} title={treeEl} key={item.id} />;
    });
  }
  render() {
    const {
      teams,
      teamLayouts,
      intl,
      objectType,
      allLayout,
      teamIds,
    } = this.props;
    const { formatMessage } = intl;
    const theme = objTypeAndClassTypeMap[objectType];
    return (
      <Panel panelClasses={`${theme}-theme-panel`} panelTitle="Page Layout assignment">
        <Row className="pt-lg pb-lg pl-lg">
          <Col span={24}>
            <Tree
              defaultExpandAll
              expandedKeys={teamIds}
              onExpand={this.onExpand}
            >
              {this.renderTreeNodes(teams, teamLayouts, allLayout)}
            </Tree>
          </Col>
        </Row>
        <Row className="pt-lg pb-lg pl-lg">
          <Col span={24}>
            <Button type="primary" size="small" htmlType="submit" onClick={() => { this.onSubmit(); }}><Icon type="save" />{ formatMessage({ id: 'global.ui.button.save' })}</Button>
            <Button type="danger" size="small" className="ml-sm" onClick={() => { this.onCancel(); }}><Icon type="close" />{ formatMessage({ id: 'global.ui.button.cancel' })}</Button>
          </Col>
        </Row>
      </Panel>

    );
  }
}
AssignDepartmentContainer.propTypes = {
  intl: intlShape.isRequired,
  objectType: PropTypes.string.isRequired,
  teams: PropTypes.array.isRequired,
  allLayout: PropTypes.array.isRequired,
  teamLayouts: PropTypes.object.isRequired,
};
const mapStateToProps = ({ setup, global }) => {
  const {
    tableView,
    assignmentView,
    currentObjectType,
  } = setup.layouts;

  return {
    allLayout: tableView.allLayouts,
    teams: global.settings.teams,
    teamLayouts: assignmentView.teamLayouts,
    objectType: currentObjectType,
    teamIds: getTeamIds(global),
  };
};
const mapDispatchToProps = {
  fetchTeams,
  fetchAllLayouts,
  saveAssigment,
  setLayoutTeam,

};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(AssignDepartmentContainer)));

