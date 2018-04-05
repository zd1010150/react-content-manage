import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Input, Row, Col } from 'antd';

const Search = Input.Search;
import classNames from 'classnames/bind';
import styles from './index.less';

const cx = classNames.bind(styles);

import { SelectionPool } from './index';

const defaultProps = {
  users: [],
  teams: [],
};
const propTypes = {
  title: PropTypes.string,
};

class SearchPool extends Component {
  state = {
    searchText: '',
  }

  _onFilterChange = e => this.setState({ searchText: e.target.value })

  render() {
    const {
      intl,
      title,
      withFilter,
      users,
      teams,
      ...selectionPoolProps
    } = this.props;
    const { formatMessage } = intl;

    const { searchText } = this.state;
    const filteredUsers = users.filter(user => user.name.indexOf(searchText) !== -1);
    const fileteredTeams = teams.filter(team => team.name.indexOf(searchText) > -1);
    return (
      <Fragment>
        <Row className={cx('poolHeader')}>
          <Col xs={24} sm={18}>
            {title || formatMessage({ id: 'page.selectionPool.defaultTitle' })}
          </Col>
          <Col xs={24} sm={6}>
            <Search
              size="small"
              placeholder={formatMessage({ id: 'global.ui.input.searchUser' })}
              onChange={this._onFilterChange}
              value={searchText}
            />
          </Col>
        </Row>
        <SelectionPool
          users={filteredUsers}
          teams={fileteredTeams}
          {...selectionPoolProps}
        />
      </Fragment>
    );
  }
}

SearchPool.defaultProps = defaultProps;
SearchPool.propTypes = propTypes;
export default injectIntl(SearchPool);
