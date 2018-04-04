import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);

import Enums from 'utils/EnumsManager';
// presets
const buttons = [
  {
    id: 1,
    icon: 'save',
    func: 'onSaveClick',
    cls: '',
  },
  {
    id: 2,
    icon: 'plus',
    func: 'onSaveAndNewClick',
    cls: '',
  },
  {
    id: 3,
    icon: 'reload',
    func: 'onRevertClick',
    cls: '',
  },
];


const propTypes = {
  theme: PropTypes.oneOf(Enums.ThemeTypesInArray),
  onSaveClick: PropTypes.func,
  onSaveAndNewClick: PropTypes.func,
  onRevertClick: PropTypes.func,
};


const FloatActionButtons = ({
  theme,
  ...others,
}) => {

  const _onSaveClick = $ => {
    if (_.isFunction(onSaveClick)) {
      onSaveClick();
    }
  }

  const _onSaveAndNewClick = $ => {
    if (_.isFunction(onSaveAndNewClick)) {
      onSaveAndNewClick();
    }
  }
  
  const _onRevertClick = $ => {
    if (_.isFunction(onRevertClick)) {
      onRevertClick();
    }
  }

  return (
    <div className={cx('btnsContainer')}>
      {buttons.map(btn => {
        let btnCls = btn.cls + cx('floatBtn');
        if (btn.id === 1) {
          btnCls += ` ${theme}-theme-btn`;
        } else if (btn.id === 3) {
          btnCls += ` report-theme-btn`;
        }
        return (
          <Button
            key={btn.id}
            className={btnCls}
            onClick={others[btn.func]}
          >
            <Icon type={btn.icon} size="small" />
          </Button>
        );
      })}
    </div>
  );
};


export default FloatActionButtons;