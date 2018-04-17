import { StyledModal } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';


const defaultProps = {
};
const propTypes = {
  intl: intlShape.isRequired,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
};

class MassUpdateModal extends Component {
  _onCancel = $ => {
    const { onCancel } = this.props;
    if (_.isFunction(onCancel)) {
      onCancel();
    }
  }

  _onOk = $ => {
    const { onOk } = this.props;
    if (_.isFunction(onOk)) {
      onOk();
    }
  }

  render () {
    const { intl, visible } = this.props;
    const { formatMessage } = intl;
    const i18n = 'page.objectList';

    return (
      <StyledModal
        title={formatMessage({ id: `global.ui.button.massUpdate` })}
        visible={visible}
        onOk={this._onOk}
        onCancel={this._onCancel}
      >
        testing
      </StyledModal>
    );
  }
};


const mapStateToProps = ({ objectList }) => ({
  
});
const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(MassUpdateModal));