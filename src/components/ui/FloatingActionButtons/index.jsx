import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Button, Icon, Popconfirm } from 'antd';
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);

import Enums from 'utils/EnumsManager';
// presets
const buttons = [
  {
    key: 'Save',
    icon: 'save',
    func: '_onSaveClick',
  },
  {
    key: 'SaveAndNew',
    icon: 'plus',
    func: '_onSaveAndNewClick',
  },
  {
    key: 'RevertAll',
    icon: 'reload',
    func: '_onRevertClick',
  },
];

const renderButton = (btn, theme, formatMessage, methods) => {
  let btnCls = cx('floatBtn');
  switch(btn.key) {
    case 'Save':
      btnCls += ` ${theme}-theme-btn`;
    case 'SaveAndNew':
      return (
        <Button
          key={btn.key}
          className={btnCls}
          onClick={methods[btn.func]}
        >
          <Icon type={btn.icon} size="small" />
        </Button>
      );
    case 'RevertAll':
      btnCls += ' report-theme-btn';
      return (
        <Popconfirm
          key={btn.key}
          placement="bottomRight"
          title="Are you sure revert all values?"
          // title={formatMessage({ id: '' })}
          onConfirm={methods[btn.func]}
          okText="Yes"
          cancelText="No"
        >
          <Button
            key={btn.key}
            className={btnCls}
          >
            <Icon type={btn.icon} size="small" />
          </Button>
        </Popconfirm>
      );
    default:
      return null;
  }
};

const propTypes = {
  intl: intlShape.isRequired,
  theme: PropTypes.oneOf(Enums.ThemeTypesInArray),
  onSaveClick: PropTypes.func,
  onSaveAndNewClick: PropTypes.func,
  onRevertClick: PropTypes.func,
};


const FloatActionButtons = ({
  intl,
  theme,
  onSaveClick,
  onSaveAndNewClick,
  onRevertClick,
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

  const privateMethods = {
    _onSaveClick,
    _onSaveAndNewClick,
    _onRevertClick,
  };

  return (
    <div className={cx('btnsContainer')}>
      {buttons.map(btn => renderButton(btn, theme, intl.formatMessage, privateMethods))}
    </div>
  );
};


export default injectIntl(FloatActionButtons);