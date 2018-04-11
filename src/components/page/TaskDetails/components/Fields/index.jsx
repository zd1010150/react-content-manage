import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import moment from 'moment';
import { Row, Col, Input, Icon, Select, DatePicker } from 'antd';
const { TextArea } = Input;
const { Option, OptGroup } = Select;
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);

import { AssigneeModal, SubjectsModal } from 'components/ui/index';
import {
  setAssignee,
  setFieldValue,
  tryDeleteSubject,
  tryFetchTask,
  trySaveNewSubject,
} from '../../flow/actions';
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
    assigneeModalVisible: false,
    subjectModalVisible: false,
  }

  componentDidMount() {
    const { objectId, objectType, tryFetchTask } = this.props;
    tryFetchTask(objectId, objectType);
  }

  handleAssigneeModalCancel = $ => this.setState({ assigneeModalVisible: false })

  handleAssigneeModalOpen = $ => this.setState({ assigneeModalVisible: true })

  handleSaveSubject = value => this.props.trySaveNewSubject(value)

  handleSubjectDelete = id => this.props.tryDeleteSubject(id)

  handleSubjectModalCancel = $ => this.setState({ subjectModalVisible: false })

  handleSubjectModalOpen = $ => this.setState({ subjectModalVisible: true })

  handleSubjectSelect = name => {
    this.props.setFieldValue('subject', name);
    return this.setState({ subjectModalVisible: false });
  }

  handleFieldChange = (field, value) => this.props.setFieldValue(field, value)

  handleRowClick = id => {
    this.props.setAssignee(Number(id));
    return this.setState({ assigneeModalVisible: false });
  }
  
  render() {
    const { assigneeModalVisible, subjectModalVisible } = this.state;
    const {
      intl,
      assigneeId,
      assignees,
      comments,
      dueTime,
      globalSubjects,
      mySubjects,
      priorityCode,
      priorities,
      recentAssignees,
      statusCode,
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
            <div className={labelCls}>
              {formatMessage({ id: `${i18nPrefix}.assignTo` })}
            </div>
            <Select
              onChange={value => {
                if (value === 'moreOptions') {
                  return this.handleAssigneeModalOpen();
                }
                return this.handleFieldChange('assigneeId', value)
              }}
              style={{ width: '100%' }}
              value={assigneeId}
            >
              <OptGroup label={formatMessage({ id: `${i18nPrefix}.recentOptions` })}>
                {recentAssignees.map(assignee => <Option key={assignee.id} value={assignee.id}>{assignee.name}</Option>)}
              </OptGroup>
              <Option className={cx('moreOptions')} value="moreOptions">
                <a>{formatMessage({ id: `${i18nPrefix}.moreOptions` })}</a>
              </Option>
            </Select>
            <AssigneeModal
              data={assignees}
              onCancel={this.handleAssigneeModalCancel}
              onRowClick={this.handleRowClick}
              value={assigneeId}
              visible={assigneeModalVisible}
            />
          </Col>
          <Col {...colLayout}>
            <div className={labelCls}>
              {formatMessage({ id: `${i18nPrefix}.status` })}
            </div>
            <Select
              onChange={value => this.handleFieldChange('statusCode', value)}
              style={{ width: '100%' }}
              value={statusCode}
            >
              {statuses.map(status => <Option key={status.id} value={status.id}>{status.name}</Option>)}
            </Select>
          </Col>
        </Row>
        <Row className={rowCls} gutter={24}>
          <Col {...colLayout}>
            <div className={labelCls}>
              {formatMessage({ id: `${i18nPrefix}.subject` })}
            </div>
            <Input
              addonAfter={<Icon className="cursor-pointer" onClick={this.handleSubjectModalOpen} size="small" type="bars" />}
              onChange={e => this.handleFieldChange('subject', e.target.value)}
              placeholder="Please select or add a new value from the list"
              value={subject}
            />
            <SubjectsModal              
              globalSubjects={globalSubjects}
              mySubjects={mySubjects}
              onCancel={this.handleSubjectModalCancel}
              onSaveSubject={this.handleSaveSubject}
              onSubjectDelete={this.handleSubjectDelete}
              onSubjectSelect={this.handleSubjectSelect}
              visible={subjectModalVisible}
            />
          </Col>
          <Col {...colLayout}>
            <div className={labelCls}>
              {formatMessage({ id: `${i18nPrefix}.priority` })}
            </div>
            <Select
              style={{ width: '100%' }}
              onChange={value => this.handleFieldChange('priorityCode', value)}
              value={priorityCode}
            >
              {priorities.map(priority => <Option key={priority.id} value={priority.id}>{priority.name}</Option>)}
            </Select>
          </Col>
        </Row>
        <Row className={rowCls} gutter={24}>
          <Col {...colLayout}>
            <div className={labelCls}>
              {formatMessage({ id: `${i18nPrefix}.dueDate` })}
            </div>
            <DatePicker
              format="YYYY-MM-DD HH:mm:ss"
              onChange={(date, dateString) => this.handleFieldChange('dueTime', dateString)}
              placeholder={formatMessage({ id: 'global.ui.input.datetimepicker.placeholder' })}
              showTime
              style={{ width: '100%' }}
              value={moment(dueTime)}
            />
          </Col>
        </Row>
        <Row className={rowCls}>
          <div style={{ fontWeight: 700 }}>
            {formatMessage({ id: `${i18nPrefix}.comments` })}
          </div>
          <TextArea
            autosize={{ minRows: 10, maxRows: 30 }}
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
  language: global.language,
  priorities: global.settings.priorities,
  statuses: global.settings.statuses,

  assigneeId: taskDetails.assigneeId,
  assignees: taskDetails.assignees,
  comments: taskDetails.comments,
  dueTime: taskDetails.dueTime,
  globalSubjects: taskDetails.globalSubjects,
  mySubjects: taskDetails.mySubjects,
  priorityCode: taskDetails.priorityCode,
  recentAssignees: taskDetails.recentAssignees,
  statusCode: taskDetails.statusCode,
  subject: taskDetails.subject,
});
const mapDispatchToProps = {
  setAssignee,
  setFieldValue,
  tryDeleteSubject,
  tryFetchTask,
  trySaveNewSubject,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TaskFields));