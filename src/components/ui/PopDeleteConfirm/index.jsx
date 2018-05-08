/**
 * This is a wrapper component based on Popconfirm of Ant design.
 * It serves as a common component for most confirmation required by delete button click in logix crm.
 */
import { Icon, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';


const defaultProps = {
  iconType: 'exclamation-circle',
  msgId: 'global.ui.dialog.deleteTitle',
  onConfirm: null,
};
const propTypes = {
  intl: intlShape.isRequired,
  iconType: PropTypes.string,
  msgId: PropTypes.string,
  onConfirm: PropTypes.func,
};

const PopDeleteConfirm = ({
  intl,
  children,
  iconType,
  msgId,
  onConfirm,
}) => {
  const { formatMessage } = intl;
  const title = (
    <Fragment>
      <Icon className="titleIcon mr-sm" type={iconType} />
      {formatMessage({ id: msgId })}
    </Fragment>
  );

  return (
    <Popconfirm
      title={title}
      onConfirm={onConfirm}
      overlayClassName="popDeleteConfirm"
      okType="danger"
    >
      {children}
    </Popconfirm>
  );
};


PopDeleteConfirm.defaultProps = defaultProps;
PopDeleteConfirm.propTypes = propTypes;
export default injectIntl(PopDeleteConfirm);
