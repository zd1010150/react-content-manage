import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);

import Enums from 'utils/EnumsManager';

const defaultProps = {
  viewId: Enums.PhantomID,
  object: 'leads',
};
const propTypes = {
  intl: intlShape.isRequired,
  object: PropTypes.oneOf(Enums.ObjectTypesInArray).isRequired,
  viewId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

const ListTopButtons = ({ intl, object, viewId }) => {
  const { formatMessage } = intl;
  const shouldEditDisabled = viewId === Enums.PhantomID ? true : false;
  
  return (
    <Fragment>
      <Button size="small" className={cx('button')} disabled={shouldEditDisabled} >
        <Link to={`/${object}/views/${viewId}`}>
          {formatMessage({ id: 'global.ui.button.edit' })}
        </Link>
      </Button>
      <Button size="small" className={cx('button')}>
        <Link to={`/${object}/views/${Enums.PhantomID}`}>
          {formatMessage({ id: 'global.ui.button.createNew' })}
        </Link>
      </Button>
    </Fragment>
  );
};

ListTopButtons.defaultProps = defaultProps;
ListTopButtons.propTypes = propTypes;
export default injectIntl(ListTopButtons);