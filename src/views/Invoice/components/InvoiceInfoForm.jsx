import { Col, DatePicker, Form, Input, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl, intlShape } from 'react-intl';

const FormItem = Form.Item;


const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
  countries: PropTypes.array.isRequired,
};


const InvoiceInfoForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      invoiceNo: Form.createFormField(props.invoiceNo),
      invoiceDate: Form.createFormField(props.invoiceDate),
      invoiceDueDate: Form.createFormField(props.invoiceDueDate),
    };
  },
})((props) => {
  const { format, form, intl } = props;
  const { getFieldDecorator } = form;
  
  const { formatMessage } = intl;
  const labelI18n = 'global.ui.table';
  const errorI18n = 'global.errors';
  const requiredError = formatMessage({ id: `${errorI18n}.inputRequired` });

  return (
    <Form className="normalLabel">
      <Row gutter={24}>
        <Col xs={24} sm={12}>
          <FormItem label={formatMessage({id: `${labelI18n}.invoiceNo` })} colon={false}>
            {getFieldDecorator('invoiceNo', {
              rules: [{ required: true, message: requiredError }],
            })(<Input />)}
          </FormItem>
        </Col>
        <Col xs={24} sm={12}>
          <FormItem label={formatMessage({id: `${labelI18n}.invoiceDate` })} colon={false}>
            {getFieldDecorator('invoiceDate', {
            })(<DatePicker className="full-width" format={format} />)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xs={24} sm={12}>
          <FormItem label={formatMessage({id: `${labelI18n}.dueOn` })} colon={false}>
            {getFieldDecorator('invoiceDueDate', {
            })(<DatePicker className="full-width" format={format} />)}
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
});


InvoiceInfoForm.defaultProps = defaultProps;
InvoiceInfoForm.propTypes = propTypes;
export default injectIntl(InvoiceInfoForm);
