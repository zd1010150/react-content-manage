import { Button } from 'antd';
import { PopDeleteConfirm } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import Enums from 'utils/EnumsManager';

const { Leads, Accounts, Opportunities, Report, Email } = Enums.ObjectTypes;
const { Convert, Delete, Sharing, FindDuplicates } = Enums.DetailTools;

const getSubPathByCode = (code) => {
  switch (code) {
    case Convert:
      return 'convert/find';
    case Sharing:
      return 'sharing';
    case FindDuplicates:
      return 'find';
    default:
      return '';
  }
};

const renderToolByCode = (id, type, code, formatMessage, clickHandler) => {
  const i18nPrefix = 'global.ui';
  const text = formatMessage({ id: `${i18nPrefix}.detailTools.${code}` });

  switch (code) {
    case Convert:
    case Sharing:
    case FindDuplicates:
      return (
        <Link key={code} to={`/${type}/${getSubPathByCode(code)}/${id}`}>
          <Button
            className="ml-sm"
            size="small"
          >
            {text}
          </Button>
        </Link>
      );
    case Delete:
      return (
        <PopDeleteConfirm
          key={code}
          onConfirm={e => clickHandler()}
          placement="bottomRight"
        >
          <Button className="ml-sm" size="small">{text}</Button>
        </PopDeleteConfirm>
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

  switch (type) {
    case Leads:
    case Accounts:
      return (
        <Fragment>
          {tools.map(tool => renderToolByCode(id, type, tool.code, formatMessage, _onDelete))}
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
