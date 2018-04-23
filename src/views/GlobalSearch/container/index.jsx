/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { objTypeAndClassTypeMap } from 'config/app.config';
import { Panel } from 'components/ui/index';
import { injectIntl } from 'react-intl';
import { toTimezone } from 'utils/dateTimeUtils';
import Enums from 'utils/EnumsManager';
import { Link } from 'react-router-dom';

import { fetchResultFromRemote, fetchResultByObjtype } from '../flow/action';


const { FieldTypes } = Enums;
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


class GlobalSearch extends React.Component {
  componentDidMount() {
    const { fetchResultFromRemote, keys } = this.props;
    fetchResultFromRemote(keys);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.keys !== this.props.keys) {
      const { fetchResultFromRemote, keys } = this.props;
      fetchResultFromRemote(keys);
    }
  }
    parsePagination = (objType) => {
      const { fetchResultByObjtype, keys } = this.props;
      const pagination = this.props.paginations[objType];
      return {
        defaultCurrent: pagination.currentPage,
        current: pagination.currentPage,
        defaultPageSize: pagination.perPage,
        pageSize: pagination.perPage,
        total: pagination.total,
        onChange(page, pageSize) {
          fetchResultByObjtype(objType, keys, pageSize, page);
        },
      };
    }
    renderColumnByType = (type, column) => {
      const configs = {
        title: column.field_label,
        dataIndex: column.field_name,
        columnId: column.id, // customized property, used by table sorter
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
            const { theme, objectType } = this.props;
            extraConfigs.render = (text, record) => (
              <Link
                className={`${theme}-theme-text`}
                to={`${objectType}/${record.id}`}
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
    renderColumns = (objType) => {
      const { columnsMeta } = this.props;
      const columns = columnsMeta[objType].map(column => this.renderColumnByType(column.crm_data_type, column));
      return columns;
    }
    render() {
      const { result } = this.props;
      const { formatMessage } = this.props.intl;
      return (
        <div>
          {
            Object.keys(this.props.result).map(objType => (
              <Panel key={objType} panelClasses={`${objTypeAndClassTypeMap[objType]}-theme-panel`} panelTitle={formatMessage({ id: `global.properNouns.${objType}` })}>
                <Table
                  columns={this.renderColumns(objType)}
                  dataSource={result[objType]}
                  pagination={this.parsePagination(objType)}
                  rowKey="id"
                  size="small"
                  className="full-width-table"
                />
              </Panel>
            ))
            }
        </div>);
    }
}

const mapStateToProps = ({ globalSearch }) => ({
  result: globalSearch.globalSearchResult,
  keys: globalSearch.globalSearchKey,
  paginations: globalSearch.paginations,
  columnsMeta: globalSearch.globalSearchColumnsMeta,
});
const mapDispatchToProp = {
  fetchResultFromRemote,
  fetchResultByObjtype,
};


export default connect(mapStateToProps, mapDispatchToProp)(injectIntl(GlobalSearch));
