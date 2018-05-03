import { Icon } from 'antd';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import styles from './index.less';

const cx = classNames.bind(styles);


const defaultProps = {
  onDoubleClick: () => {},
  onRevertClick: () => {},
  value: '',
};
const propTypes = {
  intl: intlShape.isRequired,
  id: PropTypes.number.isRequired,
  isValueChanged: PropTypes.bool.isRequired,
  onDoubleClick: PropTypes.func,
  onRevertClick: PropTypes.func,
  readOnly: PropTypes.bool.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};


const DisplayField = ({
  intl,
  id,
  isValueChanged,
  onRevertClick,
  onDoubleClick,
  readOnly,
  value,
}) => {
  const _onDoubleClick = $ => {
    if (!readOnly
        && _.isFunction(onDoubleClick)) {
      onDoubleClick(id);
    }
  };

  const _onRevertClick = $ => {
    if (_.isFunction(onRevertClick)) {
      onRevertClick(id);
    }
  };

  const i18nPrefix = 'page.customField';
  const { formatMessage } = intl;


  return (
    <div
      onDoubleClick={_onDoubleClick}
      className={cx('displayField')}
    >
      {value ? value : (
        readOnly
        ? null
        : <span className={cx('placeholder')}>
            {formatMessage({ id: `${i18nPrefix}.placeholder` })}
          </span>
      )}
      {isValueChanged && (
        <Icon
          className={cx('reloadIcon')}
          size="small"
          type="reload"
          onClick={_onRevertClick}
        />
      )}
      {readOnly && (
        <Icon
          className={cx('lockIcon')}
          size="small"
          type="lock"
        />
      )}
    </div>
  );
};


DisplayField.defaultProps = defaultProps;
DisplayField.propTypes = propTypes;
export default injectIntl(DisplayField);
