import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import { Table, Button } from 'antd';
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);

import { Panel } from 'components/ui/index';
import Enums from 'utils/EnumsManager';
const { MaxDisplayResults, ThemeTypes } = Enums;
const { Leads, Accounts } = ThemeTypes;


// presets
const i18n = 'global.ui';

const baseColumns = [
  {
    key: 'firstName',
    dataIndex: 'first_name',
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

const renderColumnsByTheme = (theme, formatMessage) => {
  return baseColumns.map(col => {
    const { key, dataIndex } = col;
    const configs = {};
    if (key === 'firstName' || key === 'email') {
      configs.render = (text, record) => {
        return <Link className={`${theme}-theme-text`} to={`/leads/${record.id}`}>{text}</Link>
      };
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
  theme: Leads,
};
const propTypes = {
  intl: intlShape.isRequired,
  canSelect: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  theme: PropTypes.oneOf([ Leads, Accounts ]).isRequired,
};


const FilterResultsTable = ({
  intl,  
  canSelect,
  data,
  theme,
}) => {

  const { formatMessage } = intl;
  const columns = renderColumnsByTheme(theme, formatMessage);
  const mergeBtn = theme === Leads ? (
    <Link to={`/123`}>
      <Button className={`${theme}-theme-btn`} size="small">
        {formatMessage({ id: `${i18n}.button.mergeLead` })}
      </Button>`
    </Link>
  ) : null;

  return (
    <Panel
      panelTitle={formatMessage({ id: `page.filterResultsTable.${theme}` })}
      panelClasses={`${theme}-theme-panel`}
      actionsRight={mergeBtn}
    >
      {theme === Leads && <p className={cx('rule')}>
        {formatMessage({ id: 'page.filterResultsTable.selectionRule' })}
      </p>}
      {data.length >= MaxDisplayResults && <p className={cx('rule')}>
        {formatMessage({ id: 'page.filterResultsTable.displayRule' })}
      </p>}
      <Table
        columns={columns}
        dataSource={data.length >= MaxDisplayResults
                      ? data.slice(0, -1)
                      : data}
        pagination={false}
        rowKey="id"
      />
    </Panel>
  );
};


FilterResultsTable.defaultProps = defaultProps;
FilterResultsTable.propTypes = propTypes;
export default injectIntl(FilterResultsTable);