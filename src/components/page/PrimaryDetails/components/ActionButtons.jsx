import { FloatingActionButtons } from 'components/ui/index';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { isValidClientTypes } from 'utils/propChecks';
import { tryUpdateClient } from '../flow/actions';

const propTypes = {
  intl: intlShape.isRequired,
  objectType: isValidClientTypes,
};

class ActionButtons extends Component {
  handleSaveClick = () => {
    console.log(' save click ');
    const { tryUpdateClient } = this.props;
    tryUpdateClient();
  }

  handleSaveAndNewClick = () => {
    console.log(' save & new click ');
  }

  handleRevertClick = () => {
    console.log(' revert click ');
  }

  handleGoBackClick = () => {
    console.log(' go back click ');
  }

  render() {
    const { objectType, theme } = this.props;

    return (
      <FloatingActionButtons
        objectType={objectType}
        theme={theme}
        onSaveClick={this.handleSaveClick}
        onSaveAndNewClick={this.handleSaveAndNewClick}
        onRevertClick={this.handleRevertClick}
        onGoBackClick={this.handleGoBackClick}
      />
    );
  }
}


ActionButtons.propTypes = propTypes;
const mapStateToProps = () => ({

});
const mapDispatchToProps = {
  // button actions
  tryUpdateClient,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ActionButtons));
