import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { FloatingLabelInput } from 'components/ui/index';
class Inputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstInputText: '',
      secondInputText: '',
      searchText: '',
    };
  }

  onSearch = () => {
    // Work with redux
    const { secondInputText } = this.state;
    this.setState({ searchText: secondInputText });
  }

  onTextOnlyInputChange = firstInputText => {
    // update internal state and/or sync with redux
    this.setState({ firstInputText });
  }

  onSearchableInputChange = secondInputText => {
    // update internal state and/or sync with redux
    this.setState({ secondInputText });
  }

  render () {
    const { firstInputText, secondInputText } = this.state;
    return (
      <Fragment>        
        <p>using &lt;FloatingLabelInput / &gt;, exposed props as below</p>
        <p>labelText, labelColor, placeholder, syncWithRedux, withSearch</p>
        <h4>Text only Input</h4>
        <FloatingLabelInput
          labelText="Click to release me"
          labelColor="green"
          placeholder="Wow, the label is floating"
          handleChange={this.onTextOnlyInputChange}
          value={firstInputText}
        />
        <span>Real-time Text -> {this.state.firstInputText}</span>
        <br /><br />
        <h4>Searchable Input</h4>
        <FloatingLabelInput
          labelText="Click to release me"
          labelColor="#09c"
          placeholder="Wow, the label is floating too"
          handleChange={this.onSearchableInputChange}
          syncWithRedux={this.onSearch}
          value={secondInputText}
          withSearch
        />
        <span>Real-time Text -> {this.state.secondInputText}</span><br />
        <span>Search Text (update after pressing ENTER) -> {this.state.searchText}</span>
      </Fragment>
    );
  }
}

export default Inputs;