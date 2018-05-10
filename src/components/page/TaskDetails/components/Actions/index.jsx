import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Button, Icon, Popconfirm } from 'antd';
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);
// presets
const buttons = [
  {
    cls: 'saveBtn',
    key: 'save',
    icon: 'save',
  },
  // {
  //   cls: 'saveAndNewBtn',
  //   key: 'saveAndNew',
  //   icon: 'plus',
  // },
  {
    cls: 'cancelBtn',
    key: 'cancel',
    icon: 'close',
  },
];

const propTypes = {
  intl: intlShape.isRequired,
  objectId: PropTypes.string,
  objectType: PropTypes.string,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  onSave: PropTypes.func,
  onSaveAndNew: PropTypes.func,
};


const Actions = ({
  intl,
  objectId,
  objectType,
  onCancel,
  onDelete,
  onSave,
  onSaveAndNew,
}) => {

  const _onCancel = $ => {
    if (_.isFunction(onCancel)) {
      onCancel();
    }
  };

  const _onDelete = $ => {
    if (_.isFunction(onDelete)) {
      onDelete(objectId, objectType);
    }
  };
  
  const _onSave = $ => {
    if (_.isFunction(onSave)) {
      onSave();
    }
  };

  const _onSaveAndNew = $ => {
    if (_.isFunction(onSaveAndNew)) {
      onSaveAndNew();
    }
  };

  const getFuncByKey = key => {
    switch(key) {
      case 'cancel':
        return _onCancel;
      case 'delete':
        return _onDelete;
      case 'save':
        return _onSave;
      case 'saveandnew':
        return _onSaveAndNew;
    };
  }

  const i18nPrefix = 'global.ui.button';
  const { formatMessage } = intl;

  return (
    <Fragment>
      {buttons.map((btn, i) => {
        if (btn.key === 'delete') {
          return (
            <Popconfirm              
              cancelText={formatMessage({ id: `${i18nPrefix}.cancel` })}
              key={i}
              okText={formatMessage({ id: `${i18nPrefix}.ok` })}
              onConfirm={_onDelete}
              title={formatMessage({ id: 'global.ui.dialog.deleteTitle' })}
            >
              <Button className={cx(btn.cls) + ' mr-sm'}>
                <Icon size="small" type={btn.icon} />
                {formatMessage({ id: `${i18nPrefix}.${btn.key}` })}
              </Button>
            </Popconfirm>
          );
        }
        return (
          <Button
            className={cx(btn.cls) + ' mr-sm'}
            key={i}
            onClick={getFuncByKey(btn.key)}
          >
            <Icon className="font-sm" type={btn.icon} />
            {formatMessage({ id: `${i18nPrefix}.${btn.key}` })}
          </Button>
        );
      })}
    </Fragment>
  );
};


export default injectIntl(Actions);