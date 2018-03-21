import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';

import { FloatingLabelInput } from 'components/ui/index';
import { setViewName } from './flow/actions';

const defaultProps = {};
const propTypes = {
  name: PropTypes.string,
  setViewName: PropTypes.func,
  intl: intlShape.isRequired,
};

class ViewName extends Component {
  handleChange = value => {
    this.props.setViewName(value);
  }

  render() {
    const { intl, view_name } = this.props;
    const labelText = intl.formatMessage({ id: 'global.ui.labels.viewName' });
    const message = intl.formatMessage({ id: 'global.ui.errors.inputRequired' });

    return (
      <FloatingLabelInput
        labelText={labelText}
        labelColor="#09c"
        handleChange={this.handleChange}
        value={view_name}
        message={message}
        required
      />
    );
  }
}

ViewName.defaultProps = defaultProps;
ViewName.propTypes = propTypes;
const mapStateToProps = ({ global, objectView }) => ({
  language: global.language,
  view_name: objectView.name.view_name,
});
const mapDispatchToProps = {
  setViewName,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ViewName));