import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import styles from './ViewFilter.less';
const cx = classNames.bind(styles);
import { Select, Col } from 'antd';
const Option = Select.Option;

const propTypes = {
  onChange: PropTypes.func.isRequired,
  activeId: PropTypes.any.isRequired,
  options: PropTypes.array.isRequired,
  intl: intlShape.isRequired,
};
const defaultProps = {
  options: [],
};

const ViewFilter = ({ intl, onChange, activeId, options }) => {
  const { formatMessage } = intl;
  console.log(`options are -> ${options}`);
  return (
    <Fragment>
      <label className={cx('filterLabel')}>
        {formatMessage({ id: 'global.ui.select.label' })}
      </label>
      <Select style={{ width: 120 }} onChange={onChange}>
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

ViewFilter.propTypes = propTypes;
ViewFilter.defaultProps = defaultProps;
export default injectIntl(ViewFilter);