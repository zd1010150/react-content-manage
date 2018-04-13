import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ViewFilter } from 'components/ui/index';
import { fetchViews, fetchTableDataByView } from './flow/actions';

const propTypes = {
  language: PropTypes.string.isRequired,
  activeId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  options: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  sorter: PropTypes.object.isRequired,
  fetchViews: PropTypes.func.isRequired,
  fetchTableDataByView: PropTypes.func.isRequired,
};

class FilterWrapper extends Component {
  componentDidMount() {
    // init views list fetch
    this.props.fetchViews();
  }

  handleChange = value => {
    console.log(`new value is => ${value}`);
    // update active
    const { pagination, sorter } = this.props;
    const { current, pageSize } = pagination;
    const { orderBy, sortedBy } = sorter;
    this.props.fetchTableDataByView(current, pageSize, orderBy, sortedBy, value);
    // fetch new list config
  }

  render() {
    const { options, activeId } = this.props;
    return (
      <ViewFilter
        activeId={activeId}
        options={options}
        onChange={this.handleChange}
      />
    );
  }
}

FilterWrapper.propTypes = propTypes;
const mapStateToProps = ({ global, leads }) => ({
  // TODO:
  // Current result: Without language listener will not trigger re-render, it may because of shallowCompare return false when switch language
  language: global.language,
  pagination: leads.table.pagination,
  sorter: leads.table.sorter,
  activeId: leads.filter.activeId,
  options: leads.filter.options,
});
const mapDispatchToProps = {
  fetchViews,
  fetchTableDataByView,
};
export default connect(mapStateToProps, mapDispatchToProps)(FilterWrapper);