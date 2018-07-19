import { Col, Icon, Row, Select } from 'antd';
import classNames from 'classnames/bind';
import { ErrorText, PopDeleteConfirm } from 'components/ui/index';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import Enums from 'utils/EnumsManager';
import { ValueCriteriaField } from '../index';
import styles from './index.less';

const { Option } = Select;
const cx = classNames.bind(styles);


const sideColLayout = {
  xs: 24,
  sm: 1,
};
const colLayout = {
  xs: 24,
  sm: 7,
};
const getFieldCls = (hasError) => {
  const errorCls = hasError ? 'has-error' : '';
  return `full-width ${errorCls}`;
};

const propTypes = {
  intl: intlShape.isRequired,
  displayNum: PropTypes.number.isRequired,
  condition: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  type: PropTypes.oneOf([
    ...Enums.FieldTypesInArray,
    '', // TODO: not best practice
  ]).isRequired,
  conditions: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired,
};


const Criterion = ({
  intl,

  displayNum,
  fieldId,
  conditionId,
  value,
  type,

  fields,
  conditions,
  handleFieldChange,
  handleConditionChange,
  handleValueChange,
  handleAddonClick,
  handleFilterRemove,
  handleTimeRangeChange,
}) => {
  const { formatMessage } = intl;
  const valueCriteriaFieldProps = {
    displayNum,
    type,
    value,
    handleValueChange,
    handleAddonClick,
    handleTimeRangeChange,
  };

  return (
    <Row gutter={16} style={{ marginBottom: 10 }}>
      <Col {...sideColLayout} className={cx('displayNumCol')}>
        {displayNum}
      </Col>
      <Col {...colLayout}>
        <Select
          size="small"
          className={getFieldCls(fieldId === Enums.PhantomId)}
          value={fieldId === Enums.PhantomId ? '' : fieldId}
          onChange={newFieldId => handleFieldChange(newFieldId, displayNum)}
        >
          {fields.map(field => (
            <Option
              key={field.id}
              value={field.id}
            >
              {field.field_label}
            </Option>
          ))}
        </Select>
        {fieldId === Enums.PhantomId && <ErrorText intlId="global.errors.inputRequired" />}
      </Col>
      <Col {...colLayout}>
        <Select
          size="small"
          className={getFieldCls(conditionId === Enums.PhantomId)}
          value={conditionId === Enums.PhantomId ? '' : conditionId}
          onChange={conditionId => handleConditionChange(conditionId, displayNum)}
        >
          {conditions.map(condition => (
            <Option
              key={condition.id}
              value={condition.id}
            >
              {condition.display_value}
            </Option>
          ))}
        </Select>
        {conditionId === Enums.PhantomId && <ErrorText intlId="global.errors.inputRequired" />}
      </Col>
      <Col {...colLayout}>
        {type ? <ValueCriteriaField {...valueCriteriaFieldProps} />
              : <span className={cx('message')}>{formatMessage({ id: 'page.filterCriteria.columns.emptyMsg'})}</span>}
      </Col>
      <Col {...sideColLayout}>
        <PopDeleteConfirm onConfirm={() => handleFilterRemove(displayNum)}>
          <Icon className={`cursor-pointer ${cx('deleteIcon')}`} type="delete" />
        </PopDeleteConfirm>
      </Col>
    </Row>
  );
};

Criterion.propTypes = propTypes;
export default injectIntl(Criterion);
