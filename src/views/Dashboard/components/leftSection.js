import { Button, Col, Icon, Row, Tooltip } from 'antd';
import classNames from 'classnames/bind';
import { Panel } from 'components/ui/index';
import { objTypeAndClassTypeMap } from 'config/app.config';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Link, withRouter } from 'react-router-dom';
import { toTimezone } from 'utils/dateTimeUtils';
import styles from '../index.less';


const cx = classNames.bind(styles);

class LeftSection extends React.Component {
  getStatus(statusCode) {
    const { taskStatus } = this.props;
    const s = _.find(taskStatus, { id: statusCode });
    if (!_.isEmpty(s)) return s.display_value;
    return '';
  }
  render() {
    const {
      leads, accounts, objects, activities, intl, history, setRouteInfo,
    } = this.props;
    const { formatMessage } = intl;
    const rightActions = (<Button
      key="addBtn"
      className="btn-ellipse ml-sm"
      size="small"
      icon="eye"
      onClick={() => {
                history.push('/Task');
                setRouteInfo('dashboard');
            }}
    >
      { formatMessage({ id: 'global.ui.button.viewAll' })}
    </Button>);
    return (
      <div>
        <Row>
          <Col className="gutter-row mr-md" span={7} >
            <Panel panelTitle={formatMessage({ id: 'page.dashboard.newLeads' })}>
              <ul className={cx('links')}>
                { leads.map(l =>
                  (<li key={l.id} className={cx('single-link')}>
                    <Link title={l.name} className={`${objTypeAndClassTypeMap.leads}-theme-text`} to={`leads/${l.id}`}>{l.name}</Link>
                  </li>))

                }
              </ul>
            </Panel>
          </Col>
          <Col className="gutter-row mr-md" span={7}>
            <Panel panelTitle={formatMessage({ id: 'page.dashboard.newAccounts' })} >
              <ul className={cx('links')}>
                { accounts.map(l =>
                  (<li key={l.id} className={cx('single-link')}>
                    <Link title={l.name} className={`${objTypeAndClassTypeMap.accounts}-theme-text`} to={`accounts/${l.id}`}>{l.name}</Link>
                   </li>)) }
              </ul>
            </Panel>
          </Col>
          <Col className="gutter-row" span={7}>
            <Panel panelTitle={formatMessage({ id: 'page.dashboard.newObjects' })} >
              <ul className={cx('links')}>
                { objects.map(l =>
                  (<li key={l.id} className={cx('single-link')}>
                    <Link title={l.name} className={`${objTypeAndClassTypeMap[l.object_type]}-theme-text`} to={`${l.object_type}/${l.id}`}>{l.name}</Link>
                  </li>)) }
              </ul>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col className="gutter-row" span={22} >
            <Panel panelTitle={formatMessage({ id: 'page.dashboard.openActivity' })} panelClasses="grey-header-panel" actionsRight={rightActions}>
              <table className={cx('task-table')}>
                <tbody>
                  {activities.map(a => (<tr key={a.id} className={cx('task-tr')}>
                    <td className={cx('task-td')}>
                      <div className="clearfix">
                        <span className="pull-left text-bolder test123">
                          {a.relate_user ? (
                            <Link
                              className="text-bolder"
                              to={`/${a.taskable_type}/${a.relate_user.id}/tasks/${a.id}`}
                            >
                              {a.subject}
                            </Link>
                          ) : a.subject
                          }
                        </span>
                        <span className="pull-right text2">
                          { this.getStatus(a.status_code) }
                        </span>
                      </div>
                      <div className="clearfix">
                        {a.relate_user ? (
                          <Link to={`${a.taskable_type}/${a.relate_user.id}`}>
                            <span className={`${objTypeAndClassTypeMap[a.taskable_type]}-theme-text pull-left`}>
                              {a.relate_user.name}
                            </span>
                          </Link>
                        ) : <span className={`${objTypeAndClassTypeMap[a.taskable_type]}-theme-text pull-left`}>-</span>}
                        <span className="pull-right text2">
                          <Tooltip title="Due date">
                            <Icon type="clock-circle-o" className="mr-sm" />
                          </Tooltip>
                          {toTimezone(a.due_date)}
                        </span>
                      </div>
                    </td>
                                        </tr>))}
                </tbody>
              </table>
            </Panel>
          </Col>
        </Row>

      </div>
    );
  }
}
LeftSection.propTypes = {
  intl: intlShape.isRequired,
  leads: PropTypes.array.isRequired,
  accounts: PropTypes.array.isRequired,
  objects: PropTypes.array.isRequired,
  activities: PropTypes.array.isRequired,
  taskStatus: PropTypes.array.isRequired,
};
export default withRouter(injectIntl(LeftSection));
