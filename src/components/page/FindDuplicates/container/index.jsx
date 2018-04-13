import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { withRouter, Link } from 'react-router-dom';
import { Row, Col, Button, Icon, notification } from 'antd';

import { Panel, FilterField, FilterResultsTable } from 'components/ui/index';
import Enums from 'utils/EnumsManager';
const { ThemeTypes, ThemeTypesInArray } = Enums;
const { Leads, Accounts } = ThemeTypes;
import { setRowSelection, tryFindDuplicates } from '../flow/actions';


// presets
const i18n = 'global.ui';

const baseFields = [
  'firstName', 'lastName', 'email', 'company', 'phone'
];

const fieldsMapping = {
  firstName: 'name',
  lastName: 'last_name',
  email: 'email',
  company: 'company_name',
  phone: 'phone',
};

const mapFieldToRequest = fieldName => {
  return fieldsMapping[fieldName];
};

const colLayout = {
  sm: 8,
  xs: 24,
};

const rowLayout = {
  className: "mt-md",
  type: "flex",
  justify: "center",
}


const defaultProps = {
  accounts: [],
  leads: [],
  theme: Leads,
  withConvert: false,
};
const propTypes = {
  intl: intlShape.isRequired,  
  accounts: PropTypes.array.isRequired,
  leads: PropTypes.array.isRequired,
  theme: PropTypes.oneOf(ThemeTypesInArray).isRequired,
  withConvert: PropTypes.bool.isRequired,
};


class FindDuplicates extends Component {
  state = {
    checkedFields: [],
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
  }

  componentDidMount() {
    // fetch lead/account data locally by id
    // and set the value in 
  }

  componentWillReceiveProps(nextProps) {
    // loop all fields value if changed then sync prop with state
  }

  handleCancelClick = $ => this.props.history.goBack()

  handleCheckChange = (field, checked) => {
    const { checkedFields } = this.state;
    let newChecked;
    if (checked) {
      newChecked = _.uniq([ ...checkedFields, field ]);
    } else {
      newChecked = checkedFields.filter(elem => elem !== field);
    }
    this.setState({ checkedFields: newChecked });
  }

  handleRowSelectionChange = keys => this.props.setRowSelection(keys)

  handleSearchClick = $ => {
    const { checkedFields } = this.state;
    let params = '';
    checkedFields.forEach(field => {
      const value = this.state[field];
      params += value ? `${mapFieldToRequest(field)}=${value}&` : '';
    }, this);
    if (_.isEmpty(params)) {
      return notification['warning']({
        message: 'No rule has been setup',
        description: 'Please add filter criteria in the top section.',
      });
    }
    return this.props.tryFindDuplicates(params);
  }

  handleValueChange = (field, value) => {
    const { checkedFields } = this.state;
    // switch on and off the checkbox automatically based on its field value
    // if value is empty string then uncheck the box, otherwise check it
    let newChecked;
    if (value === '') {
      newChecked = checkedFields.filter(elem => elem !== field);
    } else {
      newChecked = _.uniq([ ...checkedFields, field ]);
    }
    return this.setState({
      checkedFields: newChecked,
      [field]: value,
    });
  }

  render() {
    const { checkedFields } = this.state;
    const {
      intl,
      accounts,
      hasSearched,
      leads,
      selectedRowKeys,
      theme,
      withConvert,
    } = this.props;
    const { formatMessage } = intl;
    
    return (
      <Fragment>
        <Panel
          panelTitle="Find Duplicates"
          panelClasses={`${theme}-theme-panel pb-lg`}
        >
          <Row {...rowLayout} >
            <Col {...colLayout}>
              {baseFields.map(field => (
                <FilterField
                  key={field}
                  checked={checkedFields.indexOf(field) !== -1}
                  fieldKey={field}
                  label={formatMessage({ id: `${i18n}.table.${field}` })}
                  onCheckChange={this.handleCheckChange}
                  onValueChange={this.handleValueChange}
                  theme={Leads}
                  value={this.state[field]}
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
                <Icon size="small" type="search" />
                {formatMessage({ id: `${i18n}.button.search` })}
              </Button>
              <Button size="small" onClick={this.handleCancelClick}>
                <Icon size="small" type="close" />
                {formatMessage({ id: `${i18n}.button.cancel` })}
              </Button>
            </Col>
          </Row>
        </Panel>
        {withConvert && (
          <Link to="/leads">
            <Button className={`${theme}-theme-btn mb-md`} style={{ width: '100%' }}>
              {formatMessage({ id: `${i18n}.button.convert` })}
            </Button>
          </Link>
        )}
        {hasSearched && (
          <Fragment>
            <FilterResultsTable
              theme={Leads}
              data={leads}
              maxSelection={4}
              selectedRowKeys={selectedRowKeys}
              onRowSelectionChange={this.handleRowSelectionChange}
              canSelect
            />
            <FilterResultsTable
              data={accounts}
              theme={Accounts}
            />
          </Fragment>
        )}
      </Fragment>
    );
  }
}


FindDuplicates.defaultProps = defaultProps;
FindDuplicates.propTypes = propTypes;
const mapStateToProps = ({ global, duplicates }) => ({
  language: global.language,
  accounts: duplicates.accounts,
  hasSearched: duplicates.hasSearched,
  leads: duplicates.leads,
  selectedRowKeys: duplicates.selectedRowKeys,
});
const mapDispatchToProps = {
  setRowSelection,
  tryFindDuplicates,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(withRouter(FindDuplicates)));