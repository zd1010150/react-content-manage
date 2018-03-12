import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Button, Icon, Popconfirm } from 'antd';

const defaultProps = {
  selectedIds: [],
};
const propTypes = {
  intl: intlShape.isRequired,
  theme: PropTypes.oneOf(['lead', 'account', 'opport']),
  selectedIds: PropTypes.array.isRequired,
  onMassUpdateClick: PropTypes.func,
  onMassDeleteClick: PropTypes.func,
};

const LeftActions = ({ intl, theme, selectedIds, onMassUpdateClick, onMassDeleteClick, permissions }) => {
  const { formatMessage } = intl;
  const btnSettings = {
    className: `btn-ellipse ml-sm ${theme}-theme-btn`,
    size: 'small',
    disabled: selectedIds.length === 0,
  };

  // TODO: add permission check to show or hide buttons

  return (
    <Fragment>
      <Button {...btnSettings} onClick={onMassUpdateClick} >
        <Icon type="edit"/>
        {formatMessage({ id: 'global.ui.button.massUpdate' })}
      </Button>
      <Popconfirm
        title='Are you sure to delete them all?'
        onConfirm={onMassDeleteClick}
      >
        <Button {...btnSettings} >
          <Icon type="delete"/>
          {formatMessage({ id: 'global.ui.button.massDelete' })}
        </Button>
      </Popconfirm>
    </Fragment>
  );
};

LeftActions.defaultProps = defaultProps;
LeftActions.propTypes = propTypes;
export default injectIntl(LeftActions);