import { Col, Row, Select } from 'antd';
import classNames from 'classnames/bind';
import { DeleteConfirmButton } from 'components/ui/index';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './index.less';

const { Option } = Select;
const cx = classNames.bind(styles);
const mainColLayout = {
  sm: 8,
  xs: 24,
};


const defaultProps = {
  fieldId: null,
  conditionId: null,
  shouldConditionDisabled: false,
  onFilterFieldChange: null,
  onFilterConditionChange: null,
  onFilterValueChange: null,
  onFilterDeleteClick: null,
  onSiderChange: null,
};
const propTypes = {
  // TODO: Put the complex prop check into util file and apply more strict rules.
  displayNum: PropTypes.number.isRequired,
  fieldId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  conditionId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  availableFields: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    lookupKey: PropTypes.string.isRequired,
  })).isRequired,
  availableConditions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    display_value: PropTypes.string.isRequired,
  })).isRequired,
  shouldConditionDisabled: PropTypes.bool,
  onFilterFieldChange: PropTypes.func,
  onFilterConditionChange: PropTypes.func,
  onFilterValueChange: PropTypes.func,
  onFilterDeleteClick: PropTypes.func,
  onSiderChange: PropTypes.func,
};

const Criterion = ({
  displayNum,
  fieldId,
  conditionId,
  availableFields,
  availableConditions,
  shouldConditionDisabled,
  // Handlers
  onFilterFieldChange,
  onFilterConditionChange,
  onFilterValueChange,
  onFilterDeleteClick,
  onSiderChange,
}) => (
  <div className={`${cx('row')} mb-md`}>
    {/* Display Num Col */}
    <div className={`${cx('numCol')} text-center`}>{displayNum}</div>
    {/* Main Col */}
    <Row className={cx('mainCol')} gutter={16}>
      {/* Field Col */}
      <Col {...mainColLayout}>
        <Select
          size="small"
          className="full-width"
          value={fieldId}
          onChange={onFilterFieldChange}
        >
          {availableFields.map(af => (
            <Option key={af.id} value={af.id}>{af.label}</Option>
          ))}
        </Select>
      </Col>
      {/* Condition Col */}
      <Col {...mainColLayout}>
        <Select
          size="small"
          disabled={shouldConditionDisabled}
          className="full-width"
          value={conditionId}
          onChange={onFilterConditionChange}
        >
          {availableConditions.map(ac => (
            <Option key={ac.id} value={ac.id}>{ac.display_value}</Option>
          ))}
        </Select>
      </Col>
      {/* Value Col */}
      <Col {...mainColLayout} />
    </Row>
    {/* Action Col */}
    <div className={cx('actionCol')}>
      <DeleteConfirmButton
        size="small"
        placement="right"
        onConfirm={onFilterDeleteClick}
      />
    </div>
  </div>
);

Criterion.defaultProps = defaultProps;
Criterion.propTypes = propTypes;
export default Criterion;
