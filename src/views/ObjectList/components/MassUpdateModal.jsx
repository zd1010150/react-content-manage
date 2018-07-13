import { Col, Row, Select, Tooltip, Icon } from 'antd';
import { CustomField, StyledModal } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import Enums from 'utils/EnumsManager';
import { toUtc } from 'utils/dateTimeUtils';
import { setOptions, tryFetchOptionsById } from '../flow/actions';

const { Option } = Select;
const { FieldTypes, PhantomId } = Enums;
const { DateOnly, DateTime, Lookup, PickList } = FieldTypes;


const defaultProps = {
  visible: false,
  columns: [],
  selectedFieldOptions: [],
};
const propTypes = {
  intl: intlShape.isRequired,
  columns: PropTypes.array.isRequired,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  selectedFieldOptions: PropTypes.array.isRequired,
  setOptions: PropTypes.func,
  tryFetchOptionsById: PropTypes.func,
  visible: PropTypes.bool.isRequired,
};


const labelCol = {
  sm: 6,
  xs: 24,
};
const valueCol = {
  sm: 18,
  xs: 24,
};

class MassUpdateModal extends Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      fieldId: PhantomId,
      fieldName: '',
      lookupDisplayKey: '',
      type: '',
      value: '',
    };
    this.state = this.defaultState;
  }

  resetState = () => this.setState({ ...this.defaultState })

  _onCancel = () => {
    const { onCancel } = this.props;
    if (_.isFunction(onCancel)) {
      onCancel();
    }
    this.resetState();
  }

  _onOk = () => {
    const { onOk, selectedFieldOptions } = this.props;
    if (_.isFunction(onOk)) {
      const { fieldName, type } = this.state;
      let { value } = this.state;
      if (type === Lookup) {
        const { lookupDisplayKey } = this.state;
        const option = selectedFieldOptions.find(opt => opt.id === value) || {};
        value = option.id;
      }
      if (type === DateOnly || type === DateTime) {
        value = toUtc(value, type === DateTime);
      }
      // TODO: add validation by field type
      onOk(fieldName, value);
    }
    this.resetState();
  }

  /**
   * Switch target column and reset initial target value
   */
  handleFieldChange = (fieldId) => {
    const {
      columns,
      setOptions,
      tryFetchOptionsById,
      selectedRowKeys,
      data,
    } = this.props;
    // Try find column from all non system auto generated columns
    const column = columns.find(col => col.id === fieldId);
    if (!column) return;

    const {
      id,
      field_name,
      crm_data_type,      
      lookup_own_field_name,
    } = column;

    // Update options if selected is a Lookup or Picklist field
    if (crm_data_type === Lookup) {
      tryFetchOptionsById(fieldId);
      this.setState({ lookupDisplayKey: lookup_own_field_name });
    } else if (crm_data_type === PickList) {
      setOptions(column.picklists.data);
    }

    const selectData = data.find(findData => findData.id === selectedRowKeys[0]);

    this.setState({
      fieldId: id,
      fieldName: field_name,
      type: crm_data_type,
      // CustomField component has added validation for date/datetime,
      // if the value is not valid moment string, will be converted to a valid value, so we can pass '' here
      value: typeof selectData[field_name] !== 'object' ? selectData[field_name] : '',
    });
  }

  handleValueChange = (id, value) => this.setState({ value })

  render() {
    const { fieldId, fieldName, lookupDisplayKey, type, value } = this.state;
    const { intl, visible, columns, selectedFieldOptions, theme } = this.props;
    const { formatMessage } = intl;

    // System auto-generate field should not be available to mass update
    const availabelColumns = columns.filter(col => col.is_sys_auto !== 1);
    return (
      <StyledModal
        title={formatMessage({ id: 'global.ui.button.massUpdate' })}
        visible={visible}
        onOk={this._onOk}
        onCancel={this._onCancel}
        okDisabled={fieldId === PhantomId}
        theme={theme}
        destroyOnClose
      >
        <Row className="mb-md">
          <Col
            {...labelCol}
            style={{
              textAlign: 'right',
              lineHeight: 2,
              paddingRight: 17,
            }}
          >
            {formatMessage({ id: 'global.form.field' })}
            <Tooltip title={formatMessage({ id: 'page.objectList.tooltip.field' })}>
              <Icon className="ml-sm icon-thinner font-sm" type="exclamation-circle-o" />
            </Tooltip>
          </Col>
          <Col {...valueCol}>
            <Select
              className="full-width"
              placeholder="Please select a field"
              size="small"
              onChange={newFieldId => this.handleFieldChange(newFieldId)}
            >
              {availabelColumns.map(col => (
                <Option key={col.id} value={col.id}>
                  {col.field_label}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        {fieldId !== PhantomId && (
          <CustomField
            id={fieldId}
            label={formatMessage({ id: 'global.form.value' })}
            lookupDisplayKey={lookupDisplayKey}
            name={fieldName}
            options={selectedFieldOptions}
            type={type}
            value={value}
            labelCol={labelCol}
            valueCol={valueCol}
            useDefaultRowCls={false}
            onChange={this.handleValueChange}
            format={type === DateTime
                      ? 'YYYY-MM-DD HH:mm:ss'
                      : 'YYYY-MM-DD'}
          />
        )}
      </StyledModal>
    );
  }
}


const mapStateToProps = ({ objectList }) => ({
  columns: objectList.columns,
  selectedFieldOptions: objectList.selectedFieldOptions,
  selectedRowKeys: objectList.selectedRowKeys,
  data: objectList.data,
});
const mapDispatchToProps = {
  setOptions,
  tryFetchOptionsById,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(MassUpdateModal));
