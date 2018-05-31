/* eslint-disable react/prop-types,no-shadow */
import { Button, Col, Icon, Row, notification } from 'antd';
import { FilterField, Panel } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Enums from 'utils/EnumsManager';
import { toggleCheckbox, setFieldValue, tryFetchClientDetails, tryFindDuplicates } from '../flow/actions';

const {
  FindDupConfigs, PhantomId, ThemeTypes, ThemeTypesInArray,
} = Enums;
const { Leads } = ThemeTypes;
const { BaseFields } = FindDupConfigs;

// presets
const i18n = 'global.ui';
const colLayout = {
  sm: 8,
  xs: 24,
};
const rowLayout = {
  className: 'mt-md',
  type: 'flex',
  justify: 'center',
};
const fieldsMapping = {
  name: 'name',
  lastName: 'last_name',
  email: 'email',
  company: 'company_name',
  phone: 'phone',
};
const mapToApi = key => {
  return fieldsMapping[key];
};


const defaultProps = {
  objectId: PhantomId,
  theme: Leads,
};
const propTypes = {
  intl: intlShape.isRequired,
  objectId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  theme: PropTypes.oneOf(ThemeTypesInArray).isRequired,
  withConvert: PropTypes.bool.isRequired,
};
class FindPanel extends Component {
  componentDidMount() {
    const {
      objectId,
      objectType,
      tryFetchClientDetails,
      withConvert,
    } = this.props;
    tryFetchClientDetails(objectId, objectType, withConvert);
  }

  handleCancelClick = $ => this.props.history.goBack()

  handleCheckChange = (checkedKey, checked) => this.props.toggleCheckbox(checkedKey, checked)

  handleSearchClick = () => {
    const { duplicates, tryFindDuplicates } = this.props;

    const reducer = (accumulator, key) => {
      return duplicates[key] ? (accumulator + `${mapToApi(key)}=${duplicates[key]}&`) : accumulator;
    };
    const params = duplicates.checkedFields.reduce(reducer, '');

    if (_.isEmpty(params)) {
      return notification.warning({
        message: 'No rule has been setup',
        description: 'Please add filter criteria in the top section.',
      });
    }
    return tryFindDuplicates(params);
  }

  handleValueChange = (fieldKey, value) => this.props.setFieldValue(fieldKey, value)

  render() {
    const { intl, duplicates, theme } = this.props;
    const { checkedFields } = duplicates;
    const { formatMessage } = intl;

    return (
      <Panel
        panelTitle={formatMessage({ id: 'page.findDuplicates.title' })}
        panelClasses={`${theme}-theme-panel pb-lg`}
      >
        <Row {...rowLayout} >
          <Col {...colLayout}>
            {BaseFields.map(field => (
              <FilterField
                key={field}
                checked={checkedFields.indexOf(field) !== -1}
                fieldKey={field}
                label={formatMessage({ id: `${i18n}.table.${field}` })}
                onCheckChange={this.handleCheckChange}
                onValueChange={this.handleValueChange}
                theme={Leads}
                value={duplicates[field]}
              />
            ), this)}
          </Col>
        </Row>
        <Row {...rowLayout} >
          <Col {...colLayout} style={{ textAlign: 'center' }}>
            <Button
              className={`${theme}-theme-btn mr-sm`}
              disabled={checkedFields.length === 0}
              size="small"
              onClick={this.handleSearchClick}
            >
              <Icon className="font-sm" type="search" />
              {formatMessage({ id: `${i18n}.button.search` })}
            </Button>
            <Button size="small" onClick={this.handleCancelClick}>
              <Icon className="font-sm" type="close" />
              {formatMessage({ id: `${i18n}.button.cancel` })}
            </Button>
          </Col>
        </Row>
      </Panel>
    );
  }
}


const mapStateToProps = ({ global, duplicates }) => ({
  language: global.language,
  duplicates,
});
const mapDispatchToProps = {
  setFieldValue,
  toggleCheckbox,
  tryFetchClientDetails,
  tryFindDuplicates,
};
FindPanel.defaultProps = defaultProps;
FindPanel.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(injectIntl(FindPanel)));