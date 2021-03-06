import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { Select, Col } from 'antd';
const Option = Select.Option;
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);

const defaultProps = {
  options: [],
};
const propTypes = {
  onChange: PropTypes.func.isRequired,
  activeId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  options: PropTypes.array.isRequired,
  intl: intlShape.isRequired,
};

const ViewFilter = ({ intl, onChange, activeId, options }) => {
  const { formatMessage } = intl;
  return (
    <Fragment>
      <label className={cx('filterLabel')}>
        {formatMessage({ id: 'global.ui.select.label' })}
      </label>
      <Select
        className={cx('filterSelect')}
        size="small"
        dropdownMatchSelectWidth={false}
        onChange={onChange}
        defaultValue="All"
      >
        {options.map(option => {
          const id = option.id;
          return (
            <Option
              key={id}
              value={id}
              disabled={activeId === id}
            >
              {option.view_name}
            </Option>
          );
        })}
      </Select>
    </Fragment>
  );
};

ViewFilter.defaultProps = defaultProps;
ViewFilter.propTypes = propTypes;
export default injectIntl(ViewFilter);