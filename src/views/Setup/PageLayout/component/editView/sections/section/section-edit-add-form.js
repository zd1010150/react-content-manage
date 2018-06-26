/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Form, Input, Radio } from 'antd';
import { FORM_LAYOUT_CONFIG } from 'config/app.config';
import { intlShape, injectIntl } from 'react-intl';
import { getExistRule } from 'utils/validateMessagesUtil';
import styles from '../../../../index.less';

const cx = classNames.bind(styles);
const RadioGroup = Radio.Group;
class FieldForm extends React.Component {
  render() {
    const {
      code, intl, label, cols,
    } = this.props;
    const { formatMessage, locale } = intl;
    const { Item: FormItem } = Form;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form ref={c => this.form = c}>
        <FormItem>
          {
                        getFieldDecorator('code', {
                            initialValue: code || '',
                        })(<Input type="hidden" />)
                    }
        </FormItem>
        <FormItem
          {...FORM_LAYOUT_CONFIG}
          label={formatMessage({ id: 'global.form.section_label' })}
        >


          {
                        getFieldDecorator('label', {
                            initialValue: label || '',
                            rules: [
                                getExistRule('required', 'section_label', locale, { required: true }),
                            ],
                        })(<Input />)
                    }
        </FormItem>
        <FormItem
          {...FORM_LAYOUT_CONFIG}
          label={formatMessage({ id: 'page.layouts.section_col' })}
        >
          {
                        getFieldDecorator('cols', {
                            initialValue: cols || 2,
                        })(<RadioGroup>
                          <Radio value={1}>{ formatMessage({ id: 'page.layouts.col1' }) } <span className={classNames(cx('column'), cx('one-column'))} /></Radio>
                          <Radio value={2}>{formatMessage({ id: 'page.layouts.col2' })} <span className={classNames(cx('column'), cx('two-column'))} /></Radio>
                        </RadioGroup>)
                    }

        </FormItem>


      </Form>
    );
  }
}

FieldForm.propTypes = {
  intl: intlShape.isRequired,
  label: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  cols: PropTypes.number.isRequired,
};

export default Form.create()(injectIntl(FieldForm));

