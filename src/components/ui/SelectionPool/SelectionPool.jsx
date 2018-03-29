import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);

const defaultProps = {};
const propTypes = {};

const SelectionPool = ({ theme, selectedUsers, selectedTeams, onTagClick, onTagDoubleClick, onTagClose }) => {
  const collection = [...selectedUsers, ...selectedTeams];
  return (
    <div className={cx('tagsContainer')}>
      {collection.map(item => )}
    </div>
  );
};

SelectionPool.defaultProps = defaultProps;
SelectionPool.propTypes = propTypes;
export default SelectionPool;