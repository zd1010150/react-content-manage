import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { Table, Icon } from 'antd';
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);

import { FloatingLabelInput, StyledModal } from 'components/ui/index';


const defaultProps = {
  data: [],
  visible: false,
};
const propTypes = {
  data: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  visible: PropTypes.bool.isRequired,
};


class AssigneeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  _onCancel = $ => {
    this.setState({ searchText: '' });
    const { onCancel } = this.props;
    if (_.isFunction(onCancel)) {
      onCancel();
    }
  }
  
  handleFilterChange = value => this.setState({ searchText: value })

  addHighlightCls = record => {
    const { value } = this.props;
    if (record.id === value) {
      return `cursor-pointer ${cx('selected')}`;
    }
    return 'cursor-pointer';
  }

  _onRowClick = e => {
    const { onRowClick } = this.props;
    if (_.isFunction(onRowClick)) {
      const { id } = e.currentTarget.dataset;
      onRowClick(id);
    }
  }

  renderColumns = $ => {
    const { formatMessage } = this.props.intl;
    const i18nPrefix = 'global.ui.table';
    return [
      {
        dataIndex: 'name',
        title: formatMessage({ id: `${i18nPrefix}.fullName` }),
      },
      {
        dataIndex: 'team',
        title: formatMessage({ id: `${i18nPrefix}.team` }),
      },
      {
        key: 'workHour',
        title: formatMessage({ id: `${i18nPrefix}.workHour` }),
        render: (text, record) => `${record.start_work_time} - ${record.end_work_time}`,
      },
    ];
  }

  render() {
    const { searchText } = this.state;
    const { intl, data, value, visible } = this.props;
    const { formatMessage } = intl;
    const i18nPrefix = 'page.assigneeModal';

    const columns = this.renderColumns();
    // TODO: add team filter, because now the api miss team name field
    const filteredData = data.filter(record => record.name.indexOf(searchText) !== -1);

    return (
      <StyledModal
        footer={null}
        onCancel={this._onCancel}
        title={formatMessage({ id: `${i18nPrefix}.title`})}
        visible={visible}
      >
        <FloatingLabelInput
          labelText={formatMessage({ id: `${i18nPrefix}.label` })}
          labelColor="#000"
          handleChange={this.handleFilterChange}
          placeholder={formatMessage({ id: `${i18nPrefix}.placeholder` })}
          addonAfter={<Icon size="small" type="search" />}
          value={searchText}
        />
        <div className={cx('hint')}>
          {formatMessage({ id: `${i18nPrefix}.hint` })}
        </div>
        <Table
          columns={columns}
          dataSource={filteredData}
          onRow={record => ({
            'data-id': record.id,
            'data-name': record.name,
            onClick: this._onRowClick,
          })}
          pagination={false}
          rowClassName={this.addHighlightCls}
          rowKey="id"
        />
      </StyledModal>
    );
  }
}


AssigneeModal.defaultProps = defaultProps;
AssigneeModal.propTypes = propTypes;
export default injectIntl(AssigneeModal);