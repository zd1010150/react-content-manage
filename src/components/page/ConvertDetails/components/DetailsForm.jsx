/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { Form, Input, Select, Row, Col, Checkbox } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { StyledModal } from 'components/ui/index';

const { Option } = Select;
const { createFormField } = Form;
const FormItem = Form.Item;
const colLayout = {
  xs: 24,
  sm: 12,
};


const propTypes = {
  intl: intlShape.isRequired,
  owners: PropTypes.array.isRequired,
  accountStatuses: PropTypes.array.isRequired,
};


class DetailsForm extends Component {
  state = {
    modalVisible: false,
  }

  openModal = () => this.setState({ modalVisible: true })  
  handleCancel = () => this.setState({ modalVisible: false })
  handleOk = () => this.setState({ modalVisible: false })

  handleAccountClick = (e) => {
    console.log(e.target.dataset.id);
    const { similarAccounts, handleFieldsChange } = this.props;
    const account = similarAccounts.find(ac => ac.id == e.target.dataset.id);
    if (account) {
      handleFieldsChange('createAccountNameId', account.id, account.name);
    }
    // close modal
    this.handleCancel();
  }

  render() {
    const { modalVisible } = this.state;
    const {
      intl,
      form,
      owners,
      withoutNewOpportunity,
      accountStatuses,
      similarAccounts,
      createAccountName,
      createAccountNameId,
    } = this.props;
    const { formatMessage } = intl;
    const i18n = 'page.convertDetails.labels';
    const i18nPh = 'global.ui.placeholders';
    const i18nErr = 'global.errors';
    const { getFieldDecorator } = form;
    const requiredRule = {
      required: true,
      message: formatMessage({ id: `${i18nErr}.required` }),
    };

    return (
      <Form layout="vertical">
        <Row gutter={24}>
          <Col {...colLayout}>
            <FormItem
              label={formatMessage({ id: `${i18n}.owner` })}
            >
              {getFieldDecorator('owner', {
                rules: [requiredRule],
              })(
                <Select>
                  {owners.map(o => <Option key={o.id} value={o.id}>{o.name}</Option>)}
                </Select>
              )}
            </FormItem>
            <FormItem
              label={formatMessage({ id: `${i18n}.opportName` })}
              colon={false}
            >              
              {getFieldDecorator('opportunityName', {
                rules: [requiredRule],
              })(
                <Input disabled={withoutNewOpportunity.value} />
              )}
            </FormItem>
            <FormItem
              label=""
              colon={false}
            >              
              {getFieldDecorator('withoutNewOpportunity', {})(
                <Checkbox style={{ fontSize: 11 }}>
                  {formatMessage({ id: `${i18n}.noNewOpport` })}
                </Checkbox>
              )}
            </FormItem>
            <FormItem
              label={formatMessage({ id: `${i18n}.acctStatus` })}
              colon={false}
            >              
              {getFieldDecorator('accountStatus', {
                rules: [requiredRule],
              })(
                <Select>
                  {accountStatuses.map(st => <Option key={st.id} value={st.id}>{st.option_value}</Option>)}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col {...colLayout}>
            <FormItem
              label={formatMessage({ id: `${i18n}.createAcctName` })}
              colon={false}
            >
              {getFieldDecorator('createAccountName', {
                rules: [requiredRule],
              })(
                <Input addonBefore={createAccountNameId === 0 ? 'New' : 'Duplicate To'} readOnly />
              )}
            </FormItem>
            <div className="pl-md">
              {formatMessage({ id: `${i18n}.exist` })}
              {similarAccounts.length}
              {formatMessage({ id: `${i18n}.similar` })}
              {similarAccounts.length !== 0 && (
                <Fragment>
                  <a
                    className="ml-lg lead-theme-text"
                    onClick={this.openModal}
                  >
                    {formatMessage({ id: `${i18n}.viewMore` })}
                  </a>
                  <StyledModal
                    title={formatMessage({ id: 'page.convertDetails.modalTitle' })}
                    visible={modalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                  >
                    <ul style={{ listStyle: 'none', padding: 0 }} onClick={this.handleAccountClick}>
                    {similarAccounts.map(sa => (
                      <li
                        key={sa.id}
                        data-id={sa.id}
                        className="account-theme-text"
                        style={{
                          lineHeight: '24px',
                          cursor: 'pointer',
                        }}
                      >
                        {sa.name}
                      </li>
                    ))}
                    </ul>
                  </StyledModal>
                </Fragment>
              )}
            </div>
          </Col>
        </Row>
      </Form>
    );
  }
}


// TODO: fix the issue of missing form validation status because of the same object is overrided by props
const mapPropsToFields = (props) => ({
  owner: createFormField({
    ...props.owner,
    value: props.owner.value,
  }),
  opportunityName: createFormField({
    ...props.opportunityName,
    value: props.opportunityName.value,
  }),
  withoutNewOpportunity: createFormField({
    ...props.withoutNewOpportunity,
    value: props.withoutNewOpportunity.value,
  }),
  accountStatus: createFormField({
    ...props.accountStatus,
    value: props.accountStatus.value,
  }),
  createAccountName: createFormField({
    ...props.createAccountName,
    value: props.createAccountName.value,
  }),
  createAccountNameId: createFormField({
    ...props.createAccountNameId,
    value: props.createAccountNameId.value,
  }),
});
const onFieldsChange = (props, fields) => {
  console.dir(fields);
  const { handleFieldsChange } = props;
  if (_.isFunction(handleFieldsChange)) {
    const key = Object.keys(fields)[0];
    if (!key) return;
    let { name, value } = fields[key];
    // map field name to store key
    if (name === 'owner') {
      name = 'ownerId';
    } else if (name === 'accountStatus') {
      name = 'accountStatusId'
    }
    handleFieldsChange(name, value);
  }
};
const DetailsFormWrapper = Form.create({
  mapPropsToFields,
  onFieldsChange,
})(injectIntl(DetailsForm));
export default DetailsFormWrapper;
