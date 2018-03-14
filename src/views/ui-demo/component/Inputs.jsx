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

  handleSearch = value => this.setState({ searchText: value })
  handleTextInputChange = value => this.setState({ firstInputText: value })
  handleSearchInputChange = value => this.setState({ secondInputText: value })

  render () {
    const { firstInputText, secondInputText } = this.state;
    return (
      <Fragment>        
        <p>Using &lt;FloatingLabelInput / &gt;, exposed props as below</p>
        <p>labelText, labelColor, placeholder, handleChange, handleSearch, withSearch</p>
        <p style={{ color: 'red' }}>Both handleChange and handleSearch handlers will receive current value of input instead of Event object</p>
        <h4>Text only Input</h4>
        <FloatingLabelInput
          labelText="Click to release me"
          labelColor="green"
          placeholder="Wow, the label is floating"
          handleChange={this.handleTextInputChange}
          value={firstInputText}
        />
        <span>Real-time Text -> {this.state.firstInputText}</span>
        <br /><br />
        <h4>Searchable Input</h4>
        <FloatingLabelInput
          labelText="Click to release me"
          labelColor="#09c"
          placeholder="Wow, the label is floating too"
          handleChange={this.handleSearchInputChange}
          handleSearch={this.handleSearch}
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