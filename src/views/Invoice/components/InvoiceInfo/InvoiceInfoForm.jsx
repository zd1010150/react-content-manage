import { Col, DatePicker, Form, Input, Row, Icon, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';

const FormItem = Form.Item;


const defaultProps = {
  onNumReload: null,
};
const propTypes = {
  intl: intlShape.isRequired,
  onNumReload: PropTypes.func,
  invoiceNumReadOnly: PropTypes.bool.isRequired,
};


const InvoiceInfoForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      invoiceNum: Form.createFormField(props.invoiceNum),
      invoiceDate: Form.createFormField(props.invoiceDate),
      invoiceDueDate: Form.createFormField(props.invoiceDueDate),
    };
  },
})((props) => {
  const { format, form, intl, onNumReload, invoiceNumReadOnly } = props;
  const { getFieldDecorator } = form;

  const { formatMessage } = intl;
  const labelI18n = 'global.ui.table';
  const errorI18n = 'global.errors';
  const requiredError = formatMessage({ id: `${errorI18n}.inputRequired` });

  return (
    <Form className="normalLabel">
      <Row gutter={24}>
        <Col xs={24} sm={12}>
          <FormItem
            label={(
              <Fragment>
                {formatMessage({ id: `${labelI18n}.invoiceNo` })}
                <Tooltip title="By Default: Organization ID + day + month + year + hour + min + sec + 4 random digits">
                  <Icon
                    type="question-circle"
                    className="font-sm ml-sm icon-thinner"
                    style={{ verticalAlign: 'middle' }}
                  />
                </Tooltip>
                {!invoiceNumReadOnly ? (
                  <Icon
                    type="reload"
                    className="ml-md cursor-pointer"
                    onClick={onNumReload}
                    style={{ verticalAlign: 'middle' }}
                  />
                ) : null}
              </Fragment>
            )}
            colon={false}
          >
            {getFieldDecorator('invoiceNum', {
              rules: [{ required: true, message: requiredError }],
            })(<Input size="small" className={invoiceNumReadOnly ? 'readOnly' : ''} readOnly={invoiceNumReadOnly} />)}
          </FormItem>
        </Col>
        <Col xs={24} sm={12}>
          <FormItem
            label={(
              <Fragment>
                {formatMessage({ id: `${labelI18n}.invoiceDate` })}
                <Tooltip title="By Default = today's date">
                  <Icon
                    type="question-circle"
                    className="font-sm ml-sm icon-thinner"
                    style={{ verticalAlign: 'middle' }}
                  />
                </Tooltip>
              </Fragment>
            )}
            colon={false}
          >
            {getFieldDecorator('invoiceDate', {
              rules: [{ required: true, message: requiredError }],
            })(<DatePicker className="full-width" format={format} size="small" />)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xs={24} sm={12}>
          <FormItem label={formatMessage({id: `${labelI18n}.dueOn` })} colon={false}>
            {getFieldDecorator('invoiceDueDate', {
            })(<DatePicker className="full-width" format={format} size="small" />)}
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
});


InvoiceInfoForm.defaultProps = defaultProps;
InvoiceInfoForm.propTypes = propTypes;
export default injectIntl(InvoiceInfoForm);
