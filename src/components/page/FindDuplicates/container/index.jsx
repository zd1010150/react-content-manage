import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { Row, Col, Button, Icon } from 'antd';

import { Panel, FilterField, FilterResultsTable } from 'components/ui/index';
import Enums from 'utils/EnumsManager';
const { ThemeTypes, ThemeTypesInArray } = Enums;
const { Leads } = ThemeTypes;
import { tryFindDuplicates } from '../flow/actions';


// presets
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
  theme: Leads,
};
const propTypes = {
  intl: intlShape.isRequired,
  theme: PropTypes.oneOf(ThemeTypesInArray).isRequired,
  accounts: PropTypes.array,
  leads: PropTypes.array,
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

  onSearchClick = $ => {
    const { checkedFields } = this.state;
    let params = '';
    checkedFields.forEach(field => {
      const value = this.state[field];
      params += value ? `${mapFieldToRequest(field)}=${value}&` : '';
    }, this);
    console.log(params);
    this.props.tryFindDuplicates(params);
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
    const { intl, theme, leads, accounts } = this.props;
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
                  label={field}
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
              <Button className={`${theme}-theme-btn mr-sm`} size="small" onClick={this.onSearchClick}>
                <Icon size="small" type="search" />
                {formatMessage({ id: `global.ui.button.search` })}
              </Button>
              <Button size="small" onClick={this.onCancelClick}>
                <Icon size="small" type="close" />
                {formatMessage({ id: `global.ui.button.cancel` })}
              </Button>
            </Col>
          </Row>
        </Panel>
        <FilterResultsTable
          data={leads}
          theme="lead"
        />
        <FilterResultsTable
          data={accounts}
          theme="account"
        />
      </Fragment>
    );
  }
}


FindDuplicates.defaultProps = defaultProps;
FindDuplicates.propTypes = propTypes;
const mapStateToProps = ({ global, duplicates }) => ({
  language: global.language,
  leads: duplicates.leads,
  accounts: duplicates.accounts,
});
const mapDispatchToProps = {
  tryFindDuplicates,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(FindDuplicates));