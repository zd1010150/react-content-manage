import { Radio } from 'antd';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import Enums from 'utils/EnumsManager';
import styles from './index.less';
const cx = classNames.bind(styles);
const { FieldTypes, MasterKey } = Enums;
const { Lookup } = FieldTypes;


const getValueByType = (type, rawValue) => {
  if (type === Lookup) {
    // TODO: complete this after the backend changed the response structure
    return 'lookup';
  }
  return rawValue ? rawValue : '';
};


const defaultProps = {
  data: {},
  fieldKey: {},
  mergedData: {},
};
const propTypes = {
  data: PropTypes.object.isRequired,
  fieldKey: PropTypes.object.isRequired,
  mergedData: PropTypes.object.isRequired,
};


const RadioField = ({
  fieldKey,
  data,
  mergedData,
}) => {

  const { key, type, isFollowMaster } = fieldKey;
  const rawValue = data[key];
  const mergedValue = mergedData[key];
  const value = getValueByType(type, rawValue);
  return (
    <div className={cx('valueCol')}>
      <Radio
        className={isFollowMaster ? '' : 'lead-theme-radio'}
        data-key={key}
        data-value={key === MasterKey ? data.id : value}
        checked={key === MasterKey
                  ? data.id == mergedData[MasterKey]
                  : value === mergedValue}
        disabled={isFollowMaster}
      >
        {value}
      </Radio>
    </div>
  );
};


RadioField.defaultProps = defaultProps;
RadioField.propTypes = propTypes;
export default RadioField;