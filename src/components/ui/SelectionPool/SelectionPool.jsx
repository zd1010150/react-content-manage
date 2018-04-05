import React from 'react';
import PropTypes from 'prop-types';
import { Tag, Icon } from 'antd';
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);

import Enums from 'utils/EnumsManager';

const propTypes = {
  theme: PropTypes.oneOf(Enums.ThemeTypesInArray),
  users: PropTypes.array,
  teams: PropTypes.array,
  onTagClick: PropTypes.func,
  onTagDoubleClick: PropTypes.func,
  onTagClose: PropTypes.func,
  closable: PropTypes.bool,
  withIcon: PropTypes.bool,
  addonAfter: PropTypes.element,
};

const SelectionPool = ({
  theme,
  users,
  teams,
  onTagClick,
  onTagDoubleClick,
  onTagClose,
  closable,
  withIcon,
  addonAfter,
}) => {
  
  // Internal methods
  const _onTagClick = (e, item, isTeam) => {
    if (_.isFunction(onTagClick)) {
      onTagClick(item.id, isTeam);
    }
  };
  const _onTagDoubleClick = (e, item, isTeam) => {
    // TODO: add debounce to separate double click and single click twice
    if (_.isFunction(onTagDoubleClick)) {
      onTagDoubleClick(item.id, item, isTeam);
    }
  };
  const _onTagClose = (e, item, isTeam) => {
    // Avoid further trigger on onTagClick via propagation
    e.stopPropagation();
    if (_.isFunction(onTagClose)) {
      onTagClose(item.id, isTeam);
    }
  };

  // Cannot assign default values for pure component, so we have to manually check and assign them here.
  if (_.isEmpty(users)) {
    users = [];
  }
  if (_.isEmpty(teams)) {
    teams = [];
  }
  const collection = [...users, ...teams];
  return (
    <div className={cx('tagsContainer')}>
      {collection.map(item => {

        const isTeam = item.team_id === undefined;
        const key = isTeam ? `t${item.id}` : item.id;
        const cls = isTeam ? '' : `${theme}-theme-tag`;
        const iconType = isTeam ? 'team' : 'user';

        return (
          <Tag
            key={key}
            className={cls}
            onClick={e => _onTagClick(e, item, isTeam)}
            onDoubleClick={e => _onTagDoubleClick(e, item, isTeam)}
            onClose={e => _onTagClose(e, item, isTeam)}
            closable={closable}
          >
            {withIcon && <Icon type={iconType} size="small" />}
            {item.name}
            {addonAfter}
          </Tag>
        );
      })}
    </div>
  );
};

SelectionPool.propTypes = propTypes;
export default SelectionPool;