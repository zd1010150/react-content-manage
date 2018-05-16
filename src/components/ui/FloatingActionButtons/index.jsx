/* eslint-disable no-fallthrough */
import { Button, Icon, Tooltip } from 'antd';
import classNames from 'classnames/bind';
import { PopDeleteConfirm } from 'components/ui/index';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import Enums from 'utils/EnumsManager';
import styles from './index.less';

const cx = classNames.bind(styles);

const buttons = [
  {
    key: 'Save',
    icon: 'save',
    func: '_onSaveClick',
  },
  // Existed in prototype and design, but was requested to be removed in Issue #79
  // {
  //   key: 'SaveAndNew',
  //   icon: 'plus',
  //   func: '_onSaveAndNewClick',
  // },
  {
    key: 'RevertAll',
    icon: 'reload',
    func: '_onRevertClick',
  },
  {
    key: 'GoBack',
    icon: 'close',
    func: '_onGoBackClick',
  },
];

const renderButton = (btn, theme, formatMessage, methods) => {
  const i18n = 'global.ui';
  let btnCls = cx('floatBtn');
  switch (btn.key) {
    case 'Save':
      btnCls += ` ${theme}-theme-btn`;
    case 'SaveAndNew':
      return (
        <Tooltip
          key={btn.key}
          title={formatMessage({ id: `${i18n}.button.saveChange` })}
          placement="left"
        >
          <Button className={btnCls} onClick={methods[btn.func]}>
            <Icon type={btn.icon} size="small" />
          </Button>
        </Tooltip>
      );
    case 'RevertAll':
      btnCls += ' report-theme-btn';
      return (
        <PopDeleteConfirm
          key={btn.key}
          placement="left"
          msgId={`${i18n}.dialog.revertTitle`}
          onConfirm={methods[btn.func]}
        >
          <Tooltip title={formatMessage({ id: `${i18n}.button.redoAll` })} placement="left">
            <Button key={btn.key} className={btnCls}>
              <Icon type={btn.icon} size="small" />
            </Button>
          </Tooltip>
        </PopDeleteConfirm>
      );
    case 'GoBack':
      return (
        <Tooltip
          key={btn.key}
          title={formatMessage({ id: `${i18n}.button.goBack` })}
          placement="left"
        >
          <Button className={btnCls} onClick={methods[btn.func]}>
            <Icon type={btn.icon} size="small" />
          </Button>
        </Tooltip>
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
