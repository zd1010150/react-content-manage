import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Button, Icon, Popconfirm } from 'antd';


const defaultProps = {
  type: 'icon',
};
const propTypes = {
  onConfirm: PropTypes.func,
  placement: PropTypes.string,
  size: PropTypes.oneOf([
    'small', 'default', 'large',
  ]).isRequired,
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
          <Icon className="deleteIcon cursor-pointer" size={size} type="delete" />
          {text}
        </Button>
      ) : (
        <Icon className="deleteIcon cursor-pointer" size={size} type="delete" />
      )}
    </Popconfirm>
  );
};

DeleteConfirmButton.defaultProps = defaultProps;
DeleteConfirmButton.propTypes = propTypes;
export default injectIntl(DeleteConfirmButton);
