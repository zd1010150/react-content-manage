import { Button } from 'antd';
import { FilterResultsTable } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Enums from 'utils/EnumsManager';
import { FindPanel } from '../components/index';
import { setRowSelection, reset } from '../flow/actions';

const { FindDupConfigs, PhantomId, ThemeTypes, ThemeTypesInArray, ObjectTypes } = Enums;
const { MaxSelection } = FindDupConfigs;
const { Leads, Accounts } = ThemeTypes;


const defaultProps = {
  accounts: [],
  leads: [],
  objectId: PhantomId,
  theme: Leads,
  withConvert: false,
};
const propTypes = {
  intl: intlShape.isRequired,
  accounts: PropTypes.array.isRequired,
  leads: PropTypes.array.isRequired,
  objectId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  theme: PropTypes.oneOf(ThemeTypesInArray).isRequired,
  withConvert: PropTypes.bool.isRequired,
};


class FindDuplicates extends Component {
  componentWillUnmount() {
    this.props.reset();
  }

  handleRowSelectionChange = keys => this.props.setRowSelection(keys)

  render() {
    const {
      intl,
      accounts,
      objectId,
      objectType,
      hasSearched,
      leads,
      selectedRowKeys,
      theme,
      withConvert,
    } = this.props;
    const { formatMessage } = intl;

    return (
      <Fragment>
        <FindPanel
          objectId={objectId}
          objectType={objectType}
          theme={theme}
          withConvert={withConvert}
        />
        {withConvert && (
          <Link to={`/leads/convert/convert/${objectId}`}>
            <Button className={`${theme}-theme-btn mb-md full-width`}>
              {formatMessage({ id: 'global.ui.button.convert' })}
            </Button>
          </Link>
        )}
        {hasSearched && (
          <Fragment>
            <FilterResultsTable
              theme={Leads}
              data={leads}
              maxSelection={MaxSelection}
              selectedRowKeys={selectedRowKeys}
              onRowSelectionChange={this.handleRowSelectionChange}
              objectType={ObjectTypes.Leads}
              canSelect
            />
            <FilterResultsTable
              data={accounts}
              theme={Accounts}
              objectType={ObjectTypes.Accounts}
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
  reset,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(FindDuplicates));
