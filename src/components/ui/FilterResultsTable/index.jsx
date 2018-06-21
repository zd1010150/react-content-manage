import { Button, Table } from 'antd';
import classNames from 'classnames/bind';
import { Panel } from 'components/ui/index';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import Enums from 'utils/EnumsManager';
import styles from './index.less';

const cx = classNames.bind(styles);
const { MaxDisplayResults, ThemeTypes } = Enums;
const { Leads, Accounts } = ThemeTypes;


// presets
const i18n = 'global.ui';

const baseColumns = [
  {
    key: 'name',
    dataIndex: 'name',
  },
  {
    key: 'lastName',
    dataIndex: 'last_name',
  },
  {
    key: 'email',
    dataIndex: 'email',
  },
  {
    key: 'company',
    dataIndex: 'company',
  },
  {
    key: 'phone',
    dataIndex: 'phone',
  },
];

const renderColumnsByTheme = (objectType, theme, formatMessage) => {
  return baseColumns.map((col) => {
    const { key, dataIndex } = col;
    const configs = {};
    if (key === 'name' || key === 'email') {
      configs.render = (text, record) => (
        <Link
          className={`${theme}-theme-text`}
          to={`/${objectType}/${record.id}`}
        >
          {text}
        </Link>
      );
    }
    return {
      dataIndex,
      title: formatMessage({ id: `${i18n}.table.${key}` }),
      ...configs,
    };
  });
};


const defaultProps = {
  canSelect: false,
  data: [],
  maxSelection: 0,
  selectedRowKeys: [],
  theme: Leads,
};
const propTypes = {
  intl: intlShape.isRequired,
  canSelect: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  maxSelection: PropTypes.number.isRequired,
  onRowSelectionChange: PropTypes.func,
  selectedRowKeys: PropTypes.array.isRequired,
  theme: PropTypes.oneOf([Leads, Accounts]).isRequired,
};


const FilterResultsTable = ({
  intl,
  canSelect,
  data,
  maxSelection,
  objectType,
  onRowSelectionChange,
  selectedRowKeys,
  theme,
}) => {
  const { formatMessage } = intl;
  const columns = renderColumnsByTheme(objectType, theme, formatMessage);
  const mergeBtn = theme === Leads ? (
    <Link to={`/leads/merge`}>
      <Button
        className={`${theme}-theme-btn`}
        disabled={selectedRowKeys.length < 2 || (maxSelection && selectedRowKeys.length > maxSelection)}
        size="small"
      >
        {formatMessage({ id: `${i18n}.button.mergeLead` })}
      </Button>`
    </Link>
  ) : null;

  // TODO: add selectAll checking to avoid when user select records over maxSelection
  const rowSelection = canSelect ? {
    selectedRowKeys,
    getCheckboxProps: record => ({
      disabled: maxSelection && selectedRowKeys.length >= maxSelection && selectedRowKeys.indexOf(record.id) === -1,
    }),
    onChange: (selectedKeys, selectedRows) => {
      if (_.isFunction(onRowSelectionChange)) {
        onRowSelectionChange(selectedKeys, selectedRows);
      }
    },
  } : null;

  return (
    <Panel
      panelTitle={formatMessage({ id: `page.filterResultsTable.${theme}` })}
      panelClasses={`${theme}-theme-panel`}
      actionsRight={mergeBtn}
    >
      {theme === Leads && (
        <p className={cx('rule')}>
          {formatMessage({ id: 'page.filterResultsTable.selectionRule' })}
        </p>
      )}
      {data.length >= MaxDisplayResults && (
        <p className={cx('rule')}>
          {formatMessage({ id: 'page.filterResultsTable.displayRule' })}
        </p>
      )}
      <Table
        className="selectAllDisabled"
        columns={columns}
        dataSource={data.length >= MaxDisplayResults
                      ? data.slice(0, -1)
                      : data}
        pagination={false}
        rowKey="id"
        rowSelection={rowSelection}
        size="small"
      />
    </Panel>
  );
};


FilterResultsTable.defaultProps = defaultProps;
FilterResultsTable.propTypes = propTypes;
export default injectIntl(FilterResultsTable);
