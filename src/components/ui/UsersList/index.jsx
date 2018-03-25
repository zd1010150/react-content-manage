import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Input, Row, Col, Icon, Tag } from 'antd';
const Search = Input.Search;
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);

import Enums from 'utils/EnumsManager';

const defaultProps = {
  theme: 'lead',
  withFilter: false,
  showHeader: false,
  showTeams: false,
  canRemoveItem: false,
  users: [],
  teams: [],
  teamId: Enums.PhantomID,
};
const propTypes = {
  intl: intlShape.isRequired,
  theme: PropTypes.oneOf(Enums.ThemeTypes).isRequired,
  // props for header
  defaultTitle: PropTypes.string,
  title: PropTypes.string,
  withFilter: PropTypes.bool.isRequired,
  showHeader: PropTypes.bool.isRequired,
  // props for body
  onRemoveItem: PropTypes.func,
  canRemoveItem: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  teams: PropTypes.array.isRequired,
  showTeams: PropTypes.bool.isRequired,
  tagAddonBefore: PropTypes.element,
  teamId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
};

class UsersList extends Component {
  state = {
    searchText: '',
  }

  handleSearch = value => this.setState({ searchText: value })

  // TODO1: expose filters to outside and refine the results
  // TODO2: combined the filters to get the final result
  applyFilters = targetArray => {
    const { searchText } = this.state;
    let { showTeams, teamId } = this.props;
    teamId = _.toNumber(teamId);

    let results = targetArray;
    if (searchText) {
      results = results.filter(elem => elem.name.indexOf(searchText) !== -1);
    }
    if (!showTeams) {
      results = results.filter(elem => elem.team_id === teamId);
    }
    return results;
  }

  onRemoveItem = e => {
    const { id, teamId } = e.target.parentNode.dataset;
    const { onRemoveItem } = this.props;
    if (onRemoveItem && typeof onRemoveItem === 'function') {
      onRemoveItem(id, teamId);
    }
  }

  onClick = e => {
    const { id, teamId } = e.target.dataset;
    const { onClick } = this.props;
    if (onClick && typeof onClick === 'function') {
      onClick(id, teamId);
    }
  }

  onDoubleClick = e => {
    // If click on addon icon of a tag/btn, we need to use currentTarget in delegation
    const target = e.target.dataset.id ? e.target.dataset : e.currentTarget.dataset;
    const { id, teamId } = target;
    const { onDoubleClick } = this.props;
    if (onDoubleClick && typeof onDoubleClick === 'function') {
      onDoubleClick(id, teamId);
    }
  }

  render() {
    const {
      intl,
      theme,
      defaultTitle,
      title,
      withFilter,
      showHeader,
      showTeams,
      canRemoveItem,
      users,
      teams,
      userAddonBefore,
      teamAddonBefore,
      onClick,
      onDoubleClick,
    } = this.props;

    const { formatMessage } = intl;

    const header = (
      <Row className={cx('header')}>
        <Col xs={24} sm={20} className={cx('title')}>
          <span>{title || defaultTitle}</span>
        </Col>
        <Col xs={24} sm={4}>
          {withFilter && (
            <Search
              onSearch={this.handleSearch}
              placeholder={formatMessage({ id: 'global.ui.input.searchUser'})}
              size="small"
            />
          )}
        </Col>
      </Row>
    );

    const { searchText } = this.state;
    const allTags = showTeams ? [...users, ...teams] : [...users];
    const filteredResults = this.applyFilters(allTags);
    const body = filteredResults.map(tag => {
      const key = `${tag.id}-${tag.team_id ? tag.team_id : 'team'}`;
      const cls = `pl-md pr-md ${tag.team_id ? `${theme}-theme-tag` : ''}`;
      return (
        <Tag
          key={key}
          className={cls}
          data-id={tag.id}
          data-team-id={tag.team_id}
          closable={canRemoveItem}
          onClose={this.onRemoveItem}
          onClick={this.onClick}
          onDoubleClick={this.onDoubleClick}
        >
          {tag.team_id !== undefined ? userAddonBefore : teamAddonBefore}
          {tag.name}
        </Tag>
      )
    });

    return (
      <div className={cx('usersList')}>
        {showHeader && header}
        <div className={cx('body')}>{body}</div>
      </div>
    );
  }
};

UsersList.defaultProps = defaultProps;
UsersList.propTypes = propTypes;
export default injectIntl(UsersList);