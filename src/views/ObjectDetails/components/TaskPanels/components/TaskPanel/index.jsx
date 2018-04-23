/* eslint arrow-parens: ["error", "as-needed"] */
import { Button, Icon, Popconfirm, Table } from 'antd';
import classNames from 'classnames/bind';
import { Panel } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Enums from 'utils/EnumsManager';
import styles from './index.less';
import { tryFetchModuleData } from '../../flow/actions';

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
const { PageSizeSmall } = DefaultPageConfigs;


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
    const {
      code,
      objectId,
      objectType,
      tryFetchModuleData,
    } = this.props;
    tryFetchModuleData(code, objectType, objectId, { per_page: PageSizeSmall });
  }

  enableBtnByModule = () => {
    const { code } = this.props;
    if (code === TaskOpen
      || code === EmailSent
      || code === Attachments) {
      return true;
    }
    return false;
  }

  handleTableChange = pagination => {
    const {
      code,
      objectType,
      objectId,
      tryFetchModuleData,
    } = this.props;
    const params = pagination ? {
      page: pagination.current,
      per_page: PageSizeSmall,
    } : {};
    tryFetchModuleData(code, objectType, objectId, params);
  }

  parsePagination = meta => {
    let extraParams = {};
    if (!_.isEmpty(meta)) {
      const { pagination } = meta;
      const { current_page, total } = pagination;
      extraParams = {
        current: current_page,
        total,
      };
    }
    return {
      pageSize: PageSizeSmall,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      ...extraParams,
    };
  }

  renderColumnsByModule = () => {
    const { intl, code, objectType } = this.props;
    const { formatMessage } = intl;
    const i18n = 'global.ui.table';

    let columns = [];
    let editLink = '';
    let deleteLink = '';
    switch (code) {
      case TaskOpen:
        editLink = `${objectType}/tasks`;
      case TaskHistory:
        columns = [
          {
            dataIndex: 'subject',
            title: formatMessage({ id: `${i18n}.subject` }),
          },
          {
            dataIndex: 'status',
            title: formatMessage({ id: `${i18n}.status` }),
          },
          {
            dataIndex: 'due_date',
            title: formatMessage({ id: `${i18n}.dueOn` }),
          },
          {
            dataIndex: 'due_time',
            title: formatMessage({ id: `${i18n}.dueAt` }),
          },
          {
            dataIndex: 'updated_at',
            title: formatMessage({ id: `${i18n}.lastModifiedAt` }),
          },
        ];
        break;
      case Opportunities:
        break;
      case EmailSent:
        columns = [
          {
            dataIndex: 'subject',
            title: formatMessage({ id: `${i18n}.subject` }),
          },
          {
            dataIndex: 'sent_date',
            title: formatMessage({ id: `${i18n}.sentDate` }),
          },
          {
            dataIndex: 'open_date',
            title: formatMessage({ id: `${i18n}.openDate` }),
          },
          {
            dataIndex: 'open_times',
            title: formatMessage({ id: `${i18n}.openTimes` }),
          },
          {
            dataIndex: 'last_open',
            title: formatMessage({ id: `${i18n}.lastOpenAt` }),
          },
        ];
        break;
      case Attachments:
        columns = [
          {
            dataIndex: 'title',
            title: formatMessage({ id: `${i18n}.title` }),
          },
          {
            dataIndex: 'type',
            title: formatMessage({ id: `${i18n}.type` }),
          },
          {
            dataIndex: 'uploaded_at',
            title: formatMessage({ id: `${i18n}.uploadAt` }),
          },
          {
            dataIndex: 'created_by',
            title: formatMessage({ id: `${i18n}.createBy` }),
          },
        ];
        break;
      case Logs:
        columns = [
          {
            dataIndex: 'updated_at',
            title: formatMessage({ id: `${i18n}.date` }),
          },
          {
            dataIndex: 'causer.name',
            title: formatMessage({ id: `${i18n}.user` }),
          },
          {
            dataIndex: 'description',
            title: formatMessage({ id: `${i18n}.action` }),
          },
        ];
        break;
      default:
        console.log('The module is not found.');
    }
    // TODO: need to add checking about permissions of edit and delete to decide whether shows 'Action' column
    if (code === TaskOpen
        || code === Attachments
        || code === Opportunities) {
      columns.unshift({
        key: 'actions',
        className: cx('firstCol'),
        title: formatMessage({ id: `${i18n}.action` }),
        render: (text, record) => {
          const { id } = record;
          return (
            <Fragment>
              <Link to={`/${editLink}/${id}`}>
                <Icon className="cursor-pointer" size="small" type="edit" />
              </Link>
              <Popconfirm
                placement="right"
                title={formatMessage({ id: 'global.ui.dialog.deleteTitle' })}
                okText="Yes"
                cancelText="No"
                onConfirm={() => console.log(`${code}-${id}`)}
              >
                <Icon className="ml-sm cursor-pointer" size="small" type="delete" />
              </Popconfirm>
            </Fragment>
          );
        },
      });
    }
    return columns;
  }

  render() {
    const {
      intl,
      canAdd,
      code,
      tasks,
      theme,
    } = this.props;
    const { formatMessage } = intl;
    const i18n = 'global.ui.detailModules';

    const source = !_.isEmpty(tasks[code]) ? tasks[code] : {};
    const { data, meta } = source;

    return (
      <Panel
        panelTitle={formatMessage({ id: `${i18n}.${code}` })}
        panelClasses={`${theme}-theme-panel`}
        actionsRight={this.enableBtnByModule() && (
          <Button size="small">
            + {formatMessage({ id: `${i18n}.${code}` })}
          </Button>
        )}
      >
        <Table
          columns={this.renderColumnsByModule()}
          dataSource={data}
          onChange={this.handleTableChange}
          pagination={this.parsePagination(meta)}
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
  tryFetchModuleData,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TaskPanel));
