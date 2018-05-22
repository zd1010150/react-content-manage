import { Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { tryConvertLead } from '../flow/actions';

const propTypes = {
  intl: intlShape.isRequired,
  objectId: PropTypes.string.isRequired,
};

class Actions extends Component {
  componentDidUpdate() {
    const { history, newAccountId } = this.props;
    if (newAccountId !== '') {
      history.push(`/accounts/${newAccountId}`);
    }
  }

  componentWillUnmount() {
    this.props.reset();
  }

  handleSaveClick = () => {
    const { objectId, tryConvertLead } = this.props;
    tryConvertLead(objectId);
  }

  render() {
    const { intl, objectId } = this.props;
    const { formatMessage } = intl;
    const i18n = 'global.ui.button';

    return (
      <div className="ml-lg">
        <Button className="lead-theme-btn mr-sm" onClick={this.handleSaveClick}>
          <Icon className="font-sm" type="save" />
          {formatMessage({ id: `${i18n}.save` })}
        </Button>
        <Link to={`/leads/convert/find/${objectId}`}>
          <Button>
            <Icon className="font-sm" type="close" />
            {formatMessage({ id: `${i18n}.cancel` })}
          </Button>
        </Link>
      </div>
    );
  }
}

Actions.propTypes = propTypes;
const mapStateToProps = ({ convertStatus }) => ({
  newAccountId: convertStatus,
});
const mapDispatchToProps = {
  tryConvertLead,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(injectIntl(Actions)));
