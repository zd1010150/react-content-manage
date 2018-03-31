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
  withFilter: false,
};
const propTypes = {
  title: PropTypes.string,
  withFilter: PropTypes.bool.isRequired,
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
      ...selectionPoolProps,
    } = this.props;
    const { formatMessage } = intl;

    const { searchText } = this.state;
    const filteredUsers = users.filter(user => user.name.indexOf(searchText) !== -1);
    return (
      <Fragment>
        {(title || withFilter) && <Row className={cx('poolHeader')}>
          <Col xs={24} sm={18}>
            {title || formatMessage({ id: 'page.selectionPool.defaultTitle' })}
          </Col>
          <Col xs={24} sm={6}>
            {withFilter && <Search
              size="small"
              placeholder={formatMessage({ id: 'global.ui.input.searchUser' })}
              onChange={this._onFilterChange}
              value={searchText}
            />}
          </Col>
        </Row>}
        <SelectionPool
          users={filteredUsers}
          {...selectionPoolProps}
        />
      </Fragment>
    );
  }
};

SearchPool.defaultProps = defaultProps;
SearchPool.propTypes = propTypes;
export default injectIntl(SearchPool);