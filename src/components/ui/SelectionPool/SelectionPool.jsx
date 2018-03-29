import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);

const defaultProps = {};
const propTypes = {};

const SelectionPool = ({ theme, selectedUsers, selectedTeams, onTagClick, onTagDoubleClick, onTagClose }) => {
  // unique key for user selection
  // const newSelectedUsers = 
  const collection = [...selectedUsers, ...selectedTeams];
  return (
    <div className={cx('tagsContainer')}>
      {collection.map(item => (
        <Tag
          key={null}
          onClick={onTagClick}
          onDoubleClick={onTagDoubleClick}
          onClose={onTagClose}
        >
          {item.name}
        </Tag>
      ))}
    </div>
  );
};

SelectionPool.defaultProps = defaultProps;
SelectionPool.propTypes = propTypes;
export default SelectionPool;