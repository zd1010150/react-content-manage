import { Radio } from 'antd';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import Enums from 'utils/EnumsManager';
import styles from './index.less';

const cx = classNames.bind(styles);
const { FieldTypes, MasterKey } = Enums;
const { Lookup } = FieldTypes;


const getDisplayValueByType = (type, data, key, lookupKey) => {
  if (type === Lookup) {
    return data[key] && data[key][lookupKey] ? data[key][lookupKey] : '';
  }
  return data[key] ? data[key] : '';
};
const getValueByType = (type, data, key, lookupKey) => {
  if (key === MasterKey) {
    return data.id;
  } else if (type === Lookup) {
    return data[key] ? data[key].id : data[key];
  }
  return data[key];
};
const shouldCheck = (key, type, data, mergedData) => {
  if (key === MasterKey) {
    return data.id && data.id === mergedData.id;
  } else if (type === Lookup) {
    return data[key] === null
            ? mergedData[key] === null
            : data[key] && data[key].id === mergedData[key];
  }
  return data[key] !== void 0 && data[key] === mergedData[key];
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
  onChange,
}) => {

  const _onChange = (key, value) => {    
    if (_.isFunction(onChange)) {
      onChange(key, value);
    }
  }

  const { key, lookupKey, type, isFollowMaster } = fieldKey;
  const value = getValueByType(type, data, key, lookupKey);
  const mergedValue = getValueByType(type, mergedData, key, lookupKey);

  return (
    <div className={cx('valueCol')}>
      <Radio
        className={isFollowMaster ? '' : 'lead-theme-radio'}
        checked={shouldCheck(key, type, data, mergedData)}
        disabled={isFollowMaster}
        onChange={e => _onChange(key, value)}
      >
        {getDisplayValueByType(type, data, key, lookupKey)}
      </Radio>
    </div>
  );
};


RadioField.defaultProps = defaultProps;
RadioField.propTypes = propTypes;
export default RadioField;
