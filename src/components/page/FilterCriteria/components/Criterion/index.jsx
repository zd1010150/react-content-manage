import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { Select, Row, Col, Icon, Popconfirm } from 'antd';
const Option = Select.Option;
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);

import { ValueCriteriaField } from '../index';
import Enums from 'utils/EnumsManager';

const sideColLayout = {
  xs: 24,
  sm: 1,
};
const colLayout = {
  xs: 24,
  sm: 7,
}

const propTypes = {
  intl: intlShape.isRequired,
  displayNum: PropTypes.number.isRequired,
  condition: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.oneOf([
    ...Enums.FieldTypesInArray,
    '', // TODO: not best practice
  ]).isRequired,
  conditions: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired,
  options: PropTypes.array,
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
  options,
  handleFieldChange,
  handleConditionChange,
  handleValueChange,
  handleFilterRemove,
}) => {

  const globalI18nPrefix = 'global.ui';
  const { formatMessage } = intl;

  return (
    <Row gutter={16} style={{ marginBottom: 10 }}>
      <Col {...sideColLayout} className={cx('displayNumCol')}>
        {displayNum}
      </Col>
      <Col {...colLayout}>
        <Select
          size="small"
          className={cx('select')}
          value={fieldId === Enums.PhantomID ? '' : fieldId}
          onChange={newFieldId => handleFieldChange(newFieldId, displayNum)}
        >
          {fields.map(field =>
            <Option key={field.id} value={field.id}>{field.field_label}</Option>
          )}
        </Select>
      </Col>
      <Col {...colLayout}>
        <Select
          size="small"
          className={cx('select')}
          value={conditionId === Enums.PhantomID ? '' : conditionId}
          onChange={conditionId => handleConditionChange(conditionId, displayNum)}
        >
          {conditions.map(condition =>
            <Option key={condition.id} value={condition.id}>{condition.display_value}</Option>
          )}
        </Select>
      </Col>
      <Col {...colLayout}>
        {type
          ? <ValueCriteriaField displayNum={displayNum} type={type} handleValueChange={handleValueChange} value={value} />
          : <span className={cx('message')}>{formatMessage({ id: 'page.customField.message'})}</span>}
      </Col>
      <Col {...sideColLayout}>
        <Popconfirm
          title={formatMessage({ id: `${globalI18nPrefix}.dialog.deleteTitle`})}
          onConfirm={e => handleFilterRemove(displayNum)}
          okText={formatMessage({ id: `${globalI18nPrefix}.button.ok` })}
          cancelText={formatMessage({ id: `${globalI18nPrefix}.button.cancel` })}
        >
          <Icon className={cx('deleteIcon')} type="delete" />
        </Popconfirm>
      </Col>
    </Row>
  );
};

Criterion.propTypes = propTypes;
export default injectIntl(Criterion);