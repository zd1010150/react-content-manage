import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Icon, Table } from 'antd';


const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
};

class Summary extends Component {
  render() {
    const { intl } = this.props;
    const { formatMessage } = intl;
    const i18n = 'global.ui';

    return (
      <div />
    );
  }
}

Summary.defaultProps = defaultProps;
Summary.propTypes = propTypes;
const mapStateToProps = ({ global }) => ({
  language: global.language,
});
const mapDispatchToProps = {
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(Summary));
