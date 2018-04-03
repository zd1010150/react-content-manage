import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import Enums from 'utils/EnumsManager';
const { Leads, Accounts, Opportunities, Report, Email } = Enums.ObjectTypes;


const propTypes = {
  intl: intlShape.isRequired,
  type: PropTypes.oneOf(Enums.ObjectTypesInArray).isRequired,
  tools: PropTypes.array,
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  onDelete: PropTypes.func,
};


const DetailTopButtons = ({ intl, type, tools, id, onDelete }) => {
  const { formatMessage } = intl;

  const _onDelete = (id, key) => {
    if (_.isFunction(onDelete) && key === 'delete') {
      onDelete(id);
    }
  };

  switch(type) {
    case Leads:
    case Accounts:
      return (
        <Fragment>
          {tools.map((tool, i) => {
            const action = Enums.DetailActions.find(action => action.key === tool);
            if (!action) return null;

            const { key, path } = action;
            const text = formatMessage({ id: `global.ui.button.${key}` });
            return (
              <Button
                key={i}
                size="small"
                className="ml-sm"
                disabled={id == Enums.PhantomID}
                onClick={e => _onDelete(id, key)}
              >
                {key === 'delete'
                  ? text
                  : (
                  <Link to={`${type}/${path}/${id}`}>
                    {formatMessage({ id: `global.ui.button.${key}` })}
                  </Link>
                )}
              </Button>
            );
          })}
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