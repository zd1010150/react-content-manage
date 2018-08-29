import { Button, Icon, Popconfirm } from 'antd';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import styles from './index.less';

const cx = classNames.bind(styles);

const defaultProps = {
  type: 'icon',
  size: 'small',
};
const propTypes = {
  intl: intlShape.isRequired,
  onConfirm: PropTypes.func,
  placement: PropTypes.string,
  size: PropTypes.oneOf([
    'small', 'default', 'large',
  ]),
  text: PropTypes.string,
  type: PropTypes.oneOf([
    'button', 'icon', // icon is default
  ]),
};


const DeleteConfirmButton = ({
  intl,
  onConfirm,
  size,
  type,
  placement,
}) => {
  const _onConfirm = () => {
    if (_.isFunction(onConfirm)) {
      onConfirm();
    }
  };

  const { formatMessage } = intl;
  const i18n = 'global.ui';

  return (
    <Popconfirm
      cancelText={formatMessage({ id: `${i18n}.button.cancel` })}
      okText={formatMessage({ id: `${i18n}.button.ok` })}
      placement={placement}
      title={formatMessage({ id: `${i18n}.dialog.deleteTitle` })}
      onConfirm={_onConfirm}
    >
      {type === 'button' ? (
        <Button
          size={size}
        >
          <Icon className={`${cx('deleteIcon')} cursor-pointer`} size={size} type="delete" />
          {text}
        </Button>
      ) : (
        <Icon className={`${cx('deleteIcon')} cursor-pointer`} size={size} type="delete" />
      )}
    </Popconfirm>
  );
};

DeleteConfirmButton.defaultProps = defaultProps;
DeleteConfirmButton.propTypes = propTypes;
export default injectIntl(DeleteConfirmButton);
