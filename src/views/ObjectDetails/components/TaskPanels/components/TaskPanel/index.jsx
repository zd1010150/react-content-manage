import { Button, Icon, Popconfirm, Table } from 'antd';
import classNames from 'classnames/bind';
import { Panel } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Enums from 'utils/EnumsManager';
import { mapToAPIOrderStr } from 'utils/common';
import styles from './index.less';
import { tryFetchTaskByModule, setTaskData } from '../../flow/actions';

const cx = classNames.bind(styles);


const {
  DefaultPageConfigs,
  DetailModules,
  DetailModulesInArray,
  ThemeTypes,
  ThemeTypesInArray,
} = Enums;
const {
  Attachments,
  EmailSent,
  Logs,
  Opportunities,
  TaskOpen,
  TaskHistory,
} = DetailModules;
// presets
const getColumnsByModule = (module, intl) => {
  const { formatMessage } = intl;
  const i18nPrefix = 'global.ui.table';
  let columns = [];
  switch (module) {
    case TaskOpen:
    case TaskHistory:
      columns = [
        {
          dataIndex: 'subject',
          title: formatMessage({ id: `${i18nPrefix}.subject` }),
          sorter: true,
        },
        {
          dataIndex: 'status',
          title: formatMessage({ id: `${i18nPrefix}.status` }),
          sorter: true,
        },
        {
          dataIndex: 'due_date',
          title: formatMessage({ id: `${i18nPrefix}.dueOn` }),
          sorter: true,
        },
        {
          dataIndex: 'due_time',
          title: formatMessage({ id: `${i18nPrefix}.dueAt` }),
          sorter: true,
        },
        {
          dataIndex: 'last_modified_at',
          title: formatMessage({ id: `${i18nPrefix}.lastModifiedAt` }),
          sorter: true,
        },
      ];
      break;
    case Opportunities:
    case EmailSent:
      columns = [
        {
          dataIndex: 'subject',
          title: formatMessage({ id: `${i18nPrefix}.subject` }),
          sorter: true,
        },
        {
          dataIndex: 'sent_date',
          title: formatMessage({ id: `${i18nPrefix}.sentDate` }),
          sorter: true,
        },
        {
          dataIndex: 'open_date',
          title: formatMessage({ id: `${i18nPrefix}.openDate` }),
          sorter: true,
        },
        {
          dataIndex: 'open_times',
          title: formatMessage({ id: `${i18nPrefix}.openTimes` }),
          sorter: true,
        },
        {
          dataIndex: 'last_open',
          title: formatMessage({ id: `${i18nPrefix}.lastOpenAt` }),
          sorter: true,
        },
      ];
    case Attachments:
      columns = [
        {
          dataIndex: 'title',
          title: formatMessage({ id: `${i18nPrefix}.title` }),
          sorter: true,
        },
        {
          dataIndex: 'type',
          title: formatMessage({ id: `${i18nPrefix}.type` }),
          sorter: true,
        },
        {
          dataIndex: 'uploaded_at',
          title: formatMessage({ id: `${i18nPrefix}.uploadAt` }),
          sorter: true,
        },
        {
          dataIndex: 'created_by',
          title: formatMessage({ id: `${i18nPrefix}.createBy` }),
          sorter: true,
        },
      ];
    case Logs:
      columns = [
        {
          dataIndex: 'date',
          title: formatMessage({ id: `${i18nPrefix}.date` }),
          sorter: true,
        },
        {
          dataIndex: 'user',
          title: formatMessage({ id: `${i18nPrefix}.user` }),
          sorter: true,
        },
        {
          dataIndex: 'action',
          title: formatMessage({ id: `${i18nPrefix}.action` }),
          sorter: true,
        },
      ];
      break;
    default:
      console.log('The module is not found.');
  }
  // TODO: need to add checking about permissions of edit and delete to decide whether shows 'Action' column
  if (module !== Logs) {
    columns.unshift({
      key: 'actions',
      className: cx('firstCol'),
      title: formatMessage({ id: `${i18nPrefix}.action` }),
      render: (text, record) => {
        const { id } = record;
        return (
          <Fragment>
            <Link to="#">
              <Icon size="small" type="edit" />
            </Link>
            <Popconfirm
              placement="right"
              title={formatMessage({ id: 'global.ui.dialog.deleteTitle' })}
              okText="Yes"
              cancelText="No"
              onConfirm={$ => console.log(`${module}` + ' test')}
            >
              <Icon className="ml-sm" size="small" type="delete" />
            </Popconfirm>
          </Fragment>
        );
      },
    });
  }
  return columns;
};


const defaultProps = {
  canAdd: false,
  canDelete: false,
  canEdit: false,
  module: DetailModulesInArray.taskOpen,
  tasks: {},
  theme: ThemeTypes.Lead,
};
const propTypes = {
  intl: intlShape.isRequired,
  canAdd: PropTypes.bool.isRequired,
  canDelete: PropTypes.bool.isRequired,
  canEdit: PropTypes.bool.isRequired,
  tryFetchTaskByModule: PropTypes.func,
  module: PropTypes.oneOf(DetailModulesInArray).isRequired,
  tasks: PropTypes.object.isRequired,
  theme: PropTypes.oneOf(ThemeTypesInArray).isRequired,
};


class TaskPanel extends Component {
  componentDidMount() {
    const { objectId, module, tryFetchTaskByModule } = this.props;
    // fetch task data by module type
    // 
  }

  onTableChange = (pagination, sorter, module) => {
    const { columnKey, order } = sorter;
    const a = mapToAPIOrderStr(order);
  }

  render() {
    const {
      intl,
      canAdd,
      module,
      tasks,
      theme,
    } = this.props;
    const { formatMessage } = intl;
    const i18nPrefix = 'global.ui.detailModules';

    const { data, current } = tasks[module];
    const columns = getColumnsByModule(module, intl);

    return (
      <Panel
        panelTitle={formatMessage({ id: `${i18nPrefix}.${module}` })}
        panelClasses={`${theme}-theme-panel`}
        actionsRight={canAdd && (
          <Button size="small">
            + {formatMessage({ id: `${i18nPrefix}.${module}` })}
          </Button>
        )}
      >
        <Table
          columns={columns}
          dataSource={data}
          onChange={(pagination, filters, sorter) => this.onTableChange(pagination, sorter, module)}
          pagination={{
            current,
            pageSize: DefaultPageConfigs.PageSizeSmall,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            total: 100,
          }}
          rowKey="id"
          size="small"
        />
      </Panel>
    );
  }
}


const mapStateToProps = ({ global, objectDetails }) => ({
  language: global.language,
  tasks: objectDetails.tasks,
});
const mapDispatchToProps = {
  tryFetchTaskByModule,
  setTaskData,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TaskPanel));
