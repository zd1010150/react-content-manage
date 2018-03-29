import React from 'react';
import PropTypes from 'prop-types';
import { Tag, Icon } from 'antd';
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);

import Enums from 'utils/EnumsManager';

// defaultProps will not work with pure component
const propTypes = {
  theme: PropTypes.oneOf(Enums.ThemeTypesInArray),
  selectedUsers: PropTypes.array,
  selectedTeams: PropTypes.array,
  onTagClick: PropTypes.func,
  onTagDoubleClick: PropTypes.func,
  onTagClose: PropTypes.func,
  closable: PropTypes.bool,
  withIcon: PropTypes.bool,
};

const SelectionPool = ({
  theme,
  selectedUsers,
  selectedTeams,
  onTagClick,
  onTagDoubleClick,
  onTagClose,
  closable,
  withIcon,
}) => {
  
  // Internal methods
  const _onTagClick = e => {
    console.log('on single click');
    if (_.isFunction(onTagClick)) {
      const { id, isTeam } = e.target.dataset;
      onTagClick(id, isTeam);
    }
  };
  const _onTagDoubleClick = e => {
    console.log('on double click');
    if (_.isFunction(onTagDoubleClick)) {
      const { id, isTeam } = e.target.dataset;
      onTagDoubleClick(id, isTeam);
    }
  };
  const _onTagClose = e => {
    // Avoid further trigger on onTagClick via propagation
    e.stopPropagation();
    if (_.isFunction(onTagClose)) {
      const { id, isTeam } = e.target.dataset;
      onTagClose(id, isTeam);
    }
  };

  const collection = [...selectedUsers, ...selectedTeams];
  return (
    <div className={cx('tagsContainer')}>
      {collection.map(item => {

        const isTeam = item.team_id === undefined;
        const key = isTeam ? `t${item.id}` : item.id;
        const iconType = isTeam ? 'team' : 'user';
        const cls = isTeam ? '' : `${theme}-theme-tag`;
        return (
          <Tag
            key={key}
            className={cls}
            data-id={item.id}
            data-is-team={isTeam}
            onClick={_onTagClick}
            onDoubleClick={_onTagDoubleClick}
            onClose={_onTagClose}
            closable
          >
            {withIcon && <Icon type={iconType} size="small" />}
            {item.name}
          </Tag>
        );
      })}
    </div>
  );
};

SelectionPool.propTypes = propTypes;
export default SelectionPool;