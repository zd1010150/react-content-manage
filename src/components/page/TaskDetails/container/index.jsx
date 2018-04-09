import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'antd';

import { Panel } from 'components/ui/index';
import Enums from 'utils/EnumsManager';
const { PhantomId, ThemeTypes, ThemeTypesInArray } = Enums;
import { Actions, Fields } from '../components/index';


const defaultProps = {
  objectId: PhantomId,
  theme: ThemeTypes.Lead,
};
const propTypes = {
  intl: intlShape.isRequired,
  objectId: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(ThemeTypesInArray).isRequired,
};


class TaskDetails extends Component {
  handleCancel = $ => {

  }

  handleDelete = (id, type) => {
    
  }

  handleSave = (id, type) => {
    
  }

  handleSaveAndNew = (id, type) => {
    
  }

  render() {
    const { intl, objectId, objectType, theme } = this.props;

    const { formatMessage } = intl;
    const i18nPrefix = 'page.taskDetails';
    const titleKey = objectId === PhantomId ? 'newTitle' : 'editTitle';

    return (
      <Panel
        panelTitle={formatMessage({ id: `${i18nPrefix}.${titleKey}` })}
        panelClasses={`${theme}-theme-panel`}
      >
        <Row style={{ margin: '10px 15px' }}>
          <Fields />
        </Row>
        <Row style={{ margin: '10px 15px' }}>
          <Actions
            objectId={objectId}
            objectType={objectType}
            onCancel={this.handleCancel}
            onDelete={this.handleDelete}
            onSave={this.handleSave}
            onSaveAndNew={this.handleSaveAndNew}
          />
        </Row>
      </Panel>
    );
  }
}


TaskDetails.defaultProps = defaultProps;
TaskDetails.propTypes = propTypes;
const mapStateToProps = ({ global }) => ({
  language: global.language,
});
const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TaskDetails));