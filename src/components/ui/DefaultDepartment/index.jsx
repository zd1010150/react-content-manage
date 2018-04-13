import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { DEFAULT_DEPAREMTN } from 'config/app.config';
import classNames from 'classnames/bind';
import styles from './index.less';

const cx = classNames.bind(styles);

class DefaultDepartment extends React.Component {
  render() {
    const { onSelect, onDbClick } = this.props;
    return (
      <div className={cx('default-department-wrapper')} onClick={() => onSelect(DEFAULT_DEPAREMTN.id, DEFAULT_DEPAREMTN.name)} onDoubleClick={() => onDbClick(DEFAULT_DEPAREMTN.id, DEFAULT_DEPAREMTN.name)}>
        <Icon type="user" /> <span className={cx('default-department')}>{ DEFAULT_DEPAREMTN.name }</span>
      </div>
    );
  }
}

DefaultDepartment.defaultProps = {
  onSelect: () => {},
  onDbClick: () => {},
};
DefaultDepartment.propTypes = {
  onSelect: PropTypes.func,
  onDbClick: PropTypes.func,
};
export default DefaultDepartment;
