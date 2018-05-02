import { Panel } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Enums from 'utils/EnumsManager';
import { isValidClientTypes } from 'utils/propChecks';
import { ActionButtons, FieldsSection } from '../components/index';
import { resetId, tryFetchObjectDetails } from '../flow/actions';

const { PhantomId } = Enums;

const propTypes = {
  intl: intlShape.isRequired,
  objectId: PropTypes.string.isRequired,
  objectType: isValidClientTypes,
};

class PrimaryDetails extends Component {
  componentDidMount() {
    // fetch create / exist data for current object
    // params: objectId, objectType, accountId if object is opport and oid is phantomid
    const {
      accountId,
      objectId,
      objectType,
      tryFetchObjectDetails,
    } = this.props;
    tryFetchObjectDetails(objectId, objectType, accountId);
  }

  componentDidUpdate() {
    const {
      history,
      objectType,
      newId,
      resetId,
    } = this.props;
    if (newId !== '') {
      history.push(`/${objectType}/${newId}`);
      resetId();
    }
  }

  getPanelTitle = () => {
    const { objectId, theme, intl } = this.props;
    const { formatMessage } = intl;
    const actionStr = objectId === PhantomId ? 'new' : 'edit';
    const action = formatMessage({ id: `page.primaryDetails.panel.${actionStr}` });
    const type = formatMessage({ id: `global.properNouns.${theme}` });
    return `${action}${type}`;
  }

  render() {
    const {
      accountId,
      objectId,
      objectType,
      sections,
      theme,
    } = this.props;

    const actions = (
      <ActionButtons
        accountId={accountId}
        objectId={objectId}
        objectType={objectType}
        theme={theme}
      />
    );

    return (
      <Panel
        panelTitle={this.getPanelTitle()}
        panelClasses={`${theme}-theme-panel`}
        actionsRight={actions}
      >
        {sections.map(section => (
          <FieldsSection
            key={section.code}
            code={section.code}
            title={section.label}
            fields={section.fields}
            columns={section.columns}
          />
        ))}
      </Panel>
    );
  }
}


PrimaryDetails.propTypes = propTypes;
const mapStateToProps = ({ global, clientDetails }) => ({
  language: global.language,
  sections: clientDetails.details.sections,
  newId: clientDetails.details.newId,
});
const mapDispatchToProps = {
  resetId,
  tryFetchObjectDetails,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(injectIntl(PrimaryDetails)));
