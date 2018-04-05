/* eslint-disable no-shadow */
import React from 'react';

import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Form, Select, Input } from 'antd';

import { FORM_LAYOUT_CONFIG } from 'config/app.config';
import { intlShape, injectIntl } from 'react-intl';
import { getExistRule } from 'utils/validateMessagesUtil';

const { Item: FormItem } = Form;
const { Option } = Select;
class AddForm extends React.Component {
  render() {
    const { formatMessage, locale } = this.props.intl;
    const {
      form,
      allLayouts,
    } = this.props;
    const { getFieldDecorator } = form;
    const layoutsEl = getFieldDecorator('copy_page_layout_id')(<Select>
      <Option value=""> ===none ==== </Option>
      {
            allLayouts.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)
        }
    </Select>);
    return (
      <Form>
        <FormItem
          {...FORM_LAYOUT_CONFIG}
          label={formatMessage({ id: 'page.fields.label' })}
        >
          {layoutsEl}
        </FormItem>
        <FormItem
          {...FORM_LAYOUT_CONFIG}
          label={formatMessage({ id: 'page.fields.name' })}
        >
          {
                getFieldDecorator('name', {
                    rules: [
                        getExistRule('required', 'layout_name', locale, { required: true }),
                    ],
                })(<Input size="small" />)
              }
        </FormItem>
      </Form>


    );
  }
}
AddForm.defaultProps = {
  allLayouts: [],
};
AddForm.propTypes = {
  intl: intlShape.isRequired,
  allLayouts: PropTypes.array,
};
export default Form.create()(injectIntl(AddForm));
