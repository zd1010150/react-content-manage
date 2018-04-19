/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input, Icon } from 'antd';
import classNames from 'classnames/bind';
import { intlShape, injectIntl } from 'react-intl';
import { Panel } from 'components/ui/index';
import styles from '../index.less';
import { FORM_LAYOUT_CONFIG, FORM_FOOTER_CONFIG } from 'config/app.config.js';
import { getExistRule, validator } from 'utils/validateMessagesUtil';

const cx = classNames.bind(styles);


class Avator extends React.Component {
state={
  isConfirmError: false,
}
validateConfirmPwd() {
  const { form } = this.props;
  const newPwd = form.getFieldValue('password');
  const confirPwd = form.getFieldValue('password_confirmation');
  const isConfirmError = newPwd !== confirPwd;

  this.setState({
    isConfirmError,
  });
  return !isConfirmError;
}
confirmPwdBlur() {
  this.validateConfirmPwd();
}
onSubmit() {
  const { form, submit, tryLogout } = this.props;
  form.validateFieldsAndScroll((err, values) => {
    if (!err && this.validateConfirmPwd()) {
      submit(values, (data) => {
        if (data && data.status) {
          tryLogout();
        }
      });
    }
  });
}

render() {
  const {
    intl, form,
  } = this.props;
  const { formatMessage, locale } = intl;
  const { Item: FormItem } = Form;
  const { getFieldDecorator } = form;
  return (
    <Panel contentClasses="pt-lg">
      <Form ref={(instance) => { this.instance = instance; }}>

        <FormItem
          {...FORM_LAYOUT_CONFIG}
          label={formatMessage({ id: 'page.mySetting.oldPwd' })}
        >
          {
                            getFieldDecorator('old_password', {
                                initialValue: '',
                                rules: [
                                    getExistRule('required', 'password', locale, { required: true }),
                                ],
                            })(<Input type="password" size="small" />)
                        }
        </FormItem>
        <FormItem
          {...FORM_LAYOUT_CONFIG}
          label={formatMessage({ id: 'page.mySetting.newPwd' })}
        >
          {
                    getFieldDecorator('password', {
                        initialValue: '',
                        rules: [
                            getExistRule('required', 'password', locale, { required: true }),
                            {
                                validator: validator.password(locale),
                            },
                        ],
                    })(<Input type="password" size="small" />)
                }
          <span className="form-tip">{formatMessage({ id: 'page.mySetting.pwdTip' })}</span>
          { this.state.isConfirmError ? <span className="form-tip error-msg">{formatMessage({ id: 'page.mySetting.confirmError' }) }</span> : '' }
        </FormItem>
        <FormItem
          {...FORM_LAYOUT_CONFIG}
          label={formatMessage({ id: 'page.mySetting.confirmPwd' })}
        >
          {
                    getFieldDecorator('password_confirmation', {
                        initialValue: '',
                        rules: [
                            getExistRule('required', 'password', locale, { required: true }),
                            {
                                validator: validator.password(locale),
                            },
                        ],
                    })(<Input size="small" type="password" onBlur={() => this.confirmPwdBlur()} />)
          }
          { this.state.isConfirmError ? <span className="form-tip error-msg">{formatMessage({ id: 'page.mySetting.confirmError' }) }</span> : '' }
        </FormItem>

        <FormItem {...FORM_FOOTER_CONFIG}>
          <Button type="primary" size="small" htmlType="submit" onClick={() => { this.onSubmit(); }}><Icon type="save" />{ formatMessage({ id: 'global.ui.button.save' })}</Button>
        </FormItem>


      </Form>
    </Panel>
  );
}
}
Avator.defaultProps = {

};
Avator.propTypes = {
  intl: intlShape.isRequired,
  submit: PropTypes.func.isRequired,
  tryLogout: PropTypes.func.isRequired,
};


export default Form.create()(injectIntl(Avator));
