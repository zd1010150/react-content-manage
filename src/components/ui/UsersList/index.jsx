import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
const Search = Input.Search;
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);

const defaultProps = {
  withFilter: false,
  canRemoveItem: false,
  users: [],
  departments: [],
};
const propTypes = {
  title: PropTypes.string,
  withFilter: PropTypes.bool.isRequired,
  canRemoveItem: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  departments: PropTypes.array.isRequired,
};

class UsersList extends Component {
  state = {
    filter: '',
  }

  handleSearch = value => this.setState({ filter: value })

  applyFilter = (filter, targetArray) => {
    return targetArray.filter(elem => elem.value.indexOf(filter) !== -1);
  }

  onRemoveItem = e => {
    // this.props.handleRemoveItem(itemId);
  }

  render() {
    const {
      title,
      withFilter,
      canRemoveItem,
      users,
      departments,
    } = this.props;

    const { filter } = this.state;
    const filteredUsers = this.applyFilter(filter, users);
    const filteredDepartments = this.applyFilter(filter, departments);

    return (
      <div>
        <div>
          <span>{title}</span>
          {withFilter && (
            <Search
              onSearch={this.handleSearch}
              placeholder="input search text"
              enterButton
              size="small"
            />
          )}
        </div>
      </div>
    );
  }
};

UsersList.defaultProps = defaultProps;
UsersList.propTypes = propTypes;
export default UsersList;