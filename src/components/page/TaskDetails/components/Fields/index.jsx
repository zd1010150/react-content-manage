import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import moment from 'moment';
import { Row, Col, Input, Icon, Select, DatePicker } from 'antd';
const { TextArea } = Input;
const { Option } = Select;
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);

import { setFieldValue } from '../../flow/actions';
// presets
const colLayout = {
  sm: 12,
  xs: 24,
};


const defaultProps = {
  priorities: [],
  statuses: [],
};
const propTypes = {
  intl: intlShape.isRequired,
  priorities: PropTypes.array.isRequired,
  statuses: PropTypes.array.isRequired,
};


class TaskFields extends Component {
  state = {
    assignModalVisible: false,
    subjectModalVisible: false,
  }

  handleBarsIconClick = $ => this.setState({ subjectModalVisible: true })
  
  handleFieldChange = (field, value) => this.props.setFieldValue(field, value)

  handleSearchIconClick = $ => this.setState({ assignModalVisible: true })

  render() {
    const {
      intl,
      assignTo,
      comments,
      dueDate,
      priority,
      priorities,
      status,
      statuses,
      subject,
    } = this.props;

    const { formatMessage } = intl;
    const i18nPrefix = 'page.taskDetails.labels';

    const labelCls = cx('label');
    const rowCls = cx('row');

    return (
      <Fragment>
        <Row className={rowCls} gutter={24}>
          <Col {...colLayout}>
            <div className={labelCls}>{formatMessage({ id: `${i18nPrefix}.assignTo` })}</div>
            <Input
              addonAfter={<Icon onClick={this.handleSearchIconClick} size="small" type="search" />}
              onChange={e => this.handleFieldChange('assignTo', e.target.value)}
              placeholder="Please select a value from the list"
              value={assignTo}
            />
          </Col>
          <Col {...colLayout}>
            <div className={labelCls}>{formatMessage({ id: `${i18nPrefix}.status` })}</div>
            <Select
              onChange={value => this.handleFieldChange('status', value)}
              style={{ width: '100%' }}
              value={status}
            >
              {statuses.map(status => <Option key={status.id} value={status.name}>{status.name}</Option>)}
            </Select>
          </Col>
        </Row>
        <Row className={rowCls} gutter={24}>
          <Col {...colLayout}>
            <div className={labelCls}>{formatMessage({ id: `${i18nPrefix}.subject` })}</div>
            <Input
              addonAfter={<Icon onClick={this.handleBarsIconClick} size="small" type="bars" />}
              onChange={e => this.handleFieldChange('subject', e.target.value)}
              placeholder="Please select or add a new value from the list"
              value={subject}
            />
          </Col>
          <Col {...colLayout}>
            <div className={labelCls}>{formatMessage({ id: `${i18nPrefix}.priority` })}</div>
            <Select
              style={{ width: '100%' }}
              onChange={value => this.handleFieldChange('priority', value)}
            >
              {priorities.map(priority => <Option key={priority.id} value={priority.name}>{priority.name}</Option>)}
            </Select>
          </Col>
        </Row>
        <Row className={rowCls} gutter={24}>
          <Col {...colLayout}>
            <div className={labelCls}>{formatMessage({ id: `${i18nPrefix}.dueDate` })}</div>
            <DatePicker
              format="YYYY-MM-DD"
              onChange={(date, dateString) => this.handleFieldChange('dueDate', dateString)}
              placeholder="Please select a due date"
              style={{ width: '100%' }}
              value={moment(dueDate)}
            />
          </Col>
        </Row>
        <Row className={rowCls}>
          <div style={{ fontWeight: 700 }}>{formatMessage({ id: `${i18nPrefix}.comments` })}</div>
          <TextArea
            autosize={{ minRows: 10, maxRows: 15 }}
            onChange={e => this.handleFieldChange('comments', e.target.value)}
            value={comments}
          />
        </Row>
      </Fragment>
    );
  }
}


TaskFields.defaultProps = defaultProps;
TaskFields.propTypes = propTypes;
const mapStateToProps = ({ global, taskDetails }) => ({
  priorities: global.settings.priorities,
  statuses: global.settings.taskStatuses,
  assignTo: taskDetails.assignTo,
  comments: taskDetails.comments,
  dueDate: taskDetails.dueDate,
  priority: taskDetails.priority,
  status: taskDetails.status,
  subject: taskDetails.subject,
});
const mapDispatchToProps = {
  setFieldValue,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TaskFields));