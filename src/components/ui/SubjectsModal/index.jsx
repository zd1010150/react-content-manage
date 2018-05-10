import { Icon } from 'antd';
import classNames from 'classnames/bind';
import { FloatingLabelInput, StyledModal, PopDeleteConfirm } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import styles from './index.less';

const cx = classNames.bind(styles);


const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
  onCancel: PropTypes.func,
};


class SubjectsModal extends Component {
  state = {
    newSubject: '',
  }

  handleChange = value => this.setState({ newSubject: value })

  _onCancel = $ => {
    const { onCancel } = this.props;
    if (_.isFunction(onCancel)) {
      this.setState({newSubject: ''});
      onCancel();
    }
  }

  _onSaveNewSubject = $ => {
    const { newSubject } = this.state;
    const { globalSubjects, mySubjects, onSaveSubject } = this.props;
    // check if newSubject name is existed or is empty, then skip the save
    if (_.isFunction(onSaveSubject)) {   
      if (_.isEmpty(newSubject)
          || globalSubjects.find(subject => subject.name === newSubject)
          || mySubjects.find(subject => subject.name === newSubject)) {
        return;
      }
      return onSaveSubject(newSubject);
    }
  }

  _onSubjectDelete = id => {
    const { onSubjectDelete } = this.props;
    if (_.isFunction(onSubjectDelete)) {
      onSubjectDelete(id);
    }
  }

  _onSubjectSelect = name => {
    const { onSubjectSelect } = this.props;
    if (_.isFunction(onSubjectSelect)) {
      onSubjectSelect(name);
    }
  }

  render() {
    const { newSubject } = this.state;    
    const {
      intl,
      visible,
      globalSubjects,
      mySubjects
    } = this.props;
    const { formatMessage } = intl;
    const i18nPrefix = 'page.subjectsModal';

    return (
      <StyledModal
        footer={false}
        onCancel={this._onCancel}
        onOk={this._onCancel}
        title={formatMessage({ id: `${i18nPrefix}.title` })}
        visible={visible}
      >
        <div className={cx('hint')}>
          {formatMessage({ id: `${i18nPrefix}.hint` })}
        </div>
        <ul className={cx('subjectsList')}>
          {globalSubjects.map(subject => (
            <li
              key={subject.id}
              className={cx('subject')}
              onClick={e => this._onSubjectSelect(subject.name)}
            >
              {subject.name}
            </li>
          ))}
          {mySubjects.map(subject => (
            <li
              key={subject.id}
              className={`${cx('subject')}`}
              onClick={e => {
                if (e.target == e.currentTarget) {
                  this._onSubjectSelect(subject.name)
                }
              }}
            >
              {subject.name}
              <PopDeleteConfirm onConfirm={() => this._onSubjectDelete(subject.id)}>
                <Icon className={cx('deleteIcon')} type="delete" />
              </PopDeleteConfirm>
            </li>
          ))}
        </ul>
        <FloatingLabelInput
          addonAfter={<Icon className="cursor-pointer" size="small" type="save" onClick={this._onSaveNewSubject} />}
          handleChange={this.handleChange}
          labelColor="#000"
          labelText={formatMessage({ id: `${i18nPrefix}.label` })}
          placeholder={formatMessage({ id: `${i18nPrefix}.placeholder` })}
          value={newSubject}
        />
      </StyledModal>
    );
  }
}


SubjectsModal.defaultProps = defaultProps;
SubjectsModal.propTypes = propTypes;
export default injectIntl(SubjectsModal);