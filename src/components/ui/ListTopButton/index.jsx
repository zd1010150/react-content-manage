import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);
import EnumsManager from 'utils/EnumsManager';

const defaultProps = {
  id: 0,
  object: 'leads',
};
const propTypes = {
  id: PropTypes.any.isRequired,
  object: PropTypes.string.isRequired,
};

const ListTopButtons = ({ intl, object, id }) => {
  const { formatMessage } = intl;
  return (
    <Fragment>
      <Button size="small" className={cx('button')}>
        <Link to={`/${object}/views/${id}`}>
          {formatMessage({ id: 'global.ui.button.edit' })}
        </Link>
      </Button>
      <Button size="small" className={cx('button')}>
        <Link to={`/${object}/views/${EnumsManager.PhantomID}`}>
          {formatMessage({ id: 'global.ui.button.createNew' })}
        </Link>
      </Button>
    </Fragment>
  );
};

ListTopButtons.defaultProps = defaultProps;
ListTopButtons.propTypes = propTypes;
export default injectIntl(ListTopButtons);