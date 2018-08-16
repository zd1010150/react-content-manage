import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getTheme } from 'components/hoc/index';

class Attachment extends Component {
  render() {
    console.log('=====THEME IS: ' + this.props.theme);
    return (
      <div>
        abc
      </div>
    );
  }
}

export default getTheme(Attachment);
