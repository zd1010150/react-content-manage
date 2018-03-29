import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Input } from 'antd';
const Search = Input.Search;

import { SelectionPool } from './index';

const defaultProps = {};
const propTypes = {};

class SearchPool extends Component {
  state = {
    searchText: '',
  }

  render() {
    return (
      <Fragment>
        <SelectionPool />
      </Fragment>
    );
  }
};

SearchPool.defaultProps = defaultProps;
SearchPool.propTypes = propTypes;
export default injectIntl(SearchPool);