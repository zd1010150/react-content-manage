import { FloatingLabelInput } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { setViewName } from './flow/actions';


const propTypes = {
  intl: intlShape.isRequired,
  viewName: PropTypes.string.isRequired,
  setViewName: PropTypes.func.isRequired,
};


class ViewName extends Component {
  handleChange = value => this.props.setViewName(value)

  render() {
    const { intl, viewName } = this.props;
    const { formatMessage } = intl;
    const labelText = formatMessage({ id: 'global.ui.labels.viewName' });
    const message = formatMessage({ id: 'global.ui.errors.inputRequired' });

    return (
      <FloatingLabelInput
        labelText={labelText}
        labelColor="#4e4e4e"
        handleChange={this.handleChange}
        value={viewName}
        message={message}
        required
      />
    );
  }
}


ViewName.propTypes = propTypes;
const mapStateToProps = ({ global, objectView }) => ({
  language: global.language,
  viewName: objectView.name.view_name,
});
const mapDispatchToProps = {
  setViewName,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(ViewName));
