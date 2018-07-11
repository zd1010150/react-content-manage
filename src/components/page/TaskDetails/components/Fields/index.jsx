import { Col, DatePicker, Icon, Input, Row, Select } from 'antd';
import classNames from 'classnames/bind';
import { AssigneeModal, SubjectsModal } from 'components/ui/index';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import Enums from 'utils/EnumsManager';
import styles from './index.less';
import {
  setAssignee,
  setFieldValue,
  tryDeleteSubject,
  tryFetchTask,
  trySaveNewSubject,
  tryFetchAssignees,
  tryFetchRecentAssignees,
  tryFetchTaskSubjects,
} from '../../flow/actions';

const { TextArea } = Input;
const { Option, OptGroup } = Select;
const cx = classNames.bind(styles);

const { PhantomId } = Enums;
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
    const {
      defaultStateId,
      objectId,
      objectType,
      taskId,
      tryFetchTask,
      tryFetchAssignees,
      tryFetchRecentAssignees,
      tryFetchTaskSubjects,
    } = this.props;
    
    if (taskId !== PhantomId) {
      tryFetchTask(taskId, objectId, objectType, defaultStateId);
    } else {
      // TODO: refactor to move those fetch methods to field separately
      tryFetchAssignees(objectId, objectType);
      tryFetchRecentAssignees(objectType);
      tryFetchTaskSubjects();
    }
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
      dateFormat,
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
      isHistoryTask,
    } = this.props;

    const { formatMessage } = intl;
    const i18nPrefix = 'page.taskDetails.labels';
    const i18nPh = 'global.ui.placeholders';
    
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
              // Notes: In order to make Select Component becomes disabled status, we need disabled prop to be true, also an additional cls readOnlyField to make text clear to see.
              // Without disabled prop, the Select Component will remain to react users click on dropdown.
              disabled={isHistoryTask}
              className={`full-width ${isHistoryTask ? 'readOnlyField' : ''}`}
              onChange={(value) => {
                if (value === 'moreOptions') {
                  return this.handleAssigneeModalOpen();
                }
                return this.handleFieldChange('assigneeId', value);
              }}
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
              disabled={isHistoryTask}
              className={`full-width ${isHistoryTask ? 'readOnlyField' : ''}`}
              onChange={value => this.handleFieldChange('statusCode', value)}
              value={statusCode}
            >
              {statuses.map(status => <Option key={status.id} value={status.id}>{status.display_value}</Option>)}
            </Select>
          </Col>
        </Row>
        <Row className={rowCls} gutter={24}>
          <Col {...colLayout}>
            <div className={labelCls}>
              {formatMessage({ id: `${i18nPrefix}.subject` })}
            </div>
            <Input
              disabled={isHistoryTask}
              className={isHistoryTask ? 'readOnlyField' : ''}
              addonAfter={isHistoryTask ? null : <Icon className="cursor-pointer" onClick={this.handleSubjectModalOpen} size="small" type="bars" />}
              onChange={e => this.handleFieldChange('subject', e.target.value)}
              placeholder={formatMessage({ id: `${i18nPh}.subject` })}
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
              disabled={isHistoryTask}
              className={`full-width ${isHistoryTask ? 'readOnlyField' : ''}`}
              onChange={value => this.handleFieldChange('priorityCode', value)}
              value={priorityCode}
            >
              {priorities.map(priority => <Option key={priority.id} value={priority.id}>{priority.display_value}</Option>)}
            </Select>
          </Col>
        </Row>
        <Row className={rowCls} gutter={24}>
          <Col {...colLayout}>
            <div className={labelCls}>
              {formatMessage({ id: `${i18nPrefix}.dueDate` })}
            </div>
            <DatePicker
              disabled={isHistoryTask}
              className={`full-width ${isHistoryTask ? 'readOnlyField' : ''}`}
              format={dateFormat}
              onChange={(date, dateString) => this.handleFieldChange('dueTime', dateString)}
              placeholder={formatMessage({ id: `${i18nPh}.datepicker` })}
              value={dueTime === null || dueTime === '' ? undefined : moment(dueTime, dateFormat)}
            />
          </Col>
        </Row>
        <Row className={rowCls}>
          <div style={{ fontWeight: 700 }}>
            {formatMessage({ id: `${i18nPrefix}.comments` })}
          </div>
          <TextArea
            disabled={isHistoryTask}
            className={isHistoryTask ? 'readOnlyField' : ''}
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
  dateFormat: global.timeZoneSetting.dateFormat,
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
  tryFetchAssignees,
  tryFetchRecentAssignees,
  tryFetchTaskSubjects,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TaskFields));
