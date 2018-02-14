/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import { getAbsolutePath } from 'config/magento.config';

const { Search } = Input;

class searchView extends React.Component {
  search = (keyWords) => {
    if (!_.isEmpty(keyWords)) {
      window.open(`${getAbsolutePath('/catalogsearch/result', this.props.language)}&q=${keyWords}`, '_blank');
    }
  }
  render() {
    const placeHolder = this.props.intl.formatMessage({ id: 'global.ui.input.searchStore' });
    return (
      <div data-role="search">

        <Search
          placeholder={placeHolder}
          onSearch={value => this.search(value)}
          style={{ width: 250 }}
          enterButton
        />
      </div>
    );
  }
}
searchView.propTypes = {
  intl: intlShape.isRequired,
  language: PropTypes.string.isRequired,
};

const SearchView = injectIntl(searchView);


export default SearchView;
