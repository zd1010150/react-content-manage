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
  {
    key: 'GoBack',
    icon: 'logout',
    func: '_onGoBackClick',
  },
];

const renderButton = (btn, theme, formatMessage, methods) => {
  const i18nPrefix = 'global.ui';
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
          title={formatMessage({ id: `${i18nPrefix}.dialog.revertTitle` })}
          onConfirm={methods[btn.func]}
          okText={formatMessage({ id: `${i18nPrefix}.button.ok` })}
          cancelText={formatMessage({ id: `${i18nPrefix}.button.cancel` })}
        >
          <Button
            key={btn.key}
            className={btnCls}
          >
            <Icon type={btn.icon} size="small" />
          </Button>
        </Popconfirm>
      );
    case 'GoBack':
      return (
        <Button
          key={btn.key}
          className={btnCls}
          onClick={methods[btn.func]}
        >
          <Icon type={btn.icon} size="small" />
        </Button>
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
  onGoBackClick: PropTypes.func,
};


const FloatActionButtons = ({
  intl,
  theme,
  onSaveClick,
  onSaveAndNewClick,
  onRevertClick,
  onGoBackClick,
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

  const _onGoBackClick = $ => {
    if (_.isFunction(onGoBackClick)) {
      onGoBackClick();
    }
  }

  const privateMethods = {
    _onSaveClick,
    _onSaveAndNewClick,
    _onRevertClick,
    _onGoBackClick,
  };

  return (
    <div className={cx('btnsContainer')}>
      {buttons.map(btn => renderButton(btn, theme, intl.formatMessage, privateMethods))}
    </div>
  );
};


export default injectIntl(FloatActionButtons);