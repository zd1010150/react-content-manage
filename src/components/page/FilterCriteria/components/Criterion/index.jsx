import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { Select, Row, Col, Icon, Input } from 'antd';
const Option = Select.Option;
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);

import { CustomField } from 'components/ui/index';
import Enums from 'utils/EnumsManager';

const propTypes = {
  intl: intlShape.isRequired,
  displayNum: PropTypes.number.isRequired,
  label: PropTypes.string,
  fieldType: PropTypes.oneOf([
    ...Enums.FieldTypesInArray,
    '', // TODO: not best practice
  ]).isRequired,
  condition: PropTypes.string,
  value: PropTypes.string,
  conditions: PropTypes.array.isRequired,
  allFields: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired,
};

const Criterion = ({
  intl,
  displayNum = 1,
  label,
  fieldType = Enums.FieldTypes.Text,
  condition,
  value,
  onRemoveFilter,
  allFields = [],
  conditions = [],
  options = [],
  handleFieldChange,
  handleConditionChange,
}) => {

  const sideColLayout = {
    xs: 24,
    sm: 1,
  };
  const colLayout = {
    xs: 24,
    sm: 7,
  }

  return (
    <Row gutter={16} style={{ marginBottom: 10 }}>
      <Col {...sideColLayout} className={cx('displayNumCol')}>
        {displayNum}
      </Col>
      <Col {...colLayout}>
        <Select
          size="small"
          className={cx('select')}
          onChange={fieldId => handleFieldChange(fieldId, displayNum)}
        >
          {allFields.map(field => 
            <Option key={field.id} value={field.id}>{field.field_label}</Option>
          )}
        </Select>
      </Col>
      <Col {...colLayout}>
        <Select
          size="small"
          className={cx('select')}
          onChange={conditionId => handleConditionChange(conditionId, displayNum)}
        >
          {conditions.map(condition =>
            <Option key={condition.id} value={condition.id}>{condition.display_value}</Option>
          )}
        </Select>
      </Col>
      <Col {...colLayout}>
        {fieldType
          ? <CustomField type={fieldType} options={options}/>
          : <span className={cx('message')}>{intl.formatMessage({ id: 'page.customField.message'})}</span>}
      </Col>
      <Col {...sideColLayout}>
        <Icon
          className={cx('deleteIcon')}
          data-display-num={displayNum}
          onClick={onRemoveFilter}
          type="delete"
        />
      </Col>
    </Row>
  );
};

Criterion.propTypes = propTypes;
export default injectIntl(Criterion);