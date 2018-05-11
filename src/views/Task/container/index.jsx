/* eslint-disable no-shadow */
import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Table, Button, Icon, Select } from 'antd';
import { PAGE_ACTION, objTypeAndClassTypeMap } from 'config/app.config';
import { connect } from 'react-redux';
import { Panel } from 'components/ui/index';
import { intlShape, injectIntl } from 'react-intl';
import { setPeriod, queryByPaging, queryByPeriod } from '../flow/action';
import { ALL_STATUS } from '../flow/config';
import { getTreeItemByKey } from 'utils/treeUtil';
import { toTimezone } from 'utils/dateTimeUtils';

const Option = Select.Option;

class TaskListView extends React.Component {
  componentDidMount() {
    const { queryByPaging, taskDataTablePagination } = this.props;
    queryByPaging(taskDataTablePagination.perPage, taskDataTablePagination.currentPage);
  }

  handlePeriodChange(period) {
    const { setPeriod, queryByPeriod } = this.props;
    let start,
      end,
      overDue;
    switch (period) {
      case ALL_STATUS.OVERDUE_TODAY:
        start = moment().format('YYYY-MM-DD');
        end = start;
        overDue = true;
        break;
      case ALL_STATUS.OVERDUE:
        start = '';
        end = '';
        overDue = true;
        break;
      case ALL_STATUS.TOMORROW:
        start = moment().add(1, 'days').format('YYYY-MM-DD');
        end = start;
        overDue = false;
        break;
      case ALL_STATUS.THIS_MONTH:
        start = moment().startOf('months').format('YYYY-MM-DD');
        end = moment().endOf('months').format('YYYY-MM-DD');
        overDue = false;
        break;
      case ALL_STATUS.TODAY:
        start = moment().format('YYYY-MM-DD');
        end = start;
        overDue = false;
        break;
    }
    setPeriod(start, end, overDue);
    queryByPeriod(start, end, overDue);
  }
  getPriorities(p) {
    const { priorities } = this.props;
    const s = _.find(priorities, { id: p });
    if (!_.isEmpty(s)) return s.display_value;
    return '';
  }
  getStatus(statusCode) {
    const { taskStatus } = this.props;
    const s = _.find(taskStatus, { id: statusCode });
    if (!_.isEmpty(s)) return s.display_value;
    return '';
  }

  render() {
    const {
      taskDataTablePagination,
      tasks,
      queryByPaging,
    } = this.props;
    const { formatMessage } = this.props.intl;

    const columns = [
      {
        title: formatMessage({ id: 'global.ui.table.complete' }),
        key: 'id',
        render: record => (
          <span>
            <Link to={`/${record.taskable_type}/${record.relate_user && record.relate_user.id}/tasks/${record.id}/completed`}><Icon type="close" /></Link>
          </span>
        ),
      }, {
        title: formatMessage({ id: 'page.taskDetails.labels.subject' }),
        render: record => (
          <Link to={`/${record.taskable_type}/${record.relate_user && record.relate_user.id}/tasks/${record.id}`}>
            {record.subject}
          </Link>),
      }, {
        title: formatMessage({ id: 'page.taskDetails.labels.dueDate' }),
        dataIndex: 'due_date',
        key: 'due_date',
        render: text => toTimezone(text),
      }, {
        title: formatMessage({ id: 'global.ui.table.user' }),
        render: record => (
          <span className={`${objTypeAndClassTypeMap[record.taskable_type]}-theme-text`}>
            {record.relate_user && record.relate_user.name}
          </span>),
      }, {
        title: formatMessage({ id: 'global.ui.table.status' }),
        render: record => <span>{ this.getStatus(record.status_code)}</span>,
      }, {
        title: formatMessage({ id: 'page.taskDetails.labels.priority' }),
        render: record => <span>{ this.getPriorities(record.priority_code)}</span>,
      },
      {
        title: formatMessage({ id: 'global.ui.table.createDate' }),
        dataIndex: 'created_at',
        render: text => toTimezone(text, true),
      },
      {
        title: formatMessage({ id: 'global.ui.table.uploadAt' }),
        dataIndex: 'updated_at',
        render: text => toTimezone(text, true),
      },
    ];

    const pagination = {
      defaultCurrent: taskDataTablePagination.currentPage,
      current: taskDataTablePagination.currentPage,
      defaultPageSize: taskDataTablePagination.perPage,
      pageSize: taskDataTablePagination.perPage,
      total: taskDataTablePagination.total,
      size: 'small',
      onChange(page, pageSize) {
        queryByPaging(pageSize, page);
      },
    };
    return (
      <Panel panelTitle={formatMessage({ id: 'page.task.myOpenActivity' })} contentClasses="pt-lg pb-lg pl-lg pr-lg">
        <Select defaultValue={ALL_STATUS.OVERDUE_TODAY} style={{ width: 150 }} onChange={val => this.handlePeriodChange(val)}>
          {
              Object.keys(ALL_STATUS).map(key => <Option value={ALL_STATUS[key]} key={key}> { formatMessage({ id: `page.task.${key}` })}</Option>)
            }
        </Select>


        <Table dataSource={tasks} columns={columns} pagination={pagination} className="mt-lg" rowKey="id" size="small" />

      </Panel>
    );
  }
}

const mapStateToProps = ({ task, global }) => ({
  ...task,
  priorities: global.settings.priorities,
  taskStatus: global.settings.statuses,
});
const mapDispatchToProps = {
  setPeriod, queryByPaging, queryByPeriod,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(TaskListView)));
