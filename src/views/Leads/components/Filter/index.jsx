import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ViewFilter } from 'components/ui/index';
import { fetchViews, setActiveId } from './flow/actions';

class FilterWrapper extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // init views list fetch
    this.props.fetchViews();
  }

  handleChange = value => {
    console.log(`new value is => ${value}`);
    // update active
    this.props.setActiveId(value);
    // fetch new list config
  }

  render() {
    const { options, activeId } = this.props;
    return (
      <Fragment>
        <ViewFilter
          activeId={activeId}
          options={options}
          onChange={this.handleChange}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ global, leads }) => ({
  // TODO:
  // Current result: Without language listener will not trigger re-render, it may because of shallowCompare return false when switch language
  language: global.language,
  activeId: leads.filter.activeId,
  options: leads.filter.options,
});
const mapDispatchToProps = {
  fetchViews,
  setActiveId,
};
export default connect(mapStateToProps, mapDispatchToProps)(FilterWrapper);