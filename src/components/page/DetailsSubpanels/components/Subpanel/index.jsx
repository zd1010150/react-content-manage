/* eslint arrow-parens: ["error", "as-needed"] */
/* eslint-disable no-fallthrough */
import { Button, Icon, Table, Tooltip } from 'antd';
import classNames from 'classnames/bind';
import { Panel, PopDeleteConfirm } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getThemeByType } from 'utils/common';
import { toTimezone } from 'utils/dateTimeUtils';
import Enums from 'utils/EnumsManager';
import { tryDeleteAttachment, tryDeleteInvoice, tryDeleteTask, tryFetchModuleData } from '../../flow/actions';
import { setRouteInfo } from '../../../TaskDetails/flow/actions';
import styles from './index.less';

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
  Invoice,
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
      setRouteInfo,
    } = this.props;
    setRouteInfo(objectType);
    this.props.tryFetchModuleData(
      code,
      objectType,
      objectId,
      { per_page: PageSizeSmall },
    );
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
        link = `/${objectType}/${objectId}/attachments/${PhantomId}`;
        break;
      case Invoice:
        link = `/${objectType}/${objectId}/invoice/${PhantomId}`;
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
      tryDeleteInvoice,
    } = this.props;
    switch (code) {
      case TaskOpen:
        return tryDeleteTask(code, id, objectType, objectId);
      case Attachments:
        return tryDeleteAttachment(code, id, objectType, objectId);
      case Invoice:
        return tryDeleteInvoice(code, id, objectType, objectId);
      default:
        return console.warn('Current code has no delete handler!');
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
      theme,
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
            key: 'related_to',
            title: formatMessage({ id: `${i18n}.relatedTo` }),
            render: (text, record) => {
              if (objectType !== record.taskable_type) {
                return (
                  <Link
                    className={`${theme}-theme-text`}
                    to={`/${objectType}/${objectId}/${record.taskable_type}/${record.relate_user.id}`}
                  >
                    {record.relate_user.name}
                  </Link>
                );
              }
              return record.relate_user.name;
            },
          },
          {
            dataIndex: 'subject',
            title: formatMessage({ id: `${i18n}.subject` }),
            render: (text, record) => {
              if (code === TaskOpen) {
                return (
                  <Link
                    className={`${theme}-theme-text`}
                    to={`/${objectType}/${objectId}/tasks/history/${record.id}`}
                  >
                    {text}
                  </Link>
                );
              }
              if (code === TaskHistory) {
                return (
                  <Link
                    className={`${theme}-theme-text`}
                    to={`/${editLink}/${record.id}`}
                  >
                    {text}
                  </Link>
                );
              }
            },
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
            render: text => toTimezone(text),
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
        editLink = `${objectType}/${objectId}/attachments`;
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
          {
            dataIndex: 'comment',
            className: 'truncate',
            width: '30%',
            title: formatMessage({ id: `${i18n}.comment` }),
            render: text => (
              <Tooltip placement="topLeft" title={text}>
                {text}
              </Tooltip>
            ),
          },
        ];
        break;
      case Logs:
        columns = [
          {
            dataIndex: 'created_at',
            title: formatMessage({ id: `${i18n}.date` }),
            render: text => toTimezone(text, true),
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
      case Invoice:
        editLink = `${objectType}/${objectId}/invoice`;
        columns = [
          {
            dataIndex: 'invoice_no',
            title: formatMessage({ id: `${i18n}.invoiceNo` }),
          },
          {
            key: 'related_to',
            title: formatMessage({ id: `${i18n}.relatedTo` }),
            render: (text, record) => (
              <Link
                className={`${getThemeByType(record.invoice_able_type)}-theme-text`}
                to={`/${record.invoice_able_type}/${record.invoice_able_id}`}
              >
                {record.invoice_able.name}
              </Link>
            ),
          },
          {
            dataIndex: 'status',
            title: formatMessage({ id: `${i18n}.status` }),
          },
          {
            dataIndex: 'due_date',
            title: formatMessage({ id: `${i18n}.dueOn` }),
            render: text => toTimezone(text, false),
          },
          {
            dataIndex: 'last_modified_by_user',
            title: formatMessage({ id: `${i18n}.modifiedBy` }),
          },
          {
            dataIndex: 'updated_at',
            title: formatMessage({ id: `${i18n}.lastModifiedAt` }),
            render: text => toTimezone(text, false),
          },
        ];
        break;
      default:
        console.log('The module is not found.');
    }
    // TODO: need to add checking about permissions of edit and delete to decide whether shows 'Action' column
    if (code === TaskOpen || code === Opportunities || code === Invoice) {
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
                <Icon style={{ fontWeight: 400 }} className="cursor-pointer" size="small" type="eye" />
              </Link>
              <Link to={`/${editLink}/${id}`}>
                <Icon className="cursor-pointer ml-sm" size="small" type="edit" />
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
    } else if (code === TaskHistory) {
      columns.unshift({
        key: 'actions',
        className: cx('firstCol'),
        title: formatMessage({ id: `${i18n}.action` }),
        render: (text, record) => (
          <Link to={`/${objectType}/${objectId}/tasks/history/${record.id}`}>
            <Icon style={{ fontWeight: 400 }} className="cursor-pointer" size="small" type="eye" />
          </Link>
        ),
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
          className="fixedTable"
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


Subpanel.defaultProps = defaultProps;
Subpanel.propTypes = propTypes;
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
  tryDeleteInvoice,
  setRouteInfo,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Subpanel));
