import React from 'react';
import { Form, Input, Row, Col, Select } from 'antd';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

const FormItem = Form.Item;
const { Option } = Select;


const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
  countries: PropTypes.array.isRequired,
};


const CIForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      ciName: Form.createFormField(props.ciName),
      ciAddress: Form.createFormField(props.ciAddress),
      ciCountry: Form.createFormField(props.ciCountry),
      ciPhone: Form.createFormField(props.ciPhone),
    };
  },
})((props) => {
  const { getFieldDecorator } = props.form;

  const { formatMessage } = props.intl;
  const errorI18n = 'global.errors';
  const requiredError = formatMessage({ id: `${errorI18n}.inputRequired` });

  return (
    <Form className="normalLabel">
      <Row gutter={24}>
        <Col xs={24} sm={12}>
          <FormItem label="Organization" colon={false}>
            {getFieldDecorator('ciName', {
              rules: [{ required: true, message: requiredError }],
            })(<Input />)}
          </FormItem>
        </Col>
        <Col xs={24} sm={12}>
          <FormItem label="Address" colon={false}>
            {getFieldDecorator('ciAddress', {
              rules: [{ required: true, message: requiredError }],
            })(<Input />)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xs={24} sm={12}>
          <FormItem label="Country" colon={false}>
            {getFieldDecorator('ciCountry', {
              rules: [{ required: true, message: requiredError }],
            })(
              <Select>
                {props.countries.map(c =>
                  <Option key={c.id} value={c.id}>{c.display_value}</Option>)}
              </Select>
            )}
          </FormItem>
        </Col>
        <Col xs={24} sm={12}>
          <FormItem label="Phone" colon={false}>
            {getFieldDecorator('ciPhone', {
              rules: [{ required: true, message: requiredError }],
            })(<Input />)}
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
});


CIForm.defaultProps = defaultProps;
CIForm.propTypes = propTypes;
export default injectIntl(CIForm);
