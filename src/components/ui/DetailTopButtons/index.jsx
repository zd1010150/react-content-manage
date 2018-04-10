import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import { Button, Popconfirm } from 'antd';

import Enums from 'utils/EnumsManager';

// presets
const { Leads, Accounts, Opportunities, Report, Email } = Enums.ObjectTypes;

const { Convert, Delete, Sharing, FindDuplicates } = Enums.DetailTools;

const renderToolByCode = (code, formatMessage, clickHandler) => {
  const i18nPrefix = 'global.ui';
  const text = formatMessage({ id: `${i18nPrefix}.detailTools.${code}` });

  switch(code) {
    case Convert:
    case Sharing:
    case FindDuplicates:
      const link = '';
      // const link = `../../${type}/${path}/${id}`;
      return (
        <Button
          className="ml-sm"
          key={code}
          size="small"
        >
          <Link to={link}>{text}</Link>
        </Button>
      );
    case Delete:
      return (
        <Popconfirm
          key={code}
          cancelText={formatMessage({ id: `${i18nPrefix}.button.cancel` })}
          onConfirm={e => clickHandler()}
          okText={formatMessage({ id: `${i18nPrefix}.button.ok` })}
          placement="bottomRight"
          title={formatMessage({ id: `${i18nPrefix}.dialog.deleteTitle` })}
        >
          <Button className="ml-sm" size="small">{text}</Button>
        </Popconfirm>
      );
    default:
      return null;
  }
};


const propTypes = {
  intl: intlShape.isRequired,
  type: PropTypes.oneOf(Enums.ObjectTypesInArray).isRequired,
  tools: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      sequence: PropTypes.number.isRequired,
    })
  ).isRequired,
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  onDelete: PropTypes.func,
};


const DetailTopButtons = ({ intl, type, tools, id, onDelete }) => {
  const { formatMessage } = intl;

  const _onDelete = $ => {
    if (_.isFunction(onDelete)) {
      onDelete(id);
    }
  };

  switch(type) {
    case Leads:
    case Accounts:
      return (
        <Fragment>
          {tools.map(tool => renderToolByCode(tool.code, formatMessage, _onDelete))}
        </Fragment>
      );
    case Opportunities:
    case Report:
    case Email:
    default:
      return null;
  }
};


DetailTopButtons.propTypes = propTypes;
export default injectIntl(DetailTopButtons);