/* eslint arrow-parens: ["error", "as-needed"] */
/* eslint-disable no-fallthrough */
import { Button, Icon, Table } from 'antd';
import classNames from 'classnames/bind';
import { Panel, PopDeleteConfirm } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Enums from 'utils/EnumsManager';
import { toTimezone } from 'utils/dateTimeUtils';
import styles from './index.less';
import { tryDeleteAttachment, tryDeleteTask, tryFetchModuleData } from '../../flow/actions';

const cx = classNames.bind(styles);

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


class Subpanel extends Component {
  componentDidMount() {
    const {
      code,
      objectId,
      objectType,
      tryFetchModuleData,
    } = this.props;
    tryFetchModuleData(code, objectType, objectId, { per_page: PageSizeSmall });
  }

  getActionBtnByModule = () => {
    const {
      intl,
      code,
      objectId,
      objectType,
    } = this.props;
    const { formatMessage } = intl;
    const i18n = 'global.ui.button';

    let link = '';
    switch (code) {
      case TaskOpen:
        link = `/${objectType}/${objectId}/tasks/${PhantomId}`;
        break;
      case EmailSent:
        link = `/${objectType}/${objectId}/email/new`;
        break;
      case Attachments:
        link = `/${objectType}/${objectId}/attachments`;
        break;
      case TaskHistory:
      case Logs:
      default:
        return null;
    }
    return (
      <Link to={link}>
        <Button size="small">
          <Icon size="small" type="plus" />
          {formatMessage({ id: `${i18n}.${code}` })}
        </Button>
      </Link>
    );
  }

  handleDeleteByModule = (code, id) => {
    const {
      objectId,
      objectType,
      tryDeleteTask,
      tryDeleteAttachment,
    } = this.props;
    switch (code) {
      case TaskOpen:
        return tryDeleteTask(code, id, objectType, objectId);
      case Attachments:
        return tryDeleteAttachment(code, id, objectType, objectId);
      default:
        console.log('no such code has been found.');
    }
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
    // hide pagination if unnecessary
    if (!_.isObject(meta)
        || !_.isObject(meta.pagination)
        || meta.pagination.total <= PageSizeSmall) {
      return false;
    }

    const { pagination } = meta;
    const { current_page, total } = pagination;
    return {
      pageSize: PageSizeSmall,
      showTotal: (totalNums, range) => `${range[0]}-${range[1]} of ${totalNums} items`,
      current: current_page,
      total,
    };
  }

  renderColumnsByModule = () => {
    const {
      intl,
      code,
      objectId,
      objectType,
      priorities,
      statuses,
      categories,
    } = this.props;
    const { formatMessage } = intl;
    const i18n = 'global.ui.table';

    let columns = [];
    let editLink = '';
    switch (code) {
      case TaskOpen:
        editLink = `${objectType}/${objectId}/tasks`;
      case TaskHistory:
        columns = [
          {
            dataIndex: 'subject',
            title: formatMessage({ id: `${i18n}.subject` }),
          },
          {
            dataIndex: 'status_code',
            title: formatMessage({ id: `${i18n}.status` }),
            render: text => {
              const status = statuses.find(status => status.id === text);
              return status ? status.display_value : null;
            },
          },
          {
            dataIndex: 'priority_code',
            title: formatMessage({ id: `${i18n}.priority` }),
            render: text => {
              const priority = priorities.find(priority => priority.id === text);
              return priority ? priority.display_value : null;
            },
          },
          {
            dataIndex: 'due_date',
            title: formatMessage({ id: `${i18n}.dueOn` }),
          },
          {
            dataIndex: 'updated_at',
            title: formatMessage({ id: `${i18n}.lastModifiedAt` }),
            render: text => toTimezone(text, true),
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
            dataIndex: 'created_at',
            title: formatMessage({ id: `${i18n}.sentDate` }),
            render: text => toTimezone(text, true),
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
            dataIndex: 'updated_at',
            title: formatMessage({ id: `${i18n}.lastModifiedAt` }),
            render: text => toTimezone(text, true),
          },
        ];
        break;
      case Attachments:
        columns = [
          {
            dataIndex: 'category',
            title: formatMessage({ id: `${i18n}.category` }),
            render: text => {
              const category = categories.find(category => category.id === text);
              return category ? category.display_value : null;
            },
          },
          {
            dataIndex: 'type',
            title: formatMessage({ id: `${i18n}.type` }),
          },
          {
            dataIndex: 'created_at',
            title: formatMessage({ id: `${i18n}.uploadAt` }),
            render: text => toTimezone(text, true),
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
    if (code === TaskOpen || code === Opportunities) {
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
              <PopDeleteConfirm
                placement="right"
                onConfirm={() => this.handleDeleteByModule(code, id)}
              >
                <Icon className="ml-sm cursor-pointer" type="delete" />
              </PopDeleteConfirm>
            </Fragment>
          );
        },
      });
    } else if (code === Attachments) {
      columns.unshift({
        key: 'actions',
        className: cx('firstCol'),
        title: formatMessage({ id: `${i18n}.action` }),
        render: (text, record) => {
          const { id } = record;
          return (
            <Fragment>
              <Link target="_blank" to={record.url}>
                <Icon style={{fontWeight: 400 }} className="cursor-pointer" size="small" type="eye" />
              </Link>
              <PopDeleteConfirm
                placement="right"
                onConfirm={() => this.handleDeleteByModule(code, id)}
              >
                <Icon className="ml-sm cursor-pointer" type="delete" />
              </PopDeleteConfirm>
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

    const pagination = this.parsePagination(meta);

    return (
      <Panel
        panelTitle={formatMessage({ id: `${i18n}.${code}` })}
        panelClasses={`${theme}-theme-panel`}
        contentClasses={pagination ? '' : 'pb-lg'}
        actionsRight={this.getActionBtnByModule()}
      >
        <Table
          columns={this.renderColumnsByModule()}
          dataSource={data}
          onChange={this.handleTableChange}
          pagination={pagination}
          rowKey="id"
          size="small"
        />
      </Panel>
    );
  }
}


const mapStateToProps = ({ global, clientDetails }) => ({
  language: global.language,
  categories: global.settings.categories,
  priorities: global.settings.priorities,
  statuses: global.settings.statuses,
  tasks: clientDetails.subpanels,
});
const mapDispatchToProps = {
  tryDeleteAttachment,
  tryDeleteTask,
  tryFetchModuleData,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Subpanel));
