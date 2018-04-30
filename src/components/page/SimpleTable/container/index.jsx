/* eslint arrow-parens: ["error", "as-needed"] */
import { Button, Icon, Popconfirm, Table } from 'antd';
import { Panel } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Enums from 'utils/EnumsManager';
import { toTimezone } from 'utils/dateTimeUtils';
import { tryDeleteById, tryFetchData } from '../flow/actions';

const {
  FieldTypes,
  ObjectTypes,
  PhantomId,
  ThemeTypes,
} = Enums;
const {
  DateOnly,
  DateTime,
  Email,
  LongText,
  Lookup,
  NumberInput,
  PickList,
  TextInput,
} = FieldTypes;
const { Accounts, Opportunities } = ObjectTypes;


const propTypes = {
  intl: intlShape.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  objectId: PropTypes.string.isRequired,
  theme: PropTypes.oneOf([ThemeTypes.Accounts]).isRequired,
};


class SimpleTable extends Component {
  componentDidMount() {
    const { objectId, tryFetchData } = this.props;
    tryFetchData(objectId);
  }

  handleDeleteClick = id => this.props.tryDeleteById(id, this.props.objectId)

  handleTableChange = pagination => {
    const params = {
      page: pagination.current,
      per_page: pagination.pageSize,
    };
    const { objectId, tryFetchData } = this.props;
    tryFetchData(objectId, params);
  }

  parsePagination = meta => {
    const { pagination } = meta;

    if (!meta || !pagination || pagination.total_pages < 2) {
      return false;
    }
    return {
      pageSize: pagination.per_page,
      total: pagination.total,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    };
  }

  renderColumnByType = (type, column) => {
    const configs = {
      title: column.field_label,
      dataIndex: column.field_name,
    };
    const extraConfigs = {};

    switch (type) {
      case DateOnly:
      case DateTime:
        extraConfigs.render = text => toTimezone(text, '+1100', 'YYYY-MM-DD');
        break;
      case Lookup:
        extraConfigs.dataIndex = `${column.field_name}.${column.lookup_own_field_name}`;
        break;
      case PickList:
      case Email:
      case LongText:
      case NumberInput:
      case TextInput:
        // As requested, we use Name and Email fields as a entry point to object details
        if (column.field_name === 'name'
            || column.field_name === 'email') {
          const { theme } = this.props;
          extraConfigs.render = (text, record) => (
            <Link
              className={`${theme}-theme-text`}
              to={`/${Opportunities}/${record.id}`}
            >
              {text}
            </Link>
          );
        }
        break;
      default:
        throw new Error('No such type is found when set up column.');
    }

    return {
      ...configs,
      ...extraConfigs,
    };
  }

  renderColumns = data => {
    const { intl } = this.props;
    const { formatMessage } = intl;
    const me = this;
    const columns = data.map(column => me.renderColumnByType(column.crm_data_type, column));
    columns.unshift({
      title: formatMessage({ id: 'global.ui.table.action' }),
      key: 'actions',
      width: 80,
      render: (text, record) => (
        <Fragment>
          <Link to={`/${Opportunities}/${record.id}`}>
            <Icon className="cursor-pointer" size="small" type="edit" />
          </Link>
          <Popconfirm
            title={formatMessage({ id: 'global.ui.dialog.deleteTitle' })}
            onConfirm={() => me.handleDeleteClick(record.id)}
            placement="right"
          >
            <Icon className="cursor-pointer ml-sm" size="small" type="delete" />
          </Popconfirm>
        </Fragment>
      ),
    });
    return columns;
  }

  render() {
    const {
      intl,
      theme,
      columns,
      data,
      meta,
      objectId,
    } = this.props;
    const { formatMessage } = intl;

    return (
      <Panel
        contentClasses="pb-lg"
        panelClasses={`${theme}-theme-panel`}
        panelTitle={formatMessage({ id: 'global.properNouns.opportunities' })}
        actionsRight={
          <Link to={`/${Accounts}/${objectId}/${Opportunities}/${PhantomId}`}>
            <Button size="small">
              <Icon type="plus" />
              {formatMessage({ id: 'global.ui.button.newOpport' })}
            </Button>
          </Link>
        }
      >
        <Table
          columns={this.renderColumns(columns)}
          dataSource={data}
          pagination={this.parsePagination(meta)}
          rowKey="id"
          size="small"
          onChange={this.handleTableChange}
        />
      </Panel>
    );
  }
}


SimpleTable.propTypes = propTypes;
const mapStateToProps = ({ global, accountOpportunities }) => ({
  language: global.language,
  columns: accountOpportunities.columns,
  data: accountOpportunities.data,
  meta: accountOpportunities.meta,
});
const mapDispatchToProps = {
  tryDeleteById,
  tryFetchData,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SimpleTable));
