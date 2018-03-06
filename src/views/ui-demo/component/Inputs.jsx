import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { FloatingLabelInput } from 'components/ui/index';
class Inputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  onSearch = searchText => {
    // Work with redux
    this.setState({ searchText });
  }

  render () {
    return (
      <Fragment>        
        <p>using &lt;FloatingLabelInput / &gt;, exposed props as below</p>
        <p>labelText, labelColor, placeholder, syncWithRedux, withSearch</p>
        <h4>Text only Input</h4>
        <FloatingLabelInput
          labelText="Click to let me float"
          labelColor="green"
          placeholder="Wow, the label is floating"
        />
        <br /><br />
        <h4>Searchable Input</h4>
        <FloatingLabelInput
          labelText="Click to let me float"
          labelColor="#09c"
          placeholder="Wow, the label is floating"
          syncWithRedux={this.onSearch}
          withSearch
        />
        <span>Search Text (update after pressing ENTER) -> {this.state.searchText}</span>
      </Fragment>
    );
  }
}

export default Inputs;