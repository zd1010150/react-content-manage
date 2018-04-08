import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Table, Button } from 'antd';

import { Panel } from 'components/ui/index';
import Enums from 'utils/EnumsManager';
const {
  PhantomId,
  ThemeTypes,
  DetailModules,
  ThemeTypesInArray,
  DetailModulesInArray,
} = Enums;
const {
  taskOpen,
  taskHistory,
} = DetailModules;
// presets
const configs = [
  {
    key: taskOpen,
    addPagePath: `/leads/opentask/${PhantomId}`,
    editPagePath: `/leads/opentask/id`,
    editUrl: `/admin/`,
    deleteUrl: `/admin/`,
    fetchUrl: `/admin/`,
  },
  {
    key: taskHistory,
    addPagePath: `/leads/opentask/${PhantomId}`,
    fetchUrl: ``,
  },
];


const defaultProps = {
  canAdd: false,
  canDelete: false,
  canEdit: false,
  columns: [],
  data: [],
  module: DetailModulesInArray.taskOpen,
  theme: ThemeTypes.Lead,
};
const propTypes = {
  intl: intlShape.isRequired,
  canAdd: PropTypes.bool.isRequired,
  canDelete: PropTypes.bool.isRequired,
  canEdit: PropTypes.bool.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  module: PropTypes.oneOf(DetailModulesInArray).isRequired,
  theme: PropTypes.oneOf(ThemeTypesInArray).isRequired,
};


class TaskPanel extends Component {
  componentDidMount() {
    // fetch table data first
    // this.props.fetchData();
  }

  onTableChange = (pagination, filters, sorter) => {
    debugger;
    console.log('on table change');
  }

  render() {
    const {
      intl,
      canAdd,
      columns,
      data,
      module,
      theme,
    } = this.props;
    const { formatMessage } = intl;
    const i18nPrefix = 'global.ui.detailModules';

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
          size="small"
          onChange={this.onTableChange}
        />
      </Panel>
    );
  }
}


const mapStateToProps = ({ global, }) => ({
  language: global.language,
});
const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TaskPanel));