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
  availableFields: [],
  conditionDisabled: false,
  onFilterFieldChange: null,
  onFilterConditionChange: null,
  onFilterValueChange: null,
  onFilterDeleteClick: null,
  onSiderChange: null,
};
const propTypes = {
  // TODO: add more check with shape of to availables
  availableFields: PropTypes.array,
  availableConditions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    display_value: PropTypes.string,
  })).isRequired,
  conditionDisabled: PropTypes.bool,
  onFilterFieldChange: PropTypes.func,
  onFilterConditionChange: PropTypes.func,
  onFilterValueChange: PropTypes.func,
  onFilterDeleteClick: PropTypes.func,
  onSiderChange: PropTypes.func,
};

const Criterion = ({
  displayNum,
  availableFields,
  availableConditions,
  conditionDisabled,
  // Handlers
  onFilterFieldChange,
  onFilterConditionChange,
  onFilterValueChange,
  onFilterDeleteClick,
  onSiderChange,
}) => {
  return (
    <div className={cx('row')}>
      {/* Display Num Col */}
      <div className={cx('numCol')}>{displayNum}</div>
      <Row className={cx('mainCol')} gutter={16}>
        {/* Field Col */}
        <Col {...mainColLayout}>
          <Select
            className="full-width"
            onChange={onFilterFieldChange}
          >
            {availableFields.map(f => (
              <Option key={f} value={f}>{f.label}</Option>
            ))}
          </Select>
        </Col>
        {/* Condition Col */}
        <Col {...mainColLayout}>
          <Select
            disabled={conditionDisabled}
            className="full-width"
            onChange={onFilterConditionChange}
          >
            {availableConditions.map(c => (
              <Option key={c.id} value={c.id}>{c.display_value}</Option>
            ))}
          </Select>
        </Col>
        {/* Value Col */}
      </Row>
      {/* Action Col */}
      <div className={cx('actionCol')}>
        <DeleteConfirmButton
          size="small"
          placement="right"
          onConfirm={e => onFilterDeleteClick(e)}
        />
      </div>
    </div>
  );
};

Criterion.defaultProps = defaultProps;
Criterion.propTypes = propTypes;
export default Criterion;
