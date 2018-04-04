import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';

import Enums from 'utils/EnumsManager';
import { Panel, Section } from 'components/ui/index';
import { FloatActionBtns, FieldsSection } from './components/index';
import { tryFetch } from './flow/actions';
//presets
const i18nPrefix = 'page.objectDetails';


const defaultProps = {
  objectId: Enums.PhantomID,
  objectType: Enums.ThemeTypes.Leads,
};
const propTypes = {
  intl: intlShape.isRequired,
  objectId: PropTypes.string.isRequired,
  objectType: PropTypes.string.isRequired,
};


class PrimaryDetails extends Component {
  componentDidMount() {
    const { objectId, objectType, tryFetch } = this.props;
    tryFetch(objectId, objectType);
  }

  handleSave = $ => {
    console.log('save');
  }
  
  handleSaveAndNew = $ => {
    console.log('savenadd');
  }

  handleRevert = $ => {
    console.log('rev');
  }

  render() {
    const { intl, theme, dataSource, objectId } = this.props;
    const { formatMessage } = intl;
    const titleId = objectId === Enums.PhantomID ? 'newTitle' : 'editTitle';

    return (
      <Panel
        panelTitle={formatMessage({ id: `${i18nPrefix}.primaryDetails.${titleId}` })}
        panelClasses={`${theme}-theme-panel`}
        actionsRight={<FloatActionBtns
                        theme={theme}
                        onSaveClick={this.handleSave}
                        onSaveAndNewClick={this.handleSaveAndNew}
                        onRevertClick={this.handleRevert} />}
      >
        {dataSource.map(record => (
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
  dataSource: objectDetails.primaryDetails.dataSource,
});
const mapDispatchToProps = {
  tryFetch,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(PrimaryDetails));