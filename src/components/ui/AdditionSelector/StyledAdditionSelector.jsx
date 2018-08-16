import classNames from 'classnames/bind';
import React from 'react';
import AdditionSelector from './AdditionSelector';
import styles from './index.less';

const cx = classNames.bind(styles);

const StyledAdditionSelector = props => (
  <AdditionSelector
    {...props}
    inputCls={`${cx('input')} text-center`}
    selectCls={cx('select')}
    displayCls={`${cx('display')} text-right pr-md`}
  />
);

export default StyledAdditionSelector;
