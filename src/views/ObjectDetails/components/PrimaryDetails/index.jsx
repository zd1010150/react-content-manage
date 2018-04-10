import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';

import Enums from 'utils/EnumsManager';
import { Panel, Section } from 'components/ui/index';
import { FieldsSection, ActionButtons } from './components/index';
import { tryFetch } from './flow/actions';
//presets
const i18nPrefix = 'page.objectDetails';


const defaultProps = {
  data: [],
  objectId: Enums.PhantomId,
  objectType: Enums.ThemeTypes.Leads,
};
const propTypes = {
  intl: intlShape.isRequired,
  data: PropTypes.array.isRequired,
  objectId: PropTypes.string.isRequired,
  objectType: PropTypes.string.isRequired,
  tryFetch: PropTypes.func,
};


class PrimaryDetails extends Component {
  componentDidMount() {
    const { objectId, objectType, tryFetch } = this.props;
    tryFetch(objectId, objectType);
  }

  render() {
    const { intl, theme, data, objectId, objectType } = this.props;
    const { formatMessage } = intl;
    const titleId = objectId === Enums.PhantomId ? 'newTitle' : 'editTitle';

    return (
      <Panel
        panelTitle={formatMessage({ id: `${i18nPrefix}.primaryDetails.${titleId}` })}
        panelClasses={`${theme}-theme-panel`}
        actionsRight={<ActionButtons {...this.props} />}
      >
        {data.map(record => (
          <FieldsSection
            key={record.code}
            code={record.code}
            title={record.label}
            fields={record.fields}
            columns={record.columns}
          />
        ))}
      </Panel>
    );
  }
}


PrimaryDetails.defaultProps = defaultProps;
PrimaryDetails.propTypes = propTypes;
const mapStateToProps = ({ global, objectDetails }) => ({
  language: global.language,
  data: objectDetails.primaryDetails.data,
});
const mapDispatchToProps = {
  tryFetch,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(PrimaryDetails));