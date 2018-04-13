import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

const contextTypes = { store: PropTypes.object };
import classNames from 'classnames/bind';
import styles from '../loginForm.less';
const cx = classNames.bind(styles);

import { CopyRight } from 'components/page/index';

class LoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const me = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        me.props.tryLogin(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="vertical" onSubmit={this.handleSubmit} className={cx('formWrapper')}>
        <div className={cx('siteTitle')}>logix crm</div>
        <div className={cx('fieldsWrapper')}>
          <FormItem label="email" className={cx('formItem')}>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input suffix={<Icon type="user"/>} placeholder="Email" />
            )}
          </FormItem>
          <FormItem label="password" className={cx('formItem')}>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input suffix={<Icon type="lock"/>} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem className={cx('formItem')}>
            <Button type="primary" htmlType="submit" className={cx('signInBtn')}>
              Sign in
            </Button>
          </FormItem>
        </div >
      </Form>
    );
  }
}

LoginForm.contextTypes = contextTypes;
export default Form.create()(LoginForm);