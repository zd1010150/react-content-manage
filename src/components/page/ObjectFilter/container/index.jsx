import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';

import Enums from 'utils/EnumsManager';
import { Section, Panel, FilterCondition, SubmitButtons } from 'components/ui/index';
import { ViewName, FilterCriteria, FieldsSelection, ViewVisibility, ViewActions } from '../components/index';
import { resetView, fetchViewById } from '../flow/actions';

const defaultProps = {
};
const propTypes = {
  intl: intlShape.isRequired,
};

const sections = [
  {
    titleI18n: 'viewName',
    bodyComponent: ViewName,
  },
  {
    titleI18n: 'criteria',
    bodyComponent: FilterCriteria,
  },
  {
    titleI18n: 'selectors',
    bodyComponent: FieldsSelection,
  },
  {
    titleI18n: 'visibility',
    bodyComponent: ViewVisibility,
  },
];

class ObjectFilter extends Component {
  componentDidMount() {
    const { objectType, viewId } = this.props.match.params;
    this.props.fetchViewById(viewId, objectType);
  }

  componentWillUnmount() {
    this.props.resetView();
  }

  render() {
    const { match, intl } = this.props;
    const { formatMessage } = intl;
    const i18nPrefix = 'page.objectFilter';

    const { viewId } = match.params;
    const panelTitleI18nId = viewId === Enums.PhantomId ? 'general.newTitle' : 'general.existTitle';

    return (
      <Panel panelClasses="lead-theme-panel" panelTitle={formatMessage({ id: `${i18nPrefix}.${panelTitleI18nId}` })}>
        {sections.map((section, i) => {
          const id = `${i18nPrefix}.${section.titleI18n}.stepName`;
          const stepName = formatMessage({ id });
          return (
            <Section
              key={i}
              title={`${i + 1}. ${stepName}`}
            >
              {section.bodyComponent}
            </Section>
          );
        })}
        <ViewActions />
      </Panel>
    );
  }
}

ObjectFilter.defaultProps = defaultProps;
ObjectFilter.propTypes = propTypes;
const mapStateToProps = ({ objectView }) => ({
  objectView,
});
const mapDispatchToProps = {
  resetView,
  fetchViewById,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ObjectFilter));