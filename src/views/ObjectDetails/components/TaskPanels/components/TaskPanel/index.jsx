import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Button, Icon, Popconfirm } from 'antd';
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);

import { Panel } from 'components/ui/index';
import { mapToAPIOrderStr } from 'utils/common';
import Enums from 'utils/EnumsManager';
import { tryFetchTaskByModule, setTaskData } from '../../flow/actions';
const {
  DefaultPageConfigs,
  DetailModules,
  DetailModulesInArray,
  PhantomId,
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
  switch(module) {
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
  };
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
              title={formatMessage({ id: `global.ui.dialog.deleteTitle` })}
              okText="Yes"
              cancelText="No"
              onConfirm={$ => console.log(`${module}` + ' test')}
            >
              <Icon className="ml-sm" size="small" type="delete" />
            </Popconfirm>
          </Fragment>
        );
      }
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
    // tryFetchTaskByModule(objectId, module);
    // test
    const testData = [
      {
        "id": "1c9f0794-7c7a-4e9a-928d-d9e431d18359",
        "subject": "Joan Solomon",
        "status": "closed",
        "due_date": "2002-08-11",
        "due_at": "2018-01-14T02:10:15 -11:00",
        "last_modified_at": "2004-09-14T11:16:39 -10:00"
      },
      {
        "id": "bdfb3c1c-1540-4da6-a751-dee0b64e51a7",
        "subject": "Marla Phillips",
        "status": "pending",
        "due_date": "2010-10-03",
        "due_at": "2017-04-12T06:16:27 -10:00",
        "last_modified_at": "2016-05-16T07:19:45 -10:00"
      },
      {
        "id": "aecc920f-68da-4be7-9934-fa8f02ff08aa",
        "subject": "Mclean Spencer",
        "status": "closed",
        "due_date": "2012-05-30",
        "due_at": "2018-01-12T10:04:31 -11:00",
        "last_modified_at": "2005-01-12T02:39:44 -11:00"
      },
      {
        "id": "3d28cfb9-b574-4cd5-84c0-fbe491e305a4",
        "subject": "Toni Guzman",
        "status": "open",
        "due_date": "2014-09-29",
        "due_at": "2017-02-16T04:44:08 -11:00",
        "last_modified_at": "2016-03-12T09:50:17 -11:00"
      },
      {
        "id": "7c12d165-285d-4b0f-8b8e-3fb0dd83d40b",
        "subject": "Karen Walls",
        "status": "pending",
        "due_date": "2000-04-19",
        "due_at": "2018-01-01T08:57:34 -11:00",
        "last_modified_at": "2000-04-01T09:57:58 -11:00"
      },
      {
        "id": "183b66d3-3b9e-4e21-a0fd-b85da84543a9",
        "subject": "Sanford Bolton",
        "status": "pending",
        "due_date": "2011-01-19",
        "due_at": "2017-02-21T06:22:43 -11:00",
        "last_modified_at": "2009-04-29T07:58:43 -10:00"
      },
      {
        "id": "49b77406-36be-4f65-aae3-e9185356a2ab",
        "subject": "Farrell Galloway",
        "status": "closed",
        "due_date": "2004-05-11",
        "due_at": "2017-08-23T09:25:08 -10:00",
        "last_modified_at": "2008-04-22T09:16:24 -10:00"
      },
      {
        "id": "00696420-2da2-4397-90e4-d922b3877e3c",
        "subject": "Sharron Thomas",
        "status": "closed",
        "due_date": "2008-11-06",
        "due_at": "2018-01-02T02:13:25 -11:00",
        "last_modified_at": "2003-10-31T07:32:37 -11:00"
      },
      {
        "id": "793182aa-de79-4985-a155-a14d0ea1b2d9",
        "subject": "Susanne Moss",
        "status": "open",
        "due_date": "1998-11-23",
        "due_at": "2017-08-24T11:17:02 -10:00",
        "last_modified_at": "2004-10-08T06:54:26 -11:00"
      },
      {
        "id": "5e308df1-9bc7-42ff-8bf1-f6bb62ec00d4",
        "subject": "Samantha Blackwell",
        "status": "closed",
        "due_date": "2014-10-01",
        "due_at": "2018-03-29T12:13:26 -11:00",
        "last_modified_at": "2003-08-30T04:47:41 -10:00"
      },
      {
        "id": "2ca6fb84-3835-445c-ad2f-8e2300ee4b25",
        "subject": "Finch Velasquez",
        "status": "open",
        "due_date": "1991-05-29",
        "due_at": "2017-08-25T10:57:35 -10:00",
        "last_modified_at": "2005-04-28T05:53:42 -10:00"
      },
      {
        "id": "a4246e52-8266-4212-8d92-f31890a8474c",
        "subject": "Marcella Schneider",
        "status": "pending",
        "due_date": "2005-01-30",
        "due_at": "2017-08-29T02:17:06 -10:00",
        "last_modified_at": "2002-08-20T11:52:47 -10:00"
      },
      {
        "id": "d81e97b1-d570-4aca-9ac1-aaacb2fa06c7",
        "subject": "Villarreal Cervantes",
        "status": "pending",
        "due_date": "2005-10-11",
        "due_at": "2017-08-22T08:53:44 -10:00",
        "last_modified_at": "2005-01-03T05:07:51 -11:00"
      },
      {
        "id": "8750f00c-347d-4131-bdd5-251c332c4a2d",
        "subject": "Dillard Clayton",
        "status": "closed",
        "due_date": "1992-08-02",
        "due_at": "2017-03-01T12:42:25 -11:00",
        "last_modified_at": "2005-11-18T06:10:34 -11:00"
      },
      {
        "id": "2773cb8a-cf79-475c-bb04-554dad0c44b3",
        "subject": "Ester Best",
        "status": "pending",
        "due_date": "2000-08-20",
        "due_at": "2017-09-08T08:24:39 -10:00",
        "last_modified_at": "2001-07-18T04:38:29 -10:00"
      }
    ];
    this.props.setTaskData(module, testData);
  }

  onTableChange = (pagination, sorter, module) => {
    const { columnKey, order } = sorter;
    const a = mapToAPIOrderStr(order);
    debugger;
    console.log('on table change');
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
            + {formatMessage({ id: `${i18nPrefix}.${module}`})}
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