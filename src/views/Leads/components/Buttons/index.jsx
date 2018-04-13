import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ListTopButtons } from 'components/ui/index';

class ButtonsWrapper extends Component {
  render() {
    const { activeId } = this.props;
    return (
      <ListTopButtons viewId={activeId} />
    );
  }
}

const mapStateToProps = ({ global, leads }) => ({
  language: global.language,
  activeId: leads.filter.activeId,
});
export default connect(mapStateToProps)(ButtonsWrapper);