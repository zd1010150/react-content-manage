/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

class User extends React.Component {
  onSearch() {

  }
  onSearchableInputChange() {

  }
  render() {
    const { secondInputText } = this.props;
    return (


      <Card title="Card title" bordered={false} style={{ width: '100%' }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>

    );
  }
}
User.defaultProps = {

};
User.propTypes = {

};

export default User;

