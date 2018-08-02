import { Panel, Section } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import Enums from 'utils/EnumsManager';
import { getThemeByType } from 'utils/common';
import { FieldsSelection, FilterCriteria__REFACTORED, ViewActions, ViewName, ViewVisibility } from '../components/index';
import { resetView, fetchViewById } from '../flow/actions';

const sections = [
  {
    titleI18n: 'viewName',
    component: ViewName,
  },
  {
    titleI18n: 'criteria',
    component: FilterCriteria__REFACTORED,
  },
  {
    titleI18n: 'selectors',
    component: FieldsSelection,
  },
  {
    titleI18n: 'visibility',
    component: ViewVisibility,
  },
];


const defaultProps = {
};
const propTypes = {
  intl: intlShape.isRequired,
  fetchViewById: PropTypes.func.isRequired,
  resetView: PropTypes.func.isRequired,
};


class ObjectFilter extends Component {
  componentDidMount() {
    const { objectType, viewId, fetchViewById } = this.props;
    fetchViewById(viewId, objectType);
  }

  componentWillUnmount() {
    this.props.resetView();
  }

  render() {
    const { intl, objectType, viewId } = this.props;
    const theme = getThemeByType(objectType);
    const { formatMessage } = intl;
    const i18n = 'page.objectFilter';

    const titleId = viewId === Enums.PhantomId ? 'general.newTitle' : 'general.existTitle';

    return (
      <Panel
        panelClasses={`${theme}-theme-panel`}
        panelTitle={formatMessage({ id: `${i18n}.${titleId}` })}
      >
        {sections.map((section, i) => {
          const id = `${i18n}.${section.titleI18n}.stepName`;
          const stepName = formatMessage({ id });
          return (
            <Section
              key={i}
              title={`${i + 1}. ${stepName}`}
            >
              {section.titleI18n === 'criteria'
                ? <FilterCriteria__REFACTORED theme={theme} />
                : <section.component theme={theme} />}
            </Section>
          );
        })}
        <ViewActions
          objectType={objectType}
          theme={theme}
          viewId={viewId}
        />
      </Panel>
    );
  }
}

ObjectFilter.defaultProps = defaultProps;
ObjectFilter.propTypes = propTypes;
const mapStateToProps = ({ global, objectView }) => ({
  language: global.language,
  objectView,
});
const mapDispatchToProps = {
  resetView,
  fetchViewById,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ObjectFilter));
