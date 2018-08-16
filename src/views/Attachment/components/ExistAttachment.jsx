import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Icon, Button } from 'antd';
import { connect } from 'react-redux';


class ExistAttachment extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>Exist</div>
    );
  }
}

export default connect()(ExistAttachment);
