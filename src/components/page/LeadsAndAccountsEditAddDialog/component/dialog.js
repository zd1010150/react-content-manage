import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import _ from 'lodash';
// import classNames from 'classnames/bind';
import operateTypes from '../flow/operateType';
import UserForm from './form';

class userDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showID: props.operatorType === operateTypes.ADD,
      canEdit: props.operatorType !== operateTypes.VIEW,
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      showID: nextProps.operatorType === operateTypes.ADD,
      canEdit: nextProps.operatorType !== operateTypes.VIEW,
    });
  }
  handleValidate = () => {
    const self = this;
    this.form.instance.validateFieldsAndScroll((err, values) => {
      if (!err) {
        self.setState({
          visible: false,
        });
        self.handleSubmit(values);
      }
    });
  }
  mapPostData = (oldValue) => {
    const value = Object.assign({}, oldValue);
    const result = {
      id: value.id,
      first_name: value.firstName,
      last_name: value.lastName,
      phone: value.phone,
      email: value.email,
      street: value.address,
      sub_group_id: value.group,
      sub_category_id: value.interests,
      city: value.city,
      state: value.state,
      country: value.country,
      zip_code: value.zipCode,
      id_number: value.idNumber,
      file: {
        front_id_doc: _.isArray(value.idFront) ? value.idFront[0] : value.idFront,
        back_id_doc: _.isArray(value.idBack) ? value.idBack[0] : value.idBack,
      },
    };
    if (_.trim(value.socialMediaNumber).length > 0 && value.socialMediaType.length > 0) {
      result.social_media = [{
        social_media_type: value.socialMediaType,
        social_media_number: value.socialMediaNumber,
      }];
    }
    return result;
  }
  mapPropsToFields = (props) => {
    if (_.isEmpty(props)) return {};
    const value = Object.assign({}, props);
    const result = {
      id: value.id,
      firstName: value.first_name,
      lastName: value.last_name,
      phone: value.phone,
      email: value.email,
      address: value.street,
      group: value.sub_group_id,
      interests: value.sub_category_id,
      city: value.city,
      state: value.state,
      country: value.country,
      zipCode: value.zip_code,
      idNumber: value.id_number,
    };
    if (props.socials && props.socials.length > 0) {
      const social = props.socials[0];
      result.socialMediaType = social.social_media_type;
      result.socialMediaNumber = social.social_media_number;
    }
    if (props.document && props.document.length > 0) {
      const { name, path } = props.document[0];
      if (name === 'front_id_doc') {
        result.idFront = path || '';
      } else {
        result.idBack = path || '';
      }
      if (props.document && props.document.length > 1) {
        const { name, path } = props.document[0];
        if (name === 'front_id_doc') {
          result.idFront = path || '';
        } else {
          result.idBack = path || '';
        }
      }
    }
    return result;
  }
  handleSubmit = (value) => {
    const postform = this.mapPostData(value);
    if (this.props.operatorType === operateTypes.ADD) {
      this.props.add(postform);
    } else if (this.props.operatorType === operateTypes.EDIT) {
      this.props.update(postform);
    }
    this.props.onClose();
  }
  handleCancel = (e) => {
    this.props.onClose();
  }
  render() {
    const { formatMessage } = this.props.intl;
    const {
      editObject, visible, language, userType, operatorType, group, interests, countries,
    } = this.props;
    const dialogTitle = ((_userType, _operatorType) => {
      const type = `page.${_userType}`;
      if (_operatorType === operateTypes.EDIT) {
        return `${type}.editDiologTitle`;
      } else if (_operatorType === operateTypes.VIEW) {
        return `${type}.viewDialogTitle`;
      }

      return `${type}.addDialogTitle`;
    })(userType, operatorType);
    return (
      <Modal
        title={formatMessage({ id: dialogTitle })}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>{ formatMessage({ id: 'global.ui.button.cancel' }) }</Button>,
          <Button disabled={!this.state.canEdit} key="submit" type="primary" onClick={() => { this.handleValidate(); }}>
            { formatMessage({ id: 'global.ui.button.submit' }) }
          </Button>,
        ]}
      >
        <UserForm key={Math.random()} showID={this.state.showID} canEdit={this.state.canEdit} editObject={this.mapPropsToFields(editObject)} countries={countries} language={language} onSubmit={this.handleValidate} ref={(c) => { this.form = c; }} group={group} interests={interests} />
      </Modal>
    );
  }
}

userDialog.defaultProps = {
  editObject: {},
  visible: false,
  add() {},
  update() {},
  operatorType: '',
  interests: [],
  group: [],
  countries: [],
};
userDialog.propTypes = {
  intl: intlShape.isRequired,
  editObject: PropTypes.object,
  language: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  add: PropTypes.func,
  update: PropTypes.func,
  operatorType: PropTypes.string,
  interests: PropTypes.array,
  group: PropTypes.array,
  countries: PropTypes.array,
  userType: PropTypes.string.isRequired, // Leads,Accounts
};
const UserDialog = injectIntl(userDialog);
export default UserDialog;
