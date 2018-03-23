import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';

import Enums from 'utils/EnumsManager';
import { Section, Panel, FilterCondition } from 'components/ui/index';
import { ViewName, FilterCriteria, ViewButtons, FieldsSelection, ViewVisibility } from '../components/index';
import { resetView, saveView, fetchViewById } from '../flow/actions';

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
    const { match } = this.props;
    const { object, viewId } = match.params;
    this.props.fetchViewById(viewId, object);
    if (viewId !== Enums.PhantomID) {
      // fetch if path id is not phantom
      console.log('----fetch exist view data----');
    } else {
      // otherwise reset all sub store and fetch all fields and selectors
      console.log('----reset view substore----');
      this.props.resetView();
    }
  }

  handleSaveClick = () => {
    console.log('saving');
    this.props.saveView();
  }

  render() {
    const { match, intl } = this.props;
    const { formatMessage } = intl;
    const i18nPrefix = 'page.objectFilter';

    const { object, viewId } = match.params;
    const panelTitleI18nId = viewId === Enums.PhantomID ? 'general.newTitle' : 'general.existTitle';

    return (
      <Panel panelClasses="lead-theme-panel" panelTitle={formatMessage({ id: `${i18nPrefix}.${panelTitleI18nId}` })}>
        {sections.map((section, i) => {
          const id = `${i18nPrefix}.${section.titleI18n}.stepName`;
          const stepName = formatMessage({ id });
          return (
            <Section
              key={i}
              title={`${i + 1}. ${stepName}`}
              body={section.bodyComponent}
            />
          );
        })}
        <ViewButtons onSaveClick={this.handleSaveClick} />
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
  saveView,
  fetchViewById,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ObjectFilter));